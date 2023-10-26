<template>
    <div>
      <TableFantasyLeague :selection="selection" v-if="token === '' || disabled || selection.length != 0"/>
      <FantasyLeagueSelection :token="token" @checkFantasyleague="check_fantasyleague" v-else/>
    </div>
</template>
<script>
import { CHECK_FANTASYLEAGUE } from "../gql/check_fantasyleague";
import TableFantasyLeague from "../components/TableFantasyLeague.vue";
import FantasyLeagueSelection from "../components/FantasyLeagueSelection.vue";
export default {
  props: ["token"],
  components: { 
    TableFantasyLeague,
    FantasyLeagueSelection
  },
  data() {
    return {
      disabled: true,
      selection: []
    }
  },
  mounted() {
    this.check_fantasyleague()
  },
  watch: {
    token: function() {
      this.selection = []
      this.check_fantasyleague()
    }
  },
  methods: {
    check_fantasyleague: async function() {
      const data = await this.$apollo.query({
				query: CHECK_FANTASYLEAGUE,
				fetchPolicy: 'network-only',
				variables: {
					token: this.token,
				}
			});
      if(data.data.checkVoteFantasyleague != null && data.data.checkVoteFantasyleague != "") {
        this.selection = data.data.checkVoteFantasyleague[0]
      }
    }
  }
}
</script>
