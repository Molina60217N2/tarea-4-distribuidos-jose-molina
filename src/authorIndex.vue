<!-- src/authorIndex.vue -->
<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Fecha Nacimiento</th>
            <th>Biografía</th>
            <th>Libros</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='author in authors'>
            <td>{{ author.name }}</td>
            <td>{{ author.birthdate }}</td>
            <td>{{ author.biography }}</td>
            <!-- <td>
              <div v-for="book in author.books" :key="book._id">
                <router-link :to="'/book/show/' + book._id">{{ book.title }}</router-link>
              </div>
            </td> -->
            <td>
              <router-link class="button" :to="'/author/show/' + author._id">Show</router-link>
              <button class="button" v-on:click="deleteAuthor(author._id)">Erase</button>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link class="button button-primary" to="/author/create">New</router-link>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      authors: [],
      title: 'AuthorList'
    }
  },
  methods: {
    allAuthors() {
      fetch('/.netlify/functions/authorFindAll',
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((result) => {
          this.authors = result;
        })
    },
    deleteAuthor(id) {
      fetch('/.netlify/functions/authorDelete/' + id,
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'DELETE'
        })
        .then ((response) => response)
        .then ((result) => {
          console.log(result);
          this.allAuthors();
        })
    }
  },
  mounted() {
    this.allAuthors()
  }
}
</script>