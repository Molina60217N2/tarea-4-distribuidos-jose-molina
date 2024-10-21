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
                    <button class="button button-primary" v-on:click="createPublisher">Create</button>
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
            title: 'Publisher Data',
            publisher: { name: '', founded: '', genre: '', history: '' },
        };
    },
    created() {
        const route = useRoute();
    },
    methods: {
        createPublisher() {
            fetch('/.netlify/functions/publisherInsert', {
                method: 'POST',
                body: JSON.stringify(this.publisher),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((data) => {
                    this.$router.push('/publisher');
                })
        },
    },
};
</script>