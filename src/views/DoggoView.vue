<script setup>
import { supabase, formActionDefault } from '@/utils/supabase'
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import imgWel from '@/assets/images/welcome.png'

const router = useRouter()
const drawer = ref(false) // mobile-friendly (closed by default)
const theme = ref('light')
const currentTime = ref(new Date().toLocaleString())
const formAction = ref({ ...formActionDefault })

const activeMenu = ref(null)

const setMenu = (menu) => {
  activeMenu.value = activeMenu.value === menu ? null : menu
}

const themes = {
  light: {
    '--navbar-bg': '#f5d5e0',
    '--card-bg': '#ffffff',
    '--text-color': '#000000',
  },
  dark: {
    '--navbar-bg': '#210635',
    '--card-bg': '#2a0e42',
    '--text-color': '#ffffff',
  },
  custom: {
    '--navbar-bg': '#b8a1d9',
    '--card-bg': '#efe4fb',
    '--text-color': '#3e0b6d',
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

const onLogout = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error during logout:', error)
    formAction.value.formProcess = false
    return
  }

  formAction.value.formProcess = false
  router.replace('/')
}

// 📰 Headlines state
const headlines = ref([])
let intervalId = null

const fetchRSS = async () => {
  try {
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://feeds-api.dotdashmeredith.com/v1/rss/google/01f5a196-39ac-4b84-9129-a22a69cc618d&_=${Date.now()}`,
    )
    const data = await response.json()

    headlines.value = data.items.slice(0, 6).map((item) => ({
      title: item.title,
      summary: item.description,
      link: item.link,
      imgSrc:
        item.enclosure?.link ||
        item.thumbnail ||
        'https://via.placeholder.com/300x200.png?text=No+Image',
    }))
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
  }
}

onMounted(() => {
  fetchRSS()
  intervalId = setInterval(fetchRSS, 300000)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})

const goToLink = (url) => window.open(url, '_blank')

setInterval(() => {
  currentTime.value = new Date().toLocaleString()
}, 1000)
</script>

<template>
  <v-app>
    <!-- App bar -->
    <v-app-bar app color="var(--navbar-bg)">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="custom-title"> </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!-- Sidebar -->
      <v-navigation-drawer
        v-model="drawer"
        app
        temporary
        lg-permanent
        width="250"
        :style="{ backgroundColor: 'var(--navbar-bg)' }"
      >
        <v-container class="text-center mt-4">
          <img :src="imgWel" alt="Welcome Icon" class="welcome-img" />
          <h1 class="text-h5 font-weight-bold custom-title">Welcome Owner</h1>
        </v-container>

        <v-list dense>
          <v-list-item to="/profile" component="RouterLink" class="menu-item">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item class="menu-item">
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

      <v-container fluid>
        <!-- Pet News -->
        <v-row>
          <v-col cols="12" class="second-column-background">
            <v-card
              class="pa-4"
              hover
              :style="{ backgroundColor: 'var(--card-bg)', color: 'var(--text-color)' }"
            >
              <v-card-title class="text-h5 custom-title">Pet News and Facts</v-card-title>
              <v-divider></v-divider>
              <v-row>
                <v-col v-for="(headline, index) in headlines" :key="index" cols="12" sm="6" md="4">
                  <v-card
                    class="pa-4"
                    hover
                    @click="goToLink(headline.link)"
                    style="cursor: pointer; background-color: #8569e4"
                  >
                    <v-card-title class="text-h6">{{ headline.title }}</v-card-title>
                    <v-card-subtitle>{{ headline.summary }}</v-card-subtitle>
                    <v-img :src="headline.imgSrc" height="200px"></v-img>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>

        <!-- Video -->
        <v-card
          max-width="100%"
          class="video-card mx-auto mt-5"
          :style="{ backgroundColor: 'var(--card-bg)' }"
        >
          <v-card-title class="text-h6">Watch Our Intro Video</v-card-title>
          <v-card-subtitle>
            <v-responsive aspect-ratio="16/9">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/js6IrC_6VcM"
                title="Intro Video"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </v-responsive>
          </v-card-subtitle>
        </v-card>
      </v-container>
    </v-main>

    <!-- ✅ Bottom Navigation -->
    <v-bottom-navigation app grow height="64" color="var(--navbar-bg)">
      <v-btn value="home" @click="router.push('/home')">
        <v-icon>mdi-home</v-icon>
        Home
      </v-btn>

      <v-btn value="consult" @click="router.push('/consult')">
        <v-icon>mdi-stethoscope</v-icon>
        Consult
      </v-btn>

      <v-btn value="profile" @click="router.push('/profile')">
        <v-icon>mdi-account</v-icon>
        Profile
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<style scoped>
:root {
  --navbar-bg: #f5d5e0;
  --card-bg: #ffffff;
  --text-color: #000000;
}

.custom-title {
  font-family: 'Lora', serif;
  color: #7b466a;
  font-weight: bold;
  margin-bottom: 10px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  margin-bottom: 12px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: #7b466a;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #efefef;
}

.menu-item.active {
  background-color: #d5b7f5 !important;
  font-weight: bold;
}

.sub-menu {
  padding-left: 30px;
}

.sub-sub-menu {
  padding-left: 50px;
}

.date-time-card {
  background-color: #ffcccb;
  border-radius: 10px;
}

.second-column-background {
  background-color: #f7f0fa;
  border-radius: 10px;
}

.video-card {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.video-card .v-card-title {
  font-size: 18px;
  font-weight: bold;
}

.welcome-img {
  height: 80px;
  width: auto;
}

@media (max-width: 600px) {
  .custom-title {
    font-size: 18px;
  }
  .menu-item {
    font-size: 14px;
    padding: 12px 16px;
  }
  .welcome-img {
    height: 60px;
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }
}
</style>
