<template>
  <div id="app" v-bind:class="{ 'error': api_error }">
    <error500 v-if="api_error"/>
    <Header v-if="!api_error" @checktoken="checktoken" @modal="modal" :token="token" />
    <div v-if="!api_error" class="main columns">
      <div
        class="column is-one-fifth is-hidden-mobile"
        :style="{
          backgroundImage: 'url(' + require('@/assets/WW-Left.png') + ')',
        }"
      ></div>
      <router-view v-if="!api_error" :token="token" class="column"></router-view>
      <div v-if="!api_error"
        class="column is-one-fifth is-hidden-mobile"
        :style="{
          backgroundImage: 'url(' + require('@/assets/WW-Right.png') + ')',
        }"
      ></div>
    </div>
    <Modal @checktoken="checktoken" @modal="modal" :isComponentModalActive="isComponentModalActive" />
    <Footer v-if="!api_error" />
  </div>
</template>

<script>
const axios = require("axios").default;
import Modal from "./components/LoginModal.vue";
import Footer from "./components/FooterComponent.vue";
import Header from "./components/HeaderComponent.vue";
import error500 from "./components/ErrorComponent500.vue";
export default {
  name: "App",
  components: {
    Footer,
    Header,
    Modal,
    error500
  },
  data() {
    return {
      isComponentModalActive: false,
      token: "",
      userid: null,
      api_error: false
    };
  },
  methods: {
    modal() {
      this.isComponentModalActive = !this.isComponentModalActive;
    },
    checktoken() {
      axios({
				method: 'get',
				url:
					'https://kitsu.io/api/edge/users?filter[self]=true&include=userRoles.role,userRoles.user',
				headers: {
					Authorization: 'Bearer ' + localStorage.getItem('token')
				}
			}).then((response) => {
				try {
          this.userid = JSON.parse(JSON.stringify(response['data'])).data[0].id;
          this.token = localStorage.getItem('token');
				} catch (error) {
          this.token = "";
					localStorage.clear();
				}
			});
    }
  },
  mounted() {
    fetch("https://api.waifuwars.madao-king.xyz", {method: "post"}).then(() => {
      this.api_error = false
    }).catch(() => {
      this.api_error = true
    });
    this.checktoken()
  }
};
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";
// Base colours
:root {
  // Base Colours
  --background-color: #161116ff;
  --secondary-background-color: #312631ff;
  --foreground-background-color: #453345ff;
  --secondary-foreground-background-color: #6f5c6fff;
  --cta-accept-color: #236147ff;
  --navbar-color: #161116ff;
  --navbar-hover-color: #251e25;
  --navbar-focus-color: #3a333a;
  // Shadow Colours
  --foreground-shadow: #16111688;
  // Text Colours
  --main-text: #fff;
  --secondary-text: #ddd;
  --placeholder-text: #ccc;
  --links-text: #ff8c7c;
  // Tags
  --generic-tag: #576163;
  --media-subtype-tag: var(--generic-tag);
  // Focus highlights
  --focus-highlight: #ff8c7c;
  --unfocused-highlights: #ff8c7c00;
  // Border-Radius
  --rounded-input: 7px;
  // Font Sizes
  --font-xs: 0.6rem;
  --font-sm: 0.8rem;
  --font-me: 1rem;
  --font-lg: 1.2rem;
  --font-xl: 1.4rem;
  --font-xxl: 1.8rem;
  // Font Weights
  --light: 300;
  --regular: 400;
  --semi-bold: 600;
  --bold: 700;
  --extra-bold: 800;
  // Standard Breakpoints
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
}
// Default border-box
* {
  box-sizing: border-box;
  text-rendering: optimizeLegibility;
}
// General font
body {
  font-family: "Open Sans", sans-serif;
  background-color: var(--secondary-background-color);
  color: var(--main-text);
}
// Set your colors
$primary: #fd755c;
$table-color: var(--primary);
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);
$navbar-background-color: var(--navbar-color);
$navbar-box-shadow-color: #282530;
$text-strong: #e7dfe0;
$navbar-burger-color: white;
//Table
$table-background-color: var(--navbar-color);
// $table-cell-border: #fff;
//Modal colors
$modal-card-body-background-color: var(--foreground-background-color);
$modal-card-head-background-color: var(--secondary-background-color);
$modal-card-title-color: white;
$modal-card-foot-border-top: #282530;
$modal-card-head-border-bottom: #282530;
$label-color: #eeeef1;
$message-body-pre-background-color: var(--background-color);
// Forms
$input-color: white;
$input-background-color: var(--background-color);
$input-border-color: var(--secondary-background-color);
// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": (
    $white,
    $black,
  ),
  "black": (
    $black,
    $white,
  ),
  "light": (
    $light,
    $light-invert,
  ),
  "dark": (
    $dark,
    $dark-invert,
  ),
  "primary": (
    $primary,
    $primary-invert,
  ),
  "info": (
    $info,
    $info-invert,
  ),
  "success": (
    $success,
    $success-invert,
  ),
  "warning": (
    $warning,
    $warning-invert,
  ),
  "danger": (
    $danger,
    $danger-invert,
  ),
  "twitter": (
    $twitter,
    $twitter-invert,
  ),
);
// Links
$link: $primary;
$link-hover: #dd452a;
$link-invert: $primary-invert;
$link-focus-border: $primary;
$navbar-item-hover-background-color: var(--navbar-hover-color);
$navbar-item-hover-color: #bfbfbf;
$navbar-item-color: #bfbfbf;
// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

.column {
  background-size: 100%;
  background-repeat: repeat-y;
}
.main {
  display: grid;
  flex-grow: 1;
  color: var(--secondary-text);
}
.columns {
  margin: 0px !important;
}
#app {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: calc(100% - 52px);
  position: absolute;
  width: 100%;
  background-color: var(--secondary-background-color);
}
.navbar-burger {
  margin-left: 0px !important;
}
.b-tabs {
	margin: 15px;
	.tabs ul {
		justify-content: center !important;
		align-items: center;
	}
  nav a {
    background-color: var(--background-color);
  }
  nav a:hover {
    color: var(--background-color);
  }
}
.error {
  height: 100%;
}
.check {
  display: inline-block !important;
  position: absolute !important;
  bottom: 0px;
  margin-left: calc(50% - 20px);
  margin-bottom: 5px;
}
.control-label {
  padding-left: 0px !important;
}
form input[type="radio"] {
  display: none;
}
.b-radio.radio:not(.button) {
  margin-right: 0.25em;
}
.b-radio.radio:not(.button) + .radio:last-child {
  margin-left: 0.5em;
}
.step-title {
    color: #fd755c;
}
.select select option {
  color: white !important;
}
.step-content {
  padding: 0rem !important;
}
.b-tabs .tab-content {
  padding-top: 1rem;
  padding-bottom: 0px;
  padding-left: 0px;
  padding-right: 0px;
  margin: 0px !important;
}
</style>
