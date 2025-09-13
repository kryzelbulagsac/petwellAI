<script setup>
import { supabase, formActionDefault } from '@/utils/supabase'
import { getAvatarText } from '@/utils/helpers'
import { useRouter } from 'vue-router'
import { onMounted, ref, watchEffect } from 'vue'
import imgWel from '@/assets/images/welcome.png'

import imgCute1 from '@/assets/images/avatar cat/cat1.png'
import imgCute2 from '@/assets/images/avatar cat/cat2.png'
import imgCute3 from '@/assets/images/avatar cat/cat3.png'
import imgCute4 from '@/assets/images/avatar cat/cat4.png'
import imgCute5 from '@/assets/images/avatar cat/cat5.png'

import imgDog1 from '@/assets/images/avatar dog/dog1.png'
import imgDog2 from '@/assets/images/avatar dog/dog2.png'
import imgDog3 from '@/assets/images/avatar dog/dog3.png'
import imgDog4 from '@/assets/images/avatar dog/dog4.png'
import imgDog5 from '@/assets/images/avatar dog/dog5.png'

const router = useRouter()

const drawer = ref(true)
const theme = ref('light')
const consultOpen = ref(false)
const typeOpen = ref(false)
const currentTime = ref(new Date().toLocaleString())
const formAction = ref({ ...formActionDefault })
const avatarDialog = ref(false)

const catAvatars = [imgCute1, imgCute2, imgCute3, imgCute4, imgCute5]
const dogAvatars = [imgDog1, imgDog2, imgDog3, imgDog4, imgDog5]

const userData = ref({
  initials: '',
  email: '',
  username: '',
  profileUrl: null,
})
const activeMenu = ref(null) // 'consult' | 'type' | 'cat' | 'dog' | null

const setMenu = (menu) => {
  activeMenu.value = activeMenu.value === menu ? null : menu
}

const themes = {
  light: {
    '--navbar-bg': '#f5d5e0',
    '--background-color': '#bb9ac9',
  },
  dark: {
    '--navbar-bg': '#210635',
    '--background-color': '#bf7ab8',
  },
  custom: {
    '--navbar-bg': '#42od4b',
    '--background-color': '#f9cbdf',
  },
}

const changeTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : theme.value === 'dark' ? 'custom' : 'light'
}

watchEffect(() => {
  const selectedTheme = themes[theme.value]
  Object.entries(selectedTheme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
})

setInterval(() => {
  currentTime.value = new Date().toLocaleString()
}, 1000)

const toggleConsult = () => (consultOpen.value = !consultOpen.value)
const toggleType = () => (typeOpen.value = !typeOpen.value)

const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const metadata = user.user_metadata
    userData.value.email = metadata.email
    userData.value.username = metadata.username
    userData.value.initials = getAvatarText(metadata.username)
    userData.value.profileUrl = metadata.profileUrl || null
  }
}

const selectAvatar = async (avatarUrl) => {
  userData.value.profileUrl = avatarUrl
  avatarDialog.value = false

  const { error: updateError } = await supabase.auth.updateUser({
    data: { profileUrl: avatarUrl },
  })

  if (updateError) {
    console.error('Error updating user metadata:', updateError)
    return
  }

  await getUser()
}

