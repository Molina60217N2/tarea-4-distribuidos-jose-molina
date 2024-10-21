<template>
    <div class="row">
      <div class="eleven column" style="margin-top: 5%">
        <h2>{{ title }}</h2>
        <div>
          <div class="row">
            <div class="six columns">
              <label for="nameInput">Name</label>
              <input class="u-full-width" type="text" v-model="author.name" />
            </div>
            <div class="six columns">
              <label for="birthdateInput">Birthdate</label>
              <input class="u-full-width" type="date" v-model="author.birthdate" />
            </div>
            <div class="six columns">
              <label for="biographyInput">Biography</label>
              <textarea class="u-full-width" v-model="author.biography"></textarea>
            </div>
          </div>
          <div class="row">
            <router-link class="button button-primary" to="/author">Back</router-link>
            <button class="button button-primary" v-on:click="createAuthor">Crear</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useRoute } from 'vue-router';
  
  export default {
    data: function () {
      return {
        title: 'Author Data',
        author: { name: '', birthdate: '', biography: ''},
      };
    },
    created() {
      const route = useRoute();
    },
    methods: {
        createAuthor: function(){
            // console.log(this.author);
            fetch('/.netlify/functions/authorInsert',
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify(this.author)
                })
                .then((response)=>response)
                .then((data) => {
                    this.$router.push('/author');
                }
                )
        }
    },
  };
  </script>