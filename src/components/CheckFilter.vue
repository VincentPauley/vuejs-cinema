<template>
  <div v-bind:class="{ 'check-filter': true, active: checked }" v-on:click="checkFilter">
    <span class="checkbox"></span>
    <span class="check-filter-title">{{ title }}</span>
  </div>
</template>
<script>

    // grab external helper for genres
    // import genres from '../util/genres.js';

    export default {
        data() {
            return {
               checked: false
             }
        },
        props : [
          'title', 'category'
        ],
        methods: {
            checkFilter() {
                this.checked = !this.checked;

                // Emit event to event bus when filter is clicked
                this.$bus.$emit( 'check-filter', this.category, this.title, this.checked );
                /*

                  first argument: 'check-filter' is the name of the event that the parent will listen for

                  - everything after that is considered the 'payload', you can send any data you want in here. ours are:

                    1. 'genre'      -> hard-coded category so the root component knows what category the filter is
                    2. this.title   -> the title of the checked filter
                    3. this.checked -> boolean representing if the filter is checked or not
                */
            }
        }
    }
</script>
