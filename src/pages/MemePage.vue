<template>
  <div class="grid_meme">
    <div
      class="row_meme"
      v-for="meme in memes"
      :key="meme.id"
      @click="(isImageModalActive = true) && (zoom = meme.image)"
    >
      <div class="img_container">
        <img :src="'https://api.waifuwars.madao-king.xyz/' + meme.image" />
      </div>
      <p>{{ meme.title }}</p>
    </div>
    <b-modal v-model="isImageModalActive">
      <p class="image">
        <img :src="'https://api.waifuwars.madao-king.xyz/' + zoom" />
      </p>
    </b-modal>
  </div>
</template>

<script>
import { FETCH_MEME_QUERY } from "../gql/meme";
export default {
  props: ["token"],
  data() {
    return {
      memes: [],
      isImageModalActive: false,
      zoom: null,
    };
  },
  apollo: {
    memes: {
      query: FETCH_MEME_QUERY,
      update(data) {
        return data["meme"];
      },
    },
  }
};
</script>
<style lang="scss">
.grid_meme {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(250px, 1fr));
}
.row_meme {
  margin: 15px;
  padding: 15px;
  background-color: var(--foreground-background-color);
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  overflow: hidden;
  max-height: 310px;
}
.row_meme:hover {
  background-color: var(--secondary-foreground-background-color);
}
.img_container {
  height: 250px;
  overflow: hidden;
}
.modal-content img {
  height: 100%;
  width: auto;
  margin: auto;
}
.modal-content .image {
  height: 100%;
}
</style>
