import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '@/views/SignUp.vue'
import DoggoView from '@/views/DoggoView.vue'
import ContactusView from '@/views/ContactusView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import SymptomscatView from '@/views/SymptomscatView.vue'
import SymptomsdogView from '@/views/SymptomsdogView.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: HomeView },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },

  {
    path: '/doggo',
    name: 'Doggo',
    component: DoggoView,
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactusView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/dog',
    name: 'dog',
    component: SymptomsdogView,
  },
  {
    path: '/cat',
    name: 'cat',
    component: SymptomscatView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
