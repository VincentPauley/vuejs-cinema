import Vue from 'vue'; // webpack understands this is from node_modules
import './style.scss';

// grab external helper for genres
import genres from './util/genres.js';

new Vue({
    el: '#app',
    components: {
      'movie-list': {
          template: `<div id="movie-list">
                        <div v-for="movie in movies" class="movie">{{ movie.title }}</div>
                     </div>`,
          data: function() {
              return {
                  movies: [
                      {
                          title: 'Night at the Roxbury'
                      },
                      {
                          title: 'Pulp Fiction'
                      },
                      {
                          title: 'It'
                      },
                      {
                          title: 'Harry Potter and the Sorcerer\'s Stone.'
                      },
                  ]
              };
          }
      },
      'movie-filter': {
          data() {
              return {
                 genres // ES6 pragma: if key is the same as value name then thats all you need!
              }
          },
          template: `<div id="movie-filter">
                        <h2>Filter Results</h2>
                        <div class="filter-group">
                          <check-filter v-for="genre in genres"></check-filter>
                        </div>
                    </div>`,
          // You can make sub-components!
          components: {
              // now these will only be available in the movie-filter components
              'check-filter': {
                  template: `<div>Filter</div>`
              }
          }
      }
    }
});
/*

Note: components are almost like mini instances
of Vue, they can be given their own templates,
data, methods, etc.


*/
