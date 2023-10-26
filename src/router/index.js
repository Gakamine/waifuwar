import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/pages/VotePage'
import Results from '@/pages/ResultsPage'
import Memes from '@/pages/MemePage'
import FantasyLeague from '@/pages/FantasyLeague'
import Winners from '@/pages/WinnersPage'
import error404_page from '@/pages/ErrorPage404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/results',
      name: 'Results',
      component: Results
    },
    {
      path: '/memes',
      name: 'Memes',
      component: Memes
    },
    {
      path: '/fantasyleague',
      name: 'Fantasy League',
      component: FantasyLeague
    },
    {
      path: '/winners',
      name: 'Winners',
      component: Winners
    },
    {
      path: '/*',
      name: 'Error 404',
      component: error404_page
    }
  ]
})