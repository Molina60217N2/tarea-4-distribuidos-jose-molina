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
          <button class="button button-primary" v-on:click="updateAuthor(author._id)">Update</button>
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
      this.findAuthor(route.params.id);
  },
  methods: {
    findAuthor: function (id) {
      fetch('/.netlify/functions/authorFind/' + id, {
        headers: { Accept: 'application/json' },
      })
        .then((response) => response.json())
        .then((result) => {
          this.author = result;
        });
    },
    updateAuthor: function (id) {
      fetch('/.netlify/functions/authorUpdate/' + id, {  // Usar _id para la URL
        method: 'PUT',  // Usar PUT para la actualización
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.author)  // Enviar los datos del libro
      })
        .then(response => response)
        .then(result => {
          console.log('Autor actualizado:', result);
          this.$router.push('/author');
        })
        .catch(error => {
          console.error('Error actualizando autor:', error);
        });
    },
  },
};
</script>