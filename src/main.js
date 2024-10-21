// src/main.js
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import './css/normalize.css';
import './css/skeleton.css';

import bookIndex from './bookIndex.vue'
import bookDetails from './bookDetails.vue'
import authorIndex from './authorIndex.vue'
import authorDetails from './authorDetails.vue'
import publisherIndex from './publisherIndex.vue'
import publisherDetails from './publisherDetails.vue'
import bookCreate from './bookCreate.vue'
import authorCreate from './authorCreate.vue'
import publisherCreate from './publisherCreate.vue'

const routes = [
  { path: '/book', 
    component: bookIndex,
    props: true},
  { path: '/book/show/:id',
    component: bookDetails,
    props: {show: true}},
  { path: '/book/edit/:id',
    component: bookDetails,
    props: {edit: true}},
  { path: '/book/create',
    component: bookCreate,
    props: {create: true}},
  { path: '/book/delete/:id',
    component: bookDetails,
    props: {delete: true}},
  { path: '/',
    component: bookIndex,
    props: true},
  { path: '/author',
    component: authorIndex,
    props: true},
    { path: '/author/create',
      component: authorCreate,
      props: true},
  { path: '/author/show/:id',
    component: authorDetails,
    props: {show: true}},
  { path: '/publisher',
    component: publisherIndex,
    props: true},
    { path: '/publisher/create',
      component: publisherCreate,
      props: true},
  { path: '/publisher/show/:id',
    component: publisherDetails,
    props: {show: true}},
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

let app = createApp(App)

app.use(router)

app.mount('#app')