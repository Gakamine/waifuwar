<template>
  <div>
    <b-steps
      type="is-success"
      v-model="activeStep"
      :has-navigation="false"
      :mobile-mode="null"
    >
      <b-step-item label="Waifus">
        <p class="instructions">Select 10 waifus</p>
        <form class="grid">
          <div class="grid-items">
            <b-checkbox
              v-for="waifu in data_waifus"
              v-model="waifus"
              name="waifu"
              :native-value="waifu"
              :key="waifu.id"
            >
              <img
                :src="'https://api.waifuwars.madao-king.xyz/' + waifu.image"
              />
              <p class="opp_name">{{ waifu.name }}</p>
            </b-checkbox>
          </div>
        </form>
        <b-button
          v-if="waifus.length == 10"
          class="is-primary fantasy-btn"
          @click.prevent="nextStep()"
        >
          Next step
        </b-button>
        <b-button v-else class="is-primary fantasy-btn" disabled>
          Choose 10 waifus (you picked {{ waifus.length }})
        </b-button>
      </b-step-item>
      <b-step-item label="Best waifu">
        <p class="instructions">Select your best waifu</p>
        <form class="grid">
          <div class="grid-items">
            <b-radio
              v-for="waifu in waifus"
              v-model="best_waifu"
              name="waifu"
              :native-value="waifu.id"
              :key="waifu.id"
            >
              <img
                :src="'https://api.waifuwars.madao-king.xyz/' + waifu.image"
              />
              <p class="opp_name">{{ waifu.name }}</p>
            </b-radio>
          </div>
        </form>
        <b-button
          v-if="best_waifu != null"
          class="is-primary fantasy-btn"
          @click.prevent="nextStep()"
        >
          Next step
        </b-button>
        <b-button v-else class="is-primary fantasy-btn" disabled>
          Choose your best waifu
        </b-button>
      </b-step-item>

      <b-step-item label="Husbandos">
        <p class="instructions">Select 10 husbandos</p>
        <form class="grid">
          <div class="grid-items">
            <b-checkbox
              v-for="husbando in data_husbandos"
              v-model="husbandos"
              name="husbando"
              :native-value="husbando"
              :key="husbando.id"
            >
              <img
                :src="'https://api.waifuwars.madao-king.xyz/' + husbando.image"
              />
              <p class="opp_name">{{ husbando.name }}</p>
            </b-checkbox>
          </div>
        </form>
        <b-button
          v-if="husbandos.length == 10"
          class="is-primary fantasy-btn"
          @click.prevent="nextStep()"
        >
          Next step
        </b-button>
        <b-button v-else class="is-primary fantasy-btn" disabled>
          Choose 10 husbandos (you picked {{ husbandos.length }})
        </b-button>
      </b-step-item>
            <b-step-item label="Best husbando">
        <p class="instructions">Select your best husbando</p>
        <form class="grid">
          <div class="grid-items">
            <b-radio
              v-for="husbando in husbandos"
              v-model="best_husbando"
              name="husbando"
              :native-value="husbando.id"
              :key="husbando.id"
            >
              <img
                :src="'https://api.waifuwars.madao-king.xyz/' + husbando.image"
              />
              <p class="opp_name">{{ husbando.name }}</p>
            </b-radio>
          </div>
        </form>
        <b-button
          v-if="best_husbando != null"
          class="is-primary fantasy-btn"
          @click.prevent="nextStep()"
        >
          Next step
        </b-button>
        <b-button v-else class="is-primary fantasy-btn" disabled>
          Choose your best husbando
        </b-button>
      </b-step-item>
      
      <b-step-item label="Memes">
        <p class="instructions">Select 10 memes</p>
        <form class="grid">
          <div class="grid-items">
            <b-checkbox
              v-for="meme in data_memes"
              v-model="memes"
              name="meme"
              :native-value="meme"
              :key="meme.id"
            >
              <img
                :src="'https://api.waifuwars.madao-king.xyz/' + meme.image"
              />
              <p class="opp_name">{{ meme.name }}</p>
            </b-checkbox>
          </div>
        </form>
        <b-button
          v-if="memes.length == 10"
          class="is-primary fantasy-btn"
          @click.prevent="nextStep()"
        >
          Next step
        </b-button>
        <b-button v-else class="is-primary fantasy-btn" disabled>
          Choose 10 memes (you picked {{ memes.length }})
        </b-button>
      </b-step-item>
      <b-step-item label="Best Meme">
        <p class="instructions">Select your best meme</p>
        <form class="grid">
          <div class="grid-items">
            <b-radio
              v-for="meme in memes"
              v-model="best_meme"
              name="meme"
              :native-value="meme.id"
              :key="meme.id"
            >
              <img
                :src="'https://api.waifuwars.madao-king.xyz/' + meme.image"
              />
              <p class="opp_name">{{ meme.name }}</p>
            </b-radio>
          </div>
        </form>
        <b-button
          v-if="best_meme != null"
          class="is-primary fantasy-btn"
          @click.prevent="submit()"
        >
          Submit
        </b-button>
        <b-button v-else class="is-primary fantasy-btn" disabled>
          Choose your best meme
        </b-button>
      </b-step-item>
    </b-steps>
  </div>
