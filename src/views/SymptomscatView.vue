<script setup>
import { ref, watch, watchEffect, computed } from 'vue'
import imgWel from '@/assets/images/welcome.png'
import imgCatt from '@/assets/images/catt.gif'
import { supabase, formActionDefault } from '@/utils/supabase'
import { useRouter } from 'vue-router'

// Sidebar toggle
const drawer = ref(true)
const router = useRouter()
// Theme setup
const theme = ref('light')
const consultOpen = ref(false)
const typeOpen = ref(false)
const currentTime = ref(new Date().toLocaleString())
const formAction = ref({ ...formActionDefault })

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

const themes = {
  light: { '--second-column-bg': '#f5d5e0' },
  dark: { '--second-column-bg': '#210635' },
  custom: { '--second-column-bg': '#42od4b' },
}

const activeMenu = ref(null) // 'consult' | 'type' | 'cat' | 'dog' | null

const setMenu = (menu) => {
  activeMenu.value = activeMenu.value === menu ? null : menu
}

function changeTheme() {
  theme.value = theme.value === 'light' ? 'dark' : theme.value === 'dark' ? 'custom' : 'light'
}

watchEffect(() => {
  const selectedTheme = themes[theme.value]
  Object.keys(selectedTheme).forEach((key) => {
    document.documentElement.style.setProperty(key, selectedTheme[key])
  })
})

function signOut() {
  alert('Signed out!')
}

function toggleConsult() {
  consultOpen.value = !consultOpen.value
}

function toggleType() {
  typeOpen.value = !typeOpen.value
}

function updateTime() {
  setInterval(() => {
    currentTime.value = new Date().toLocaleString()
  }, 1000)
}
updateTime()

// Reactive states
const ex4 = ref([])
const possibleIllnesses = ref([])
const healthTips = ref([])

const symptoms = [
  'Lethargy',
  'Loss of appetite (anorexia)',
  'Vomiting',
  'Diarrhea',
  'Sneezing',
  'Coughing',
  'Nasal/eye discharge',
  'Fever',
  'Dehydration',
  'Weight loss',
  'Labored breathing',
  'Pale or yellow gums',
  'Excessive drooling',
  'Abdominal pain',
  'Hiding behavior',
  'Changes in urination',
]

const symptomIllnessMap = {
  Lethargy: ['Anemia', 'Infection'],
  'Loss of appetite (anorexia)': ['Gastroenteritis', 'Kidney Disease'],
  Vomiting: ['Food Allergy', 'Parvovirus'],
  Diarrhea: ['Food Intolerance', 'Parasites'],
  Sneezing: ['Upper Respiratory Infection'],
  Coughing: ['Kennel Cough'],
  'Nasal/eye discharge': ['Feline Herpesvirus', 'Flu'],
  Fever: ['Infection', 'Viral Illness'],
  Dehydration: ['Diabetes', 'Heat Stroke'],
  'Weight loss': ['Hyperthyroidism', 'Diabetes'],
  'Labored breathing': ['Asthma', 'Heartworm'],
  'Pale or yellow gums': ['Anemia', 'Liver Disease'],
  'Excessive drooling': ['Dental Disease', 'Nausea'],
  'Abdominal pain': ['Pancreatitis', 'Constipation'],
  'Hiding behavior': ['Stress', 'Pain'],
  'Changes in urination': ['UTI', 'Kidney Stones'],
}

const tipsMap = {
  Anemia: 'Ensure a diet rich in iron and consult your vet for supplements.',
  Infection: 'Keep your cat hydrated and follow prescribed antibiotics.',
  Gastroenteritis: 'Provide bland food and ensure constant hydration.',
  'Kidney Disease': 'Feed a low-protein diet and schedule regular vet checkups.',
  'Food Allergy': 'Switch to hypoallergenic food and avoid common allergens.',
  Parvovirus: 'Immediate vet care is crucial; keep the environment sanitized.',
  'Food Intolerance': 'Avoid dairy and certain proteins; monitor diet closely.',
  Parasites: 'Use regular dewormers and keep living areas clean.',
  'Upper Respiratory Infection': 'Use a humidifier and ensure the cat rests.',
  'Kennel Cough': 'Isolate the cat and avoid exposure to infected animals.',
  'Feline Herpesvirus': 'Reduce stress and use vet-recommended antiviral meds.',
  Flu: 'Provide fluids, warmth, and rest.',
  Diabetes: 'Use insulin therapy and provide a high-protein, low-carb diet.',
  'Heat Stroke': 'Cool your cat gradually and offer plenty of water.',
  Hyperthyroidism: 'Feed a special diet and administer vet-prescribed meds.',
  Asthma: 'Avoid dust, smoke, and scented products.',
  Heartworm: 'Preventive medication is key; consult your vet immediately.',
  'Liver Disease': 'Feed a liver-support diet and avoid toxins.',
  'Dental Disease': 'Brush your cat’s teeth and offer dental treats.',
  Nausea: 'Feed small, frequent meals and avoid fatty foods.',
  Pancreatitis: 'Provide a low-fat, easy-to-digest diet.',
  Constipation: 'Ensure hydration and add fiber to the diet.',
  Stress: 'Provide enrichment, hiding spots, and reduce changes in routine.',
  Pain: 'Observe for limping or hiding and consult a vet for pain relief.',
  UTI: 'Feed wet food and provide clean water regularly.',
  'Kidney Stones': 'Feed special urinary diet and encourage fluid intake.',
}

const vetClinics = [
  {
    name: 'Butuan Veterinary Clinic',
    address: 'XG2M+CRG, Ochoa Ave, Butuan City, 8600 Agusan Del Norte',
    mapLink: 'https://maps.app.goo.gl/BFn231uP8UQY9RnCA',
    phone: '(085) 817 1801',
    email: 'mailto:butuanvet@yahoo.com',
    fbLink: 'https://web.facebook.com/p/Butuan-Veterinary-Clinic-100063916213857/?_rdc=1&_rdr#',
  },
  {
    name: 'Petmatters Animal Clinic',
    address: 'C.T. Montalban Street, Butuan City, Agusan Del Norte (Grand Palace Hotel)',
    mapLink: 'https://maps.app.goo.gl/WHjk8L8cCSvz5smk8',
    phone: '(085) 300 2502',
    email: 'mailto:helpdesk@pmacph.com',
    fbLink: 'https://web.facebook.com/PetMattersAnimalClinic/?_rdc=1&_rdr#',
  },
  {
    name: 'Pawprints Dog and Cat Clinic Ampayon',
    address: 'Purok 6 National highway Ampayon, Butuan City, 8600 Agusan Del Norte',
    mapLink: 'https://maps.app.goo.gl/hEqyy3b5iv8nTFbHA',
    phone: '(085) 300 1952',
    email: '',
    fbLink: 'https://web.facebook.com/pawprintsdogandcat/?_rdc=1&_rdr#',
  },
  {
    name: 'Caraga Pet Doctors Animal Hospital',
    address: 'ADN Provincial Hospital Road, P-2, Libertad, Butuan City',
    mapLink: 'https://maps.app.goo.gl/n8XWTPP2oYT8q7RT8',
    phone: '0951 630 0026',
    email: '',
    fbLink: 'https://web.facebook.com/profile.php?id=100092186196825&mibextid=avESrC&_rdc=1&_rdr#',
  },
  {
    name: "LITTLE NOAH'S ARK Veterinary Clinic",
    address: 'WGJQ+7QX, Montilla Blvd., Butuan City, Agusan Del Norte',
    mapLink: 'https://maps.app.goo.gl/dstwCL282hrnvjkXA',
    phone: '0999 908 4753',
    email: '',
    fbLink:
      'https://web.facebook.com/p/Little-Noahs-Ark-Veterinary-Clinic-100069749785645/?_rdc=1&_rdr#',
  },
  {
    name: 'Dok Hayop',
    address: 'Libertad National Highway, Butuan City, Philippines',
    mapLink: 'https://maps.app.goo.gl/uh3dsS9WvxQvG13D9',
    phone: '0929 234 1752',
    email: '',
    fbLink: 'https://web.facebook.com/DokHayop/?locale=tl_PH&_rdc=1&_rdr#',
  },
]

// Populate possible illnesses based on selected symptoms
watch(ex4, () => {
  const illnesses = new Set()
  ex4.value.forEach((symptom) => {
    const matched = symptomIllnessMap[symptom]
    if (matched) {
      matched.forEach((illness) => illnesses.add(illness))
    }
  })
  possibleIllnesses.value = Array.from(illnesses)
})

// Populate health tips based on illnesses
watch(possibleIllnesses, () => {
  const tips = new Set()
  possibleIllnesses.value.forEach((illness) => {
    const tip = tipsMap[illness]
    if (tip) tips.add(tip)
  })
  healthTips.value = Array.from(tips)
})

// Show Tips + Vet Clinics Section only when both are non-empty
const showTipsSection = computed(() => {
  return possibleIllnesses.value.length > 0 && healthTips.value.length > 0
})
</script>

