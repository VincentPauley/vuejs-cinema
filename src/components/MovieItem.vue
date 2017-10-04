<template>
  <div  class="movie">
    <div class="movie-col-left"></div>
      <router-link v-bind:to="{ name: 'movie', params: { id: movie.imdbID } }">
        <img v-bind:src="movie.Poster" />
      </router-link>
    <div class="movie-col-right">
      <div class="movie-title">
        <!-- router-link is a special component offered in Vue Router to link to different views like an href -->
        <router-link v-bind:to="{ name: 'movie', params: { id: movie.imdbID } }">
          <h2>{{ movie.Title }}</h2>
        </router-link>
        <span class="movie-rating">{{ movie.Rated }}</span>
      </div>
      <!-- slot allows for space for some instances of the component to include extra content -->
      <slot></slot>
    </div>
  </div>
</template>
<script>

    export default {
        props: [ 'movie' ],
        methods: {

        }
    };
</script>
