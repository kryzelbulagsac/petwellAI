<script setup>
import { ref, watch, watchEffect, computed } from 'vue'
import imgWel from '@/assets/images/welcome.png'
import imgType from '@/assets/images/type.gif'
import { useRouter } from 'vue-router'
import { supabase, formActionDefault } from '@/utils/supabase'

const router = useRouter()

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

// Theme setup
const formAction = ref({ ...formActionDefault })
const theme = ref('light')
const consultOpen = ref(false)
const typeOpen = ref(false)
const currentTime = ref(new Date().toLocaleString())
// Add this to control sidebar visibility
const drawerOpen = ref(true)

const themes = {
  light: { '--second-column-bg': '#f5d5e0' },
  dark: { '--second-column-bg': '#210635' },
  custom: { '--second-column-bg': '#74b0ff' },
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

const ex4 = ref([]) // Symptoms list selection
const possibleIllnesses = ref([])
const healthTips = ref([])

const symptoms = [
  'Lethargy (low energy)',
  'Loss of appetite',
  'Vomiting',
  'Diarrhea',
  'Coughing',
  'Sneezing',
  'Nasal discharge',
  'Fever',
  'Weight loss',
  'Difficulty breathing',
  'Dehydration',
  'Weakness',
  'Abdominal pain',
  'Excessive drooling',
  'Pale gums',
  'Shivering or trembling',
]

const symptomIllnessMap = {
  'Lethargy (low energy)': ['Infection', 'Arthritis'],
  Vomiting: ['Parvovirus', 'Food Poisoning'],
  Diarrhea: ['Worms', 'Dietary Indiscretion'],
  Coughing: ['Kennel Cough', 'Heart Disease'],
  Sneezing: ['Allergies', 'Upper Respiratory Infection'],
  'Loss of appetite': ['Dental Problems', 'Gastrointestinal Disease'],
  'Weight loss': ['Cancer', 'Parasites'],
  'Difficulty breathing': ['Heartworm', 'Pneumonia'],
  Fever: ['Infection', 'Inflammation'],
  'Nasal discharge': ['Cold', 'Respiratory Infection'],
  Dehydration: ['Heatstroke', 'Kidney Disease'],
  Weakness: ['Anemia', 'Chronic Disease'],
  'Abdominal pain': ['Bloating', 'Pancreatitis'],
  'Excessive drooling': ['Oral Injury', 'Toxin Exposure'],
  'Pale gums': ['Shock', 'Severe Anemia'],
  'Shivering or trembling': ['Pain', 'Anxiety'],
}

const tipsMap = {
  Infection: ['Keep your pet hydrated.', 'Consult a vet for antibiotics.'],
  Arthritis: ['Provide a soft resting place.', 'Consider joint supplements.'],
  Parvovirus: ['Isolate the infected dog.', 'Seek immediate veterinary care.'],
  'Food Poisoning': ['Avoid feeding table scraps.', 'Ensure fresh, clean food and water.'],
  Worms: ['Administer deworming medications regularly.', 'Maintain clean living spaces.'],
  'Dietary Indiscretion': ['Avoid sudden food changes.', 'Do not let your dog scavenge.'],
  'Kennel Cough': ['Avoid dog parks during outbreaks.', 'Use a humidifier.'],
  'Heart Disease': ['Manage weight with diet.', 'Limit strenuous activity.'],
  Allergies: ['Identify and eliminate allergens.', 'Use vet-approved antihistamines.'],
  'Upper Respiratory Infection': ['Keep your dog warm.', 'Ensure proper ventilation.'],
  'Dental Problems': ['Brush teeth regularly.', 'Provide dental chews.'],
  'Gastrointestinal Disease': ['Feed bland diets temporarily.', 'Visit the vet for diagnosis.'],
  Cancer: ['Schedule regular checkups.', 'Ensure balanced nutrition.'],
  Parasites: ['Use flea and tick preventatives.', 'Keep bedding clean.'],
  Heartworm: ['Administer monthly preventatives.', 'Limit mosquito exposure.'],
  Pneumonia: ['Keep your dog warm and dry.', 'Ensure complete vet treatment.'],
  Inflammation: ['Rest and restrict movement.', 'Use anti-inflammatory medication as prescribed.'],
  Cold: ['Keep your dog warm.', 'Limit outdoor time in cold weather.'],
  'Respiratory Infection': ['Avoid smoke exposure.', 'Consult vet for medication.'],
  Heatstroke: ['Provide shade and water.', 'Never leave in hot cars.'],
  'Kidney Disease': ['Feed a kidney-friendly diet.', 'Provide fresh water.'],
  Anemia: ['Add iron-rich foods if vet-approved.', 'Treat underlying cause promptly.'],
  'Chronic Disease': ['Monitor and manage symptoms regularly.', 'Stick to prescribed treatments.'],
  Bloating: ['Prevent overeating.', 'Avoid strenuous activity after meals.'],
  Pancreatitis: ['Feed low-fat diets.', 'Avoid high-fat treats.'],
  'Oral Injury': ['Feed soft foods.', 'Visit the vet for oral examination.'],
  'Toxin Exposure': [
    'Keep harmful substances out of reach.',
    'Call poison control or vet immediately.',
  ],
  Shock: ['Keep warm and calm.', 'Seek emergency vet care.'],
  'Severe Anemia': ['Administer iron supplements as prescribed.', 'Treat root cause.'],
  Pain: ['Avoid physical exertion.', 'Consult vet for pain management.'],
  Anxiety: ['Provide a calm environment.', 'Use calming aids like music or pheromone sprays.'],
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

// Update illnesses based on symptoms
watch(ex4, () => {
  const illnesses = new Set()
  ex4.value.forEach((symptom) => {
    const matched = symptomIllnessMap[symptom]
    if (matched) matched.forEach((illness) => illnesses.add(illness))
  })
  possibleIllnesses.value = Array.from(illnesses)
})

// Update health tips based on illnesses (FIXED)
watch(possibleIllnesses, () => {
  const tips = new Set()
  possibleIllnesses.value.forEach((illness) => {
    const illnessTips = tipsMap[illness]
    if (illnessTips) {
      illnessTips.forEach((tip) => tips.add(tip))
    }
  })
  healthTips.value = Array.from(tips)
})

const showTipsSection = computed(() => {
  return possibleIllnesses.value.length > 0 && healthTips.value.length > 0
})
</script>

<template>
  <v-app>
    <v-main>
      <!-- Sidebar -->
      <v-navigation-drawer v-model="drawerOpen" app permanent width="250">
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

      <!-- Main Section -->

      <!-- Toggle Button -->
      <v-btn icon @click="drawerOpen = !drawerOpen" class="ma-2">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <!-- Main Section with Checkboxes and Image -->

      <v-container fluid style="max-height: calc(100vh - 80px); overflow-y: auto">
        <v-row>
          <v-col cols="12" class="second-column-background">
            <v-row>
              <!-- Symptoms -->

              <!-- Symptoms List -->

              <v-col cols="12" md="5">
                <v-card class="pa-6" style="height: 500px; overflow-y: auto">
                  <v-row>
                    <v-col cols="12" v-for="(symptom, i) in symptoms" :key="i">
                      <v-checkbox v-model="ex4" :label="symptom" :value="symptom" color="warning" />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>

              <!-- Image Section -->
              <v-col cols="12" md="7" class="d-flex justify-center align-center">
                <img :src="imgType" alt="Dog Gif" style="height: 500px; width: auto" />
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

            <!-- Tips -->
            <v-row v-if="healthTips.length" class="mt-4 d-flex justify-center">
              <v-col cols="12" md="8">
                <v-card class="symptom-card">
                  <v-card-title class="symptom-title">Health Tips</v-card-title>
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
