import Vue from 'vue'; // webpack understands this is from node_modules
import './style.scss';

// grab external helper for genres
import genres from './util/genres.js';

import VueResource from 'vue-resource';
Vue.use( VueResource ); // Vue.use only works with specifically designed libraries

// since moment is not designed to integrate with vue, need to pass it into the root data and subsequent components that need it
import moment from 'moment-timezone';
// set timezone
moment.tz.setDefault('UTC');
// and then add it to Vue prototype to make it accessible within vue
Object.defineProperty( Vue.prototype, '$moment', { get() { return this.$root.moment } } );
// dollar sign in front of name 'moment' denotes a 3rd party lib

// import checkFilter method
import { checkFilter, setDay } from './util/bus.js';

// define event bus and add it to Vue
const bus = new Vue();
Object.defineProperty( Vue.prototype, '$bus', {get() { return this.$root.bus }} );

// get the Vue Router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes.js';

// instance of Router, define routes using paths and the component that should be shown
const router = new VueRouter({
  routes
});

new Vue({
    el: '#app',
    data : {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus
    },
    created: function() {

        // retrieve movie data and assign it to the "movies" data prop
        this.$http.get( '/api' ).then( response => {
            this.movies = response.data;
        });
        // note: typically a good idea to setup your event subscribers in the root created lifecycle hook
        this.$bus.$on( 'check-filter', checkFilter.bind(this) ); // bind Vue instance to method's "this" context so it can access it
        this.$bus.$on( 'set-day', setDay.bind(this) );
    },
    router // destructured assignment to include routes
});


import { addClass, removeClass } from './util/helpers.js';

let mouseOverHandler = function( event ) {
  let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
  addClass(span, 'tooltip-show');
}

let mouseOutHandler = function( event ) {
  let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
  removeClass(span, 'tooltip-show');
}

Vue.directive('tooltip', {
    bind( el, bindings ) {
        let span = document.createElement('SPAN');
        let text = document.createTextNode('Seats available: 200');
        span.appendChild(text);
        addClass(span, 'tooltip');
        el.appendChild(span);
        let div = el.getElementsByTagName('DIV')[0];
        div.addEventListener('mouseover', mouseOverHandler );
        div.addEventListener('mouseout', mouseOutHandler );
        div.addEventListener('touchstart', mouseOverHandler );
        div.addEventListener('touchend', mouseOutHandler );
    },
    // clear event listener to free memory
    unbind(el) {
        let div = el.getElementsByTagName('DIV')[0];
        div.removeEventListener('mouseover', mouseOverHandler );
        div.removeEventListener('mouseout', mouseOutHandler );
        div.removeEventListener('touchstart', mouseOverHandler );
        div.removeEventListener('touchend', mouseOutHandler );
    }
});
