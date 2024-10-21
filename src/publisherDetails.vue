<template>
    <div class="row">
      <div class="eleven column" style="margin-top: 5%">
        <h2>{{ title }}</h2>
        <div>
          <div class="row">
            <div class="six columns">
              <label for="nameInput">Name</label>
              <input class="u-full-width" type="text" v-model="publisher.name" />
            </div>
            <div class="six columns">
              <label for="foundedInput">Año de Fundación</label>
              <input class="u-full-width" type="number" v-model="publisher.founded" />
            </div>
            <div class="six columns">
              <label for="genreInput">Género</label>
              <input class="u-full-width" type="text" v-model="publisher.genre" />
            </div>
            <div class="six columns">
              <label for="historyInput">Historia</label>
              <textarea class="u-full-width" v-model="publisher.history"></textarea>
            </div>
          </div>
          <div class="row">
            <router-link class="button button-primary" to="/publisher">Back</router-link>
            <button class="button button-primary"v-on:click="updatePublisher(publisher._id)">Update</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useRoute } from 'vue-router';
  
  export default {
    props: ['create', 'edit', 'show'],
    data: function () {
      return {
        title: 'Publisher Data',
        publisher: { name: '', founded: '', genre: '', history: '' },
      };
    },
    created() {
      const route = useRoute();
        this.findPublisher(route.params.id);
    },
    methods: {
      findPublisher(id) {
        fetch('/.netlify/functions/publisherFind/' + id, {
          headers: { Accept: 'application/json' },
        })
          .then((response) => response.json())
          .then((result) => {
            this.publisher = result;
          });
      },
      updatePublisher(id) {
        fetch('/.netlify/functions/publisherUpdate/' + id, {  // Usar _id para la URL
        method: 'PUT',  // Usar PUT para la actualización
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.publisher)  // Enviar los datos del libro
      })
        .then(response => response)
        .then(result => {
          console.log('Libro actualizado:', result);
          this.$router.push('/publisher');
        })
        .catch(error => {
          console.error('Error actualizando libro:', error);
        });
      },
    },
  };
  </script>
  