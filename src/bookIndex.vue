<!-- src/bookIndex.vue -->
<template>
  <div class="row">
    <div style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Edition</th>
            <th>Copyright</th>
            <th>Author</th>
            <th>Publisher</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='book in books'>
            <td>{{ book.title }}</td>
            <td>{{ book.edition }}</td>
            <td>{{ book.copyright }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.publisher }}</td>
            <td>
              <router-link class="button" :to="'/book/show/' + book._id">Show</router-link>
              <!-- <router-link class="button"
        :to="'/book/edit/'+book.id">Edit</router-link> -->
              <button class="button" v-on:click="deleteBook(book._id)">Erase</button>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link class="button button-primary" to="/book/create">New</router-link>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      books: [],
      title: 'BookList'
    }
  },
  methods: {
    allBook() {
      fetch('/.netlify/functions/bookFindAll',
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          this.books = result;
        })
    },
    deleteBook(id) {
      fetch('/.netlify/functions/bookDelete/' + id,
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'DELETE'
        })
        .then ((response) => response)
        .then ((result) => {
          console.log(result);
          this.allBook();
        })
    }
  },
  mounted() {
    this.allBook()
  }
}
</script>