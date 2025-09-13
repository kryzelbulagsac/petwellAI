<script setup>
import { supabase, formActionDefault } from '@/utils/supabase'
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import imgWel from '@/assets/images/welcome.png'

const router = useRouter()
// Initializing theme and other states
const drawer = ref(true)
const theme = ref('light')
const currentTime = ref(new Date().toLocaleString())
const formAction = ref({ ...formActionDefault })

const activeMenu = ref(null) // 'consult' | 'type' | 'cat' | 'dog' | null

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

const headlines = ref([
  {
    title:
      'Glamorous dog owner gifted $35k to "say goodbye" to pet that bit her announces she\'s actually KEEPING him',
    summary:
      'A dog owner surprised everyone when she decided to keep her dog despite a biting incident.',
    link: 'https://www.dailymail.co.uk/news/article-14644101/glamorous-dog-owner-shayna-crimo-pet-bit-keeping.html',
    imgSrc:
      'https://th.bing.com/th?id=OVFT.Q-NQH9dLgneJh9HPsKQqby&pid=News&w=300&h=186&c=14&rs=2&qlt=90&dpr=1.3',
  },
  {
    title: '260 Clever Boy Dog Names',
    summary: 'The ultimate list of dog names for your boy dog.',
    link: 'https://www.dailypaws.com/dogs-puppies/dog-names/boy-dog-names',
    imgSrc:
      'https://th.bing.com/th/id/ODL.eb53ed4a16b30b7e24b8c753d355e524?w=197&h=112&c=7&rs=1&qlt=80&r=0&o=6&dpr=1.3&pid=RichNav',
  },
  {
    title: 'Absolutely Gigantic Maine Coon Cat Must Be Seen To Be Believed',
    summary: 'This Maine Coon cat is massive and simply amazing.',
    link: 'https://pethelpful.com/pet-news/maine-coon-big-as-child',
    imgSrc:
      'https://th.bing.com/th/id/ODL.9163eedf3df4aa08bcd1550685b995c1?w=197&h=112&c=7&rs=1&qlt=80&r=0&o=6&dpr=1.3&pid=RichNav',
  },
  {
    title: 'Pet Health - Fox News',
    summary: 'Stay updated on the latest pet health news.',
    link: 'https://www.foxnews.com/category/health/healthy-living/pet-health?msockid=0b80acf68d61624d2560b81f8cfc6339',
    imgSrc:
      'https://th.bing.com/th/id/OIP.L9UfDQ4n2gjwgQC4rQS74wAAAA?w=80&h=80&c=1&vt=10&bgcl=0ad481&r=0&o=6&dpr=1.3&pid=ImgRC',
  },
  {
    title: '142 of the Cutest Food Names for Dogs Who Love to Snack',
    summary: 'A fun list of food-inspired names for your furry friend.',
    link: 'https://www.dailypaws.com/dogs-puppies/dog-names/food-names-for-dogs',
    imgSrc:
      'https://th.bing.com/th/id/ODL.ff1fcd9a9268ae035260e3a16747d5ee?w=197&h=112&c=7&rs=1&qlt=80&r=0&o=6&dpr=1.3&pid=RichNav',
  },
  {
    title: 'PET NEWS - PET HELP',
    summary: 'All the latest news and updates for pet lovers.',
    link: 'https://pethelpful.com/pet-news',
    imgSrc:
      'https://th.bing.com/th/id/OIP.2mGFoXG3U2uR75QaSNPQ6AHaHa?w=80&h=80&c=1&vt=10&bgcl=346cfe&r=0&o=6&dpr=1.3&pid=ImgRC',
  },
])

const goToLink = (url) => window.open(url, '_blank')

setInterval(() => {
  currentTime.value = new Date().toLocaleString()
}, 1000)
</script>

<template>
  <v-app>
    <!-- App bar with sidebar toggle -->
    <v-app-bar app color="var(--navbar-bg)">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="custom-title">TailCare Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!-- Sidebar with toggle -->
      <v-navigation-drawer
        v-model="drawer"
        app
        permanent
        width="250"
        :style="{ backgroundColor: 'var(--navbar-bg)' }"
      >
        <v-container class="text-center mt-4">
          <img :src="imgWel" alt="Welcome Icon" style="height: 100px; width: auto" />
          <h1 class="text-h5 font-weight-bold custom-title">Welcome Owner</h1>
        </v-container>

        <v-list dense>
          <v-list-item to="/layout" component="RouterLink" class="menu-item">
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

      <v-container fluid style="max-height: calc(100vh - 80px); overflow-y: auto">
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

        <v-card
          max-width="800"
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
</style>
