<template>
  <div class="bg_waifus"
    :style="{
      backgroundImage: 'url(' + require('@/assets/architecture.png') + ')',
    }"
  >
    <b-tooltip position="is-top" multilined>
      <img class="waifus" src="@/assets/w_2019.png" />
      <template v-slot:content>
        <p><b>Holo</b></p>
        <i>Waifu Wars 2019</i>
      </template>
    </b-tooltip>
    <b-tooltip position="is-top" multilined>
      <img class="waifus" src="@/assets/w_2020.png" />
      <template v-slot:content>
        <p><b>Makise Kurisu</b></p>
        <i>Waifu Wars 2020</i>
      </template>
    </b-tooltip>
    <b-tooltip position="is-top" multilined>
      <img class="waifus" src="@/assets/w_2021.png" />
      <template v-slot:content>
        <p><b>Holo</b></p>
        <i>Waifu Wars 2019</i>
      </template>
    </b-tooltip>
  </div>
</template>
<script>
export default {
  props: ["token"]
}
</script>

<style scoped>
.waifus {
  max-height: 250px;
  cursor: pointer;
  z-index: 2;
  position: relative;
}
.bg_waifus {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom center;
    padding: 0px;
    margin-top: auto;
    height: 550px;
}
.b-tooltip {
  top: calc(100% - 250px);
}
.b-tooltip:nth-child(2) {
    float: right
}
</style>
