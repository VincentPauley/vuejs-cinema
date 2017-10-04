<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item
        v-for="movie in filteredMovies"
        v-bind:movie="movie.movie"
      >
        <div class="movie-sessions">
          <div
            v-for="session in filteredSessions(movie.sessions)"
            class="session-time-wrapper tooltip-wrapper"
            v-tooltip="{ seats : session.seats }"
          >
            <div class="session-time">{{ formatSessionTime( session.time ) }}</div>
          </div>
        </div>
      </movie-item>
    </div>
    <div v-else-if="movies.length" class="no-results">
      {{ no_results }}
    </div>
    <!-- No movies can exist yet, show loading message -->
    <div v-else class="no-results">
      Loading...
    </div>
  </div>
</template>
<script>

    // grab external helper for genres & times
    import genres from '../util/genres.js';
    import times from '../util/times.js';
    // import component
    import MovieItem from './MovieItem.vue';

    // components must export an object back
    export default {
        props : [ 'genre', 'time', 'movies', 'day' ],
        methods: {
            moviePassesGenreFilter( movie ) {
                // if no filters selected, all movies pass so return true
                if( this.genre.length < 1 ) return true;

                let movie_genres = movie.movie.Genre.split( ', ' );

                let matched = true; // by default all movies match

                // iterate each selected genre filiter
                this.genre.forEach( genre => {

                    // if this specific movie does not have a genre filter, set matched to false
                    if( movie_genres.indexOf( genre ) < 0 ) {
                        matched = false;
                    }
                });

                // return boolean as to wether or not the movie's genres match selected filters
                return matched;
            },
            sessionPassesTimeFilter( session ) {
                // return false if session is not the same day
                if( !this.day.isSame( this.$moment( session.time ), 'day' )) {
                    return false;
                } else if( this.time.length === 0 || this.time.length === 2 ) {
                    // this case means that neither or both of the time filters are checked, so should return true
                    return true;
                } else if( this.time[0] === times.AFTER_6PM ) {
                    // guarnteed to only have one time element if this is hit
                    // if the hour is greater than 1800 hours then it passes
                    return this.$moment(session.time).hour() >= 18;
                } else {
                    // check for before 6PM
                    return this.$moment(session.time).hour() <= 18;
                }
            },
            formatSessionTime( raw ) {
                return this.$moment( raw ).format('h:mm A');
            },
            filteredSessions( sessions ) {
                return sessions.filter(this.sessionPassesTimeFilter);
            }
        },
        computed: {
            filteredMovies() {
                // notice the chained filter methods
                return this.movies
                  .filter( this.moviePassesGenreFilter )
                  .filter( movie => movie.sessions.find( this.sessionPassesTimeFilter ) );
            },
            no_results() {
                let times = this.time.join( ', ' );
                let genres = this.genre.join( ', ' );
                // you can interpolate into template strings!, use ternary to control comma between two groups
                return `No results for ${ times } ${ times.length ? ', ' : '' } ${ genres }`;
            }
        },
        /*
          So even though we have imported the MovieItem component above
          we still need to include it as a component here in order to use
          it.  Note that we're using ES6 syntax here since the key will
          have the same value as the name.

        */
        components: {
            MovieItem
        }
    }
</script>
