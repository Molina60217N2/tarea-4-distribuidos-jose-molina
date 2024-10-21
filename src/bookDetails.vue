<!-- bookDetails.vue -->
<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <div>
        <div class="row">
          <div class="six columns">
            <label for="titleInput">Title</label>
            <input class="u-full-width" type="text" v-model="book.title">
          </div>
          <div class="six columns">
            <label for="editionInput">Edition</label>
            <input class="u-full-width" type="text" v-model="book.edition">
          </div>
          <div class="six columns">
            <label for="copyrightInput">Copyright</label>
            <input class="u-full-width" type="text" v-model="book.copyright">
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="emailInput">Author</label>
            <input class="u-full-width" type="text" v-model="book.author">
          </div>
          <div class="six columns">
            <label for="phoneInput">Publisher</label>
            <input class="u-full-width" type="tel" v-model="book.publisher">
          </div>
          <router-link class="button button-primary" to="/book">Back</router-link>
          <button class="button button-primary" v-on:click="updateBook(book._id)">Actualizar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { useRoute } from 'vue-router'

export default {
  props: ['create', 'edit', 'show'],
  data: function () {
    return {
      title: "Book Data",
      book: { 'title': '', 'edition': '', 'copyright': '', 'language': '', 'pages': '', 'author': "", 'publisher': '' },
    }
  },
  created() {
    const route = useRoute();
    this.findBook(route.params.id);
  },
  methods: {
    findBook: function (id) {
      fetch('/.netlify/functions/bookFind/' + id,
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.book = result;
        })
    },

    updateBook: function (id) {
      fetch('/.netlify/functions/bookUpdate/' + id, {  // Usar _id para la URL
        method: 'PUT',  // Usar PUT para la actualización
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.book)  // Enviar los datos del libro
      })
        .then(response => response)
        .then(result => {
          console.log('Libro actualizado:', result);
          this.$router.push('/book');
        })
        .catch(error => {
          console.error('Error actualizando libro:', error);
        });
    }
  },

}
</script>