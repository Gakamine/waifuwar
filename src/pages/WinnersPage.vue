<template>
  <div class="bg_waifus"
    :style="{
      backgroundImage: 'url(' + require('@/assets/architecture.png') + ')',
    }"
  >
  <b-carousel :arrow="true" :indicator="false">
        <b-carousel-item>
            <section class="hero is-medium">
                <div class="hero-body has-text-centered">
                  <b-tooltip position="is-top" multilined>
                    <img class="waifus" src="@/assets/w_2019.png" />
                    <template v-slot:content>
                      <p><b>Holo</b></p>
                      <i>Waifu Wars 2019</i>
                    </template>
                  </b-tooltip>
                </div>
            </section>
          </b-carousel-item>
          <b-carousel-item>
            <section class="hero is-medium">
                <div class="hero-body has-text-centered">
                  <b-tooltip position="is-top" multilined>
                    <img class="waifus" src="@/assets/w_2020.png" />
                    <template v-slot:content>
                      <p><b>Makise Kurisu</b></p>
                      <i>Waifu Wars 2020</i>
                    </template>
                  </b-tooltip>
                </div>
            </section>
        </b-carousel-item>
        <b-carousel-item>
            <section class="hero is-medium">
                <div class="hero-body has-text-centered">
                  <b-tooltip position="is-top" multilined>
                    <img class="waifus" src="@/assets/w_2021.png" />
                    <template v-slot:content>
                      <p><b>Violet Evergarden</b></p>
                      <i>Waifu Wars 2021</i>
                    </template>
                  </b-tooltip>
                </div>
            </section>
        </b-carousel-item>
        <b-carousel-item>
            <section class="hero is-medium">
                <div class="hero-body has-text-centered">
                  <b-tooltip position="is-top" multilined>
                    <img class="waifus" src="@/assets/w_2022.png" />
                    <template v-slot:content>
                      <p><b>Yor Forger</b></p>
                      <i>Waifu Wars 2022</i>
                    </template>
                  </b-tooltip>
                </div>
            </section>
        </b-carousel-item>
    </b-carousel>
  </div>
</template>
<script>
export default {
  props: ["token"]
}
</script>

<style scoped>
.waifus {
  max-height: 450px;
  cursor: pointer;
  z-index: 2;
}
.bg_waifus {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom center;
    padding: 0px;
    margin-top: auto;
    height: 550px;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
}
.b-tooltip {
  top: calc(100% - 450px);
}
</style>
