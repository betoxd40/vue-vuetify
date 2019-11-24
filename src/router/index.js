import Vue from 'vue'
import VueRouter from 'vue-router'
import LatestMovie from '@/views/LatestMovie'
import Movie from '@/views/Movie'
import SearchMovie from '@/views/SearchMovie'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LatestMovie',
      component: LatestMovie
    },
    {
      path: '/movie/:id',
      name: 'Movie',
      props: true,
      component: Movie
    },
    {
      path: '/search/:name',
      name: 'SearchMovie',
      props: true,
      component: SearchMovie
    }
  ]
})