const onLogout = async () => {
  formAction.value.formProcess = true
  const { error } = await supabase.auth.signOut()
  formAction.value.formProcess = false
  if (error) {
    console.error('Error during logout:', error)
    return
  }
  router.replace('/')
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <v-app>
    <v-app-bar app color="var(--navbar-bg)" height="64">
      <v-btn icon @click="drawer = !drawer">
        <v-icon>{{ drawer ? 'mdi-menu-open' : 'mdi-menu' }}</v-icon>
      </v-btn>
      <v-toolbar-title class="text-h6 ml-2">
        <span v-if="drawer">TailCare</span>
        <v-icon v-else>mdi-paw</v-icon>
      </v-toolbar-title>
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="!drawer && $vuetify.display.mdAndUp"
      :permanent="$vuetify.display.mdAndUp"
      :temporary="!$vuetify.display.mdAndUp"
      app
      width="250"
      mini-variant-width="56"
    >
      <v-container class="text-center mt-4">
        <img :src="imgWel" alt="Welcome Icon" style="height: 100px; width: auto" v-if="drawer" />
        <h1 class="text-h5 font-weight-bold custom-title" v-if="drawer">Welcome Owner</h1>
      </v-container>

      <v-list dense>
        <v-list-item to="/layout" component="RouterLink" class="menu-item">
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item to="/doggo" component="RouterLink" class="menu-item">
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <!-- Consult Menu -->
        <v-list-item
          @click="setMenu('consult')"
          class="menu-item"
          :class="{ active: activeMenu === 'consult' }"
        >
          <v-list-item-title>
            Consult
            <v-icon v-if="activeMenu === 'consult'" small class="ml-2">mdi-chevron-down</v-icon>
          </v-list-item-title>
        </v-list-item>

        <!-- Type Menu -->
        <v-list-item
          v-if="activeMenu === 'consult'"
          @click="setMenu('type')"
          class="menu-item sub-menu"
          :class="{ active: activeMenu === 'type' }"
        >
          <v-list-item-title>
            Type
            <v-icon v-if="activeMenu === 'type'" small class="ml-2">mdi-chevron-down</v-icon>
          </v-list-item-title>
        </v-list-item>

        <!-- Cat -->
        <v-list-item
          v-if="activeMenu === 'type'"
          to="/symptomscat"
          component="RouterLink"
          class="menu-item sub-sub-menu"
          :class="{ active: activeMenu === 'cat' }"
          @click="setMenu('cat')"
        >
          <v-icon left>mdi-cat</v-icon>
          <v-list-item-title>Cat</v-list-item-title>
        </v-list-item>

        <!-- Dog -->
        <v-list-item
          v-if="activeMenu === 'type'"
          to="/symptomsdog"
          component="RouterLink"
          class="menu-item sub-sub-menu"
          :class="{ active: activeMenu === 'dog' }"
          @click="setMenu('dog')"
        >
          <v-icon left>mdi-dog</v-icon>
          <v-list-item-title>Dog</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item to="/contact" component="RouterLink" class="menu-item">
          <v-list-item-title>Contact Us</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item @click="changeTheme" class="menu-item">
          <v-list-item-title>Change Theme</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          @click="onLogout"
          class="menu-item"
          :loading="formAction.formProcess"
          :disabled="formAction.formProcess"
        >
          <v-list-item-title>Sign Out</v-list-item-title>
        </v-list-item>

        <v-card class="date-time-card mt-5" style="padding: 16px; text-align: center">
          <v-card-title class="text-h6">Current Date and Time</v-card-title>
          <v-card-subtitle>
            <div>{{ currentTime }}</div>
          </v-card-subtitle>
        </v-card>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main class="main-background">
      <v-container class="profile-container" fluid>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card class="pa-6" elevation="10" rounded="lg">
              <div class="text-center">
                <v-avatar
                  size="110"
                  class="mx-auto mb-3 profile-avatar"
                  @click="avatarDialog = true"
                >
                  <template v-if="userData.profileUrl">
                    <v-img :src="userData.profileUrl" />
                  </template>
                  <template v-else>
                    <span class="text-h5">{{ userData.initials }}</span>
                  </template>
                </v-avatar>

                <p class="text-caption grey--text mb-1">Click image to choose avatar</p>

                <h3 class="text-h6 mt-2 font-weight-bold">{{ userData.username }}</h3>
                <p class="text-body-2 grey--text text--darken-2">{{ userData.email }}</p>

                <v-divider class="my-5" />

                <v-btn color="error" variant="outlined" rounded @click="onLogout"> Logout </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <!-- Avatar Picker Dialog -->
      <v-dialog v-model="avatarDialog" max-width="600">
        <v-card>
          <v-card-title class="text-h6">Choose Your Avatar</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <h4 class="mb-2">Cats</h4>
            <v-row>
              <v-col v-for="(img, index) in catAvatars" :key="'cat-' + index" cols="4">
                <v-img
                  :src="img"
                  class="avatar-choice"
                  @click="selectAvatar(img)"
                  height="100"
                  cover
                />
              </v-col>
            </v-row>
            <h4 class="mt-4 mb-2">Dogs</h4>
            <v-row>
              <v-col v-for="(img, index) in dogAvatars" :key="'dog-' + index" cols="4">
                <v-img
                  :src="img"
                  class="avatar-choice"
                  @click="selectAvatar(img)"
                  height="100"
                  cover
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="avatarDialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>

<style scoped>
:root {
  --navbar-bg: #f5d5e0;
  --background-color: #bb9ac9;
}

.main-background {
  background-color: var(--background-color);
  min-height: 100vh;
}

.custom-title {
  font-family: 'Lora', serif;
  color: #7b466a;
  font-weight: bold;
  margin-bottom: 10px;
}

.menu-item {
  padding: 16px 20px;
  margin-bottom: 12px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: #7b466a;
}

.menu-item:hover {
  background-color: #efefef;
}

.date-time-card {
  background-color: #ffcccb;
  border-radius: 10px;
}

.profile-container {
  background-color: transparent;
  padding-bottom: 60px;
  padding-top: 50px;
}

.profile-avatar {
  cursor: pointer;
  border: 2px solid #ccc;
  transition: transform 0.2s ease;
}

.profile-avatar:hover {
  transform: scale(1.05);
  border-color: #3f51b5;
}

.avatar-choice {
  cursor: pointer;
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.avatar-choice:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
