<template>
  <b-tabs type="is-toggle-rounded">
    <b-tab-item label="Tier Waifu">
      <iframe
        src="https://challonge.com/en/k0repnem/module"
        width="100%"
        height="500"
        frameborder="0"
        scrolling="auto"
        allowtransparency="true"
      ></iframe>
    </b-tab-item>
    <b-tab-item label="Husbando">
      <iframe
        src="https://challonge.com/en/ve7twwn1/module"
        width="100%"
        height="500"
        frameborder="0"
        scrolling="auto"
        allowtransparency="true"
      ></iframe>
    </b-tab-item>
    <b-tab-item label="Tier Meme">
      <iframe
        src="https://challonge.com/en/3rt83aiz/module"
        width="100%"
        height="500"
        frameborder="0"
        scrolling="auto"
        allowtransparency="true"
      ></iframe>
    </b-tab-item>
  </b-tabs>
</template>
<script>
export default {
  props: ["token"]
}
</script>
<style scoped>
.column {
  padding: 0px !important;
}
.b-tabs {
  margin-top: 15px;
  margin-left: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
}
</style>