</template>
<script>
import { FETCH_FANTASYLEAGUE_QUERY } from "../gql/fetch_fantasyleague";
import { SUBMIT_FANTASYLEAGUE } from "../gql/submit_fantasyleague";
export default {
  props: ["token"],
  data() {
    return {
      activeStep: 0,
      waifus: [],
      best_waifu: null,
      memes: [],
      best_meme: null,
      husbandos: [],
      best_husbando: null,
      data: [],
    };
  },
  apollo: {
    data: {
      query: FETCH_FANTASYLEAGUE_QUERY,
      update(data) {
        return data["fantasyLeague"];
      },
    },
  },
  computed: {
    data_waifus: function () {
      return this.data.filter((x) => (x.tier == "A") || (x.tier == "B"));
    },
    data_husbandos: function () {
      return this.data.filter((x) => x.tier == "Husbando");
    },
    data_memes: function () {
      return this.data.filter((x) => x.tier == "Meme");
    },
  },
  methods: {
    submit() {
      const clone_waifus = this.waifus.map(({ id }) => id);
      clone_waifus.splice(clone_waifus.indexOf(this.best_waifu), 1);
      const clone_husbandos = this.husbandos.map(({ id }) => id);
      clone_husbandos.splice(clone_husbandos.indexOf(this.best_husbando), 1);
      const clone_memes = this.memes.map(({ id }) => id);
      clone_memes.splice(clone_memes.indexOf(this.best_meme), 1);
      this.$apollo
        .mutate({
          // Query
          mutation: SUBMIT_FANTASYLEAGUE,
          // Parameters
          variables: {
            token: this.token,
            waifus: clone_waifus,
            best_waifu: this.best_waifu,
            memes: clone_memes,
            best_meme: this.best_meme,
            husbandos: clone_husbandos,
            best_husbando: this.best_husbando,
          },
        })
        .then((reponse) => {
          this.api_response = reponse.data.submitFantasyleagueVote;
          if (
            this.api_response.errors[0] &&
            this.api_response.errors != "_typename"
          ) {
            this.$buefy.notification.open({
              duration: 5000,
              message: this.api_response.errors[0],
              type: "is-danger",
            });
          } else {
            this.$buefy.notification.open({
              duration: 5000,
              message: "Vote submitted",
              type: "is-success",
            });
            this.$emit("checkFantasyleague");
          }
        })
        .catch(() => {
          this.$buefy.notification.open({
            duration: 5000,
            message:
              "Something went wrong. Please refresh the page and if the error persists, contact the administrator.",
            type: "is-danger",
          });
        });
    },
    nextStep() {
      this.activeStep++;
      window.scrollTo(0, 0);
    },
  },
};
</script>
<style scoped>
.b-checkbox,
.b-radio {
  max-width: 250px;
  background-color: var(--foreground-background-color);
  border-radius: 5px;
  padding: 10px;
  display: block;
  margin: 0.25em;
}
.b-checkbox:hover,
.b-radio:hover {
  background-color: var(--secondary-foreground-background-color);
}
@media (max-width: 1024px) {
  .grid-items {
    margin-bottom: 0.5em;
    grid-template-columns: repeat(auto-fit, 160px);
    display: grid;
    justify-content: center;
  }
}
@media (min-width: 1024px) {
  .grid-items {
    margin-bottom: 0.5em;
    grid-template-columns: repeat(auto-fit, 250px);
    display: grid;
    justify-content: center;
  }
}
.opp_name {
  font-size: 18px;
  text-align: center;
  margin-bottom: 25px;
}
.fantasy-btn {
  width: 100%;
}
.opp_name {
  font-size: 18px;
  text-align: center;
  margin-bottom: 25px;
}
.instructions {
  text-align: center;
  font-size: 28px;
}
.b-checkbox.checkbox:not(.button) + .checkbox:last-child {
  margin-right: 0.5em;
}
.b-radio.radio:not(.button) + .radio:last-child {
    margin-left: 0px;
    margin-right: 0.25em;
}
</style>