<template v-if="showTipsSection">
  <v-app>
    <v-main>
      <!-- Sidebar -->
      <v-navigation-drawer v-model="drawer" app permanent width="250">
        <v-container class="text-center mt-4">
          <img :src="imgWel" alt="Welcome Icon" style="height: 100px; width: auto" />
          <h1 class="text-h5 font-weight-bold custom-title">Welcome Owner</h1>
        </v-container>

        <v-list dense>
          <v-list-item to="/layout" component="RouterLink" class="menu-item">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>

          <v-list-item to="/doggo" component="RouterLink" class="menu-item">
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>

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

      <!-- Toggle Button -->
      <v-btn icon @click="drawer = !drawer" class="ma-2">
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <!-- Main Section -->
      <v-container fluid style="max-height: calc(100vh - 80px); overflow-y: auto">
        <v-row>
          <v-col cols="12" class="second-column-background">
            <v-row>
              <v-col cols="12" md="5">
                <v-card class="pa-6" style="height: 500px; overflow-y: auto">
                  <v-row>
                    <v-col cols="12" v-for="(symptom, i) in symptoms" :key="i">
                      <v-checkbox v-model="ex4" :label="symptom" :value="symptom" color="warning" />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>

              <v-col cols="12" md="7" class="d-flex justify-center align-center">
                <img :src="imgCatt" alt="Cat Gif" style="height: 500px; width: auto" />
              </v-col>
            </v-row>

            <!-- Illnesses -->
            <v-row v-if="possibleIllnesses.length" class="mt-6 d-flex justify-center">
              <v-col cols="12" md="8">
                <v-card class="symptom-card">
                  <v-card-title class="symptom-title">Possible Illnesses</v-card-title>
                  <v-card-text>
                    <v-chip
                      v-for="(illness, index) in possibleIllnesses"
                      :key="index"
                      color="pink lighten-4"
                      class="ma-2"
                      label
                    >
                      {{ illness }}
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Health Tips -->
            <v-row v-if="healthTips.length" class="mt-4 d-flex justify-center">
              <v-col cols="12" md="8">
                <v-card class="symptom-card">
                  <v-card-title class="symptom-title">Health Tips for Your Cat</v-card-title>
                  <v-card-text>
                    <ul>
                      <li
                        v-for="(tip, index) in healthTips"
                        :key="index"
                        class="symptom-suggestion"
                      >
                        {{ tip }}
                      </li>
                    </ul>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Vet Clinics Recommendation -->
            <v-row class="mt-4 d-flex justify-center" v-if="ex4.length > 0">
              <v-col cols="12" md="8">
                <v-card class="symptom-card">
                  <v-card-title class="symptom-title">Nearby Veterinarian Clinics</v-card-title>
                  <v-card-text>
                    <v-carousel cycle hide-delimiter-background show-arrows height="320">
                      <v-carousel-item v-for="(clinic, index) in vetClinics" :key="index">
                        <v-card class="pa-4 text-center">
                          <v-avatar size="80" class="mx-auto mb-3">
                            <v-icon size="60" color="deep-purple">mdi-hospital</v-icon>
                          </v-avatar>
                          <h3 class="text-h6 font-weight-bold">{{ clinic.name }}</h3>
                          <p>{{ clinic.address }}</p>
                          <p><a :href="clinic.mapLink" target="_blank">📍 Google Maps</a></p>
                          <p>📞 {{ clinic.phone }}</p>
                          <p><a :href="clinic.fbLink" target="_blank">🌐 Facebook Page</a></p>
                          <p v-if="clinic.email">
                            <a :href="clinic.email" target="_blank">✉️ Email</a>
                          </p>
                        </v-card>
                      </v-carousel-item>
                    </v-carousel>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
:root {
  --second-column-bg: #f5d5e0;
}

[data-theme='dark'] {
  --second-column-bg: #210635;
}

[data-theme='custom'] {
  --second-column-bg: #42od4b;
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

body {
  font-family: 'Roboto', sans-serif;
}

.date-time-card {
  background-color: #d391b0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 180px;
  margin-top: 16px;
}

.date-time-card .text-h6,
.date-time-card .v-card-subtitle {
  color: #5d3c64;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 18px;
}

.second-column-background {
  background-color: var(--second-column-bg);
}

.symptom-card {
  border-radius: 12px;
  padding: 24px;
  background-color: #fff9fc;
  border: 1px solid #f0d7e9;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

.symptom-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.symptom-title {
  font-family: 'Lora', serif;
  font-size: 20px;
  font-weight: 700;
  color: #7b466a;
}

.symptom-description {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: #595959;
  line-height: 1.5;
}

.symptom-suggestion-title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
  color: #5d3c64;
}

.symptom-suggestion {
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  color: #4e4e4e;
  line-height: 1.5;
}

.v-carousel-item .v-card {
  background-color: #fff9fc;
  border: 1px solid #f0d7e9;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
  padding: 16px; /* reduce padding */
  max-height: 300px; /* limit height */
  overflow-y: auto; /* scroll if content exceeds */
}

.v-carousel-item h3 {
  color: #7b466a;
  font-family: 'Lora', serif;
  font-size: 18px; /* slightly smaller */
  margin-bottom: 8px;
}

.v-carousel-item p,
.v-carousel-item a {
  font-family: 'Roboto', sans-serif;
  color: #5d3c64;
  font-size: 14px; /* reduce font size */
  margin: 2px 0;
}
</style>

<link
  href="https://fonts.googleapis.com/css2?family=Lora:wght@700&family=Roboto:wght@400&display=swap"
  rel="stylesheet"
/>
