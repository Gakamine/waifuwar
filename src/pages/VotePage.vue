<template>
  <b-tabs type="is-toggle-rounded">
    <b-tab-item label="Waifu">
      <form v-if="rounds.find((x) => x.tier === 'Waifu')" class="grid">
        <div class="grid-items">
          <b-radio v-model="votes.Waifu.id" name="opponents"
            :native-value="rounds.find((x) => x.tier === 'Waifu').opp1Id.id">
            <img :src="'https://api.waifuwars.madao-king.xyz/' +
              rounds.find((x) => x.tier === 'Waifu').opp1Id.image
              " />
            <p class="opp_name">
              {{ rounds.find((x) => x.tier === "Waifu").opp1Id.name }}
            </p>
          </b-radio>
          <b-radio v-model="votes.Waifu.id" :native-value="rounds.find((x) => x.tier === 'Waifu').opp2Id.id">
            <img :src="'https://api.waifuwars.madao-king.xyz/' +
              rounds.find((x) => x.tier === 'Waifu').opp2Id.image
              " />
            <p class="opp_name">
              {{ rounds.find((x) => x.tier === "Waifu").opp2Id.name }}
            </p>
          </b-radio>
        </div>
        <input v-if="token && !votes.Waifu.AlreadyVoted" type="button" value="Submit your vote"
          @click="SubmitVote('Waifu')" class="button is-primary" />
        <input v-else-if="token" type="button" value="You already voted" disabled class="button is-primary" />
        <input v-else type="button" value="You need to log in" disabled class="button is-primary" />
      </form>
      <h1 v-else class="notournament">No tournament for today</h1>
    </b-tab-item>

    <b-tab-item label="Husbando">
      <form v-if="rounds.find((x) => x.tier === 'Husbando')" class="grid">
        <div class="grid-items">
          <b-radio v-model="votes.Husbando.id" name="opponents"
            :native-value="rounds.find((x) => x.tier === 'Husbando').opp1Id.id">
            <img :src="'https://api.waifuwars.madao-king.xyz/' +
              rounds.find((x) => x.tier === 'Husbando').opp1Id.image
              " />
            <p class="opp_name">
              {{ rounds.find((x) => x.tier === "Husbando").opp1Id.name }}
            </p>
          </b-radio>
          <b-radio v-model="votes.Husbando.id" name="opponents"
            :native-value="rounds.find((x) => x.tier === 'Husbando').opp2Id.id">
            <img :src="'https://api.waifuwars.madao-king.xyz/' +
              rounds.find((x) => x.tier === 'Husbando').opp2Id.image
              " />
            <p class="opp_name">
              {{ rounds.find((x) => x.tier === "Husbando").opp2Id.name }}
            </p>
          </b-radio>
        </div>
        <input v-if="token && !votes.Husbando.AlreadyVoted" type="button" value="Submit your vote"
          @click="SubmitVote('Husbando')" class="button is-primary" />
        <input v-else-if="token" type="button" value="You already voted" disabled class="button is-primary" />
        <input v-else type="button" value="You need to log in" disabled class="button is-primary" />
      </form>
      <h1 v-else class="notournament">No tournament for today</h1>
    </b-tab-item>

    <b-tab-item label="Meme">
      <form v-if="rounds.find((x) => x.tier === 'Meme')" class="grid">
        <div class="grid-items">
          <b-radio v-model="votes.Meme.id" name="opponents"
            :native-value="rounds.find((x) => x.tier === 'Meme').opp1Id.id">
            <img :src="'https://api.waifuwars.madao-king.xyz/' +
              rounds.find((x) => x.tier === 'Meme').opp1Id.image
              " />
            <p class="opp_name">
              {{ rounds.find((x) => x.tier === "Meme").opp1Id.name }}
            </p>
          </b-radio>
          <b-radio v-model="votes.Meme.id" name="opponents"
            :native-value="rounds.find((x) => x.tier === 'Meme').opp2Id.id">
            <img :src="'https://api.waifuwars.madao-king.xyz/' +
              rounds.find((x) => x.tier === 'Meme').opp2Id.image
              " />
            <p class="opp_name">
              {{ rounds.find((x) => x.tier === "Meme").opp2Id.name }}
            </p>
          </b-radio>
        </div>
        <input v-if="token && !votes.Meme.AlreadyVoted" type="button" value="Submit your vote"
          @click="SubmitVote('Meme')" class="button is-primary" />
        <input v-else-if="token" type="button" value="You already voted" disabled class="button is-primary" />
        <input v-else type="button" value="You need to log in" disabled class="button is-primary" />
      </form>
      <h1 v-else class="notournament">No tournament for today</h1>
    </b-tab-item>

  </b-tabs>
</template>
<script>
  import { FETCH_ROUND_QUERY } from "../gql/currentRound";
  import { FETCH_VOTE_QUERY } from '../gql/fetch_votes';
  import { VOTE_MUTATION } from '../gql/mutation_vote';
  export default {
    props: ["token"],
    data() {
      return {
        votes: {
          Waifu: {
            AlreadyVoted: false,
            id: null
          },
          Meme: {
            AlreadyVoted: false,
            id: null
          },
          Husbando: {
            AlreadyVoted: false,
            id: null
          }
        },
        rounds: [],
      };
    },
    apollo: {
      rounds: {
        query: FETCH_ROUND_QUERY,
        update(data) {
          return data["currentRound"];
        },
      },
    },
    watch: {
      token: async function () {
        this.check_votes()
      }
    },
    mounted() {
      this.check_votes()
    },
    methods: {
      async check_votes() {
        const votes = await this.$apollo.query({
          query: FETCH_VOTE_QUERY,
          fetchPolicy: 'network-only',
          variables: {
            token: this.token,
          }
        });
        if (votes.data.checkVote != null) {
          votes.data.checkVote.forEach(vote => {
            var round = this.rounds.find((x) => x.id === vote["roundsId"])
            this.votes[round.tier].id = vote.opponentsId
            this.votes[round.tier].AlreadyVoted = true
          })
        }
      },
      async SubmitVote(tier) {
        if (this.votes[tier].id) {
          var round = this.rounds.find((x) => x.tier === tier)
          var ip = await fetch("https://v4.ident.me/").then(res => { return res.text() })
          this.$apollo.mutate({
            // Query
            mutation: VOTE_MUTATION,
            // Parameters
            variables: {
              token: this.token,
              roundid: parseInt(round.id),
              oppid: parseInt(this.votes[tier].id),
              ip: ip
            }
          })
            .then((reponse) => {
              this.api_response = reponse.data.submitVote
              if (this.api_response.errors[0] && this.api_response.errors != "_typename") {
                this.$buefy.notification.open({
                  duration: 5000,
                  message: this.api_response.errors[0],
                  type: 'is-danger',
                })
              } else {
                this.votes[tier].AlreadyVoted = true
                this.$buefy.notification.open({
                  duration: 5000,
                  message: "Vote submitted",
                  type: 'is-success',
                })
                this.checkvote = true
              }
            })
            .catch(() => {
              this.$buefy.notification.open({
                duration: 5000,
                message: 'Something went wrong. Please refresh the page and if the error persists, contact the administrator.',
                type: 'is-danger',
              })
            })
        }
        else {
          this.$buefy.notification.open({
            duration: 5000,
            message: 'You need to select a waifu.',
            type: 'is-danger',
          })
        }
      }
    }
  };
</script>
<style scoped>
  form input[type="button"] {
    width: 100%;
  }

  .b-tabs {
    margin: 0px;
  }

  .radio img {
    margin: auto;
  }

  .b-radio {
    max-width: 250px;
    background-color: var(--foreground-background-color);
    border-radius: 5px;
    padding: 10px;
    display: block;
  }

  .b-radio:hover {
    background-color: var(--secondary-foreground-background-color);
  }

  .grid-items {
    margin-bottom: 0.5em;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .opp_name {
    font-size: 18px;
    text-align: center;
    margin-bottom: 25px;
  }

  .notournament {
    font-size: 38px;
    text-align: center;
  }

  .grid {
    max-width: 518px;
    margin: auto;
  }
</style>
