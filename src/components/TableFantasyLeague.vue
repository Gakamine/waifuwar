<template>
  <div>
    <section>
      <b-field label="Filter by:">
        <b-select v-model="filter" expanded>
          <option value="all">All</option>
          <option value="waifus">Waifus</option>
          <option value="husbandos">Husbandos</option>
          <option value="memes">Memes</option>
        </b-select>
      </b-field>
      <b-table :data="display" :default-sort="[column, direction]">
        <b-table-column
          field="points"
          label="Points"
          width="40"
          numeric
          v-slot="props"
        >
          {{ props.row.points }}
        </b-table-column>

        <b-table-column field="name" label="Name" v-slot="props">
          <p>
            {{ props.row.name }}<b style="color: #fd755c">{{ isWaifu([props.row.id]) }}</b>
          </p>
        </b-table-column>

        <b-table-column field="tier" label="Tier" v-slot="props">
          {{ props.row.tier }}
        </b-table-column>
      </b-table>
    </section>
  </div>
</template>
<script>
import { FETCH_FANTASYLEAGUE_QUERY } from "../gql/fetch_fantasyleague";
export default {
  props: ["selection"],
  data() {
    return {
      waifus: [],
      display: [],
      filter: "all",
      direction: "desc",
      column: "points",
    };
  },
  apollo: {
    waifus: {
      query: FETCH_FANTASYLEAGUE_QUERY,
      update(data) {
        return data["fantasyLeague"];
      },
    },
  },
  watch: {
    filter: function () {
      this.filtering();
    },
    waifus: function () {
      this.filtering();
    },
    selection: function() {
      this.filtering()
    }
  },
  methods: {
    filtering: function () {
      switch (this.filter) {
        case "all":
          this.display = this.waifus;
          break;
        case "waifus":
          this.display = this.waifus.filter((x) => (x.tier == "A") && (x.tier == "B"));
          break;
        case "husbandos":
          this.display = this.waifus.filter((x) => x.tier == "Husbandos");
          break;
        case "memes":
          this.display = this.waifus.filter((x) => x.tier === "Meme");
          break;
      }
    },
    isWaifu: function (id) {
      if (this.selection) { 
        if (this.selection.bestWaifuId == id) {
          return " is your Best Waifu";
        } else if(this.selection.bestMemeId == id) {
          return " is your Best Meme";
        } else if(this.selection.waifu1Id == id || this.selection.waifu2Id == id || this.selection.waifu3Id == id || this.selection.waifu4Id == id || this.selection.waifu5Id == id || this.selection.waifu6Id == id || this.selection.waifu7Id == id || this.selection.waifu8Id == id || this.selection.waifu9Id == id) {
          return " is one of your waifus";
        } else if(this.selection.meme1Id == id || this.selection.meme2Id == id || this.selection.meme3Id == id || this.selection.meme4Id == id || this.selection.meme5Id == id || this.selection.meme6Id == id || this.selection.meme7Id == id || this.selection.meme8Id == id || this.selection.meme9Id == id) {
          return " is one of your memes";
        }
        else {
          return null;
        }
      }
    }
  }
};
</script>
<style scoped>
</style>
