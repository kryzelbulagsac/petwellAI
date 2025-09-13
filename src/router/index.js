import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import DoggoView from '@/views/DoggoView.vue'
import SymptomsdogView from '@/views/SymptomsdogView.vue'
import SymptomscatView from '@/views/SymptomscatView.vue'
import ContactusView from '@/views/ContactusView.vue'
import ProfileView from '@/views/ProfileView.vue'

import { supabase } from '@/utils/supabase'

// Check if user is authenticated
const isAuthenticated = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return !!session
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'login', component: LoginView },
    { path: '/sign', name: 'sign', component: SignupView },
    { path: '/doggo', name: 'doggo', component: DoggoView },
    { path: '/symptomsdog', name: 'symptomsdog', component: SymptomsdogView },
    { path: '/symptomscat', name: 'symptomscat', component: SymptomscatView },
    { path: '/contact', name: 'contactus', component: ContactusView },
    { path: '/layout', name: 'layout', component: ProfileView },
  ],
})

// Navigation guard
router.beforeEach(async (to) => {
  const isLoggedIn = await isAuthenticated()

  if (!isLoggedIn && to.name !== 'login' && to.name !== 'sign') {
    return { name: 'login' }
  }

  if (isLoggedIn && (to.name === 'login' || to.name === 'sign')) {
    return { name: 'doggo' }
  }

  return true
})

export default router
