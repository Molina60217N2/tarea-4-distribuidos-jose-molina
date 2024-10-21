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
                    <button class="button button-primary" v-on:click="createBook">Crear</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            book: {
                'title': '', 'edition': '',
                'copyright': 0, 'language': '', 'pages': 0, 'author': '', 'author_id': 0,
                'publisher': '', 'publisher_id': 0
            },
            title: 'BookList'
        }
    },
    mounted() {
    },
    methods: {
        createBook: function () {
            // console.log(this.book);
            fetch('/.netlify/functions/bookInsert',
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'POST',
                    body: JSON.stringify(this.book)
                })
                .then((data) => {
                    this.$router.push('/book');
                }
                )
        }
    },
}
</script>