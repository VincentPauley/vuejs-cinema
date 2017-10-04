import Overview from '../components/Overview.vue';
import Detail from '../components/Detail.vue';

export default [
  { path: '/', component: Overview, name: 'home' },
  // how to catch parameters
  { path: '/movie/:id', component: Detail, name: 'movie' },
  // default catch-all route, redirect to home
  { path: '*', redirect: {name: 'home'} }
];

/* Notes:

  > path is the url
  > component is what component should show at that url
  > name is how you reference a route from somewhere else

*/
