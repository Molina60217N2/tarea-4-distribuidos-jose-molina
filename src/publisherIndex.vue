<template>
    <div class="row">
      <div style="margin-top: 5%">
        <h2>{{ title }}</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Año de Fundación</th>
              <th>Género</th>
              <th>Historia</th>
              <th>Libros</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="publisher in publishers" :key="publisher.id">
              <td>{{ publisher.name }}</td>
              <td>{{ publisher.founded }}</td>
              <td>{{ publisher.genre }}</td>
              <td>{{ publisher.history }}</td>
              <td>
                <router-link class="button" :to="'/publisher/show/'+publisher._id">Show</router-link>
                <button class="button" v-on:click="deletePublisher(publisher._id)">Erease</button>
              </td>
            </tr>
          </tbody>
        </table>
        <router-link class="button button-primary" to="/publisher/create">New</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        publishers: [],
        title: 'PublisherList',
      };
    },
    methods: {
      allPublishers() {
        fetch('/.netlify/functions/publisherFindAll', {
          headers: { Accept: 'application/json' },
        })
          .then((response) => response.json())
          .then((result) => {
            console.log(result)
            this.publishers = result;
          });
      },
      deletePublisher(id) {
        fetch('/.netlify/functions/publisherDelete/' + id, {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify({ _method: 'DELETE' }),
        }).then(() => {
          this.allPublishers();
        });
      },
    },
    mounted() {
      this.allPublishers();
    },
  };
  </script>
  