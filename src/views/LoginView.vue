<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { requiredValidator, emailValidator } from '@/utils/validators'
import { formActionDefault, supabase } from '@/utils/supabase'

// Image Assets
import imgFour from '@/assets/images/four.png'
import imgWel from '@/assets/images/welcome.png'

// Components
import AlertNotification from '../../common/AlertNotification.vue'

// Router
const router = useRouter()

// Form Setup
const refVForm = ref()
const showPassword = ref(false)

const formDataDefault = {
  email: '',
  password: '',
}
const formData = ref({ ...formDataDefault })

const formAction = ref({ ...formActionDefault })

const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.value.email,
      password: formData.value.password,
    })

    if (error) {
      formAction.value.formErrorMessage = error.message
      formAction.value.formStatus = error.status
    } else {
      formAction.value.formSuccessMessage = 'Successfully Logged In'
      refVForm.value?.reset()
      router.replace('/doggo')
    }
  } catch (err) {
    formAction.value.formErrorMessage = 'Unexpected error occurred.'
    console.error(err)
  } finally {
    formAction.value.formProcess = false
  }
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  />

  <v-responsive>
    <v-app>
      <!-- Top Logo -->
      <v-app-bar flat height="150" class="top-logo-bar">
        <v-container class="d-flex justify-center align-center fill-height pa-0">
          <img
            :src="imgWel"
            alt="TailCare Logo"
            style="height: 100%; max-height: 130px; object-fit: contain"
          />
        </v-container>
      </v-app-bar>

      <!-- Main Content -->
      <v-main>
        <v-container fluid class="mt-7">
          <v-row no-gutters>
            <!-- Left Image Section -->
            <v-col cols="12" md="4" class="login-picture pa-6 d-flex align-center justify-center">
              <img :src="imgFour" alt="Pets" style="width: 80%; max-width: 500px; height: auto" />
            </v-col>

            <!-- Right Form Section -->
            <v-col cols="12" md="8" class="pa-6">
              <div class="welcome pa-6">
                <h1 class="text-h5 text-center font-weight-bold mb-2" style="color: #8c52ff">
                  WELCOME OWNERS!
                </h1>

                <v-card class="pa-4">
                  <v-form ref="refVForm" @submit.prevent="onFormSubmit">
                    <!-- Email -->
                    <v-text-field
                      v-model="formData.email"
                      label="Email address"
                      type="email"
                      variant="solo-inverted"
                      prepend-inner-icon="mdi-email"
                      :rules="[requiredValidator, emailValidator]"
                    />

                    <!-- Password -->
                    <v-text-field
                      v-model="formData.password"
                      :type="showPassword ? 'text' : 'password'"
                      variant="solo-inverted"
                      label="Password"
                      prepend-inner-icon="mdi-lock"
                      :rules="[requiredValidator]"
                    >
                      <template #append-inner>
                        <v-fade-transition>
                          <v-icon
                            :key="showPassword"
                            class="mr-2"
                            @click="showPassword = !showPassword"
                            style="cursor: pointer"
                          >
                            {{ showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
                          </v-icon>
                        </v-fade-transition>
                      </template>
                    </v-text-field>

                    <!-- Submit Button -->
                    <v-btn
                      class="button mt-4"
                      type="submit"
                      block
                      :loading="formAction.formProcess"
                    >
                      Log in
                    </v-btn>
                  </v-form>

                  <!-- Forgot Password -->
                  <div class="text-center mt-4">
                    <RouterLink to="/" style="color: skyblue"> Forgot your password? </RouterLink>
                  </div>

                  <div class="text-center mt-2">
                    <span>Don't have an account?</span>
                    <RouterLink to="/signup" style="color: skyblue"> Sign Up</RouterLink>
                  </div>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped>

.top-logo-bar {
  background: linear-gradient(135deg, #f5d5e0, #bb9ac9);
  color: #4a0a5b;
}

.login-picture {
  display: flex;
  flex-direction: column; /* always vertical */
  align-items: center;
  justify-content: center;
  min-height: 30vh;
  width: 100%;
  text-align: center;
  background: linear-gradient(135deg, #f5d5e0, #bb9ac9);
  color: #4a0a5b;
  padding: 2rem;
  box-sizing: border-box;
  gap: 1rem;
  animation: fadeBg 6s ease-in-out infinite alternate;
}

/* Subtle animated gradient for soul effect */
@keyframes fadeBg {
  0% {
    background: linear-gradient(135deg, #f5d5e0, #bb9ac9);
  }
  100% {
    background: linear-gradient(135deg, #d9b6e3, #f5d5e0);
  }
}

/*welcome-text*/
.welcome h1 {
  font-family: 'Baloo 2', cursive;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/*login button*/
button {
  padding: 0.75rem 1.5rem;
  border: none;
   background: linear-gradient(135deg, #f5d5e0, #bb9ac9);
  color: #4a0a5b;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition:
    background 0.3s,
    transform 0.2s,
    box-shadow 0.3s;
  width: 160px;
}
button:hover {
  background-color: #8c52ff;
  color: white;
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(140, 82, 255, 0.3);
}

/* Smooth fade-in for main section */
.v-main {
  animation: fadeIn 1.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Floating pets image */
.login-picture img {
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* Card hover soul effect */
.v-card {
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(140, 82, 255, 0.15);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.v-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 30px rgba(140, 82, 255, 0.25);
}

/* Input fields focus glow */
.v-text-field input:focus {
  border-bottom: 2px solid #8c52ff !important;
  transition: border 0.3s ease;
  box-shadow: 0 0 8px rgba(140, 82, 255, 0.3);
}

/* Links hover pulse */
a {
  transition:
    color 0.3s ease,
    transform 0.2s ease;
}
a:hover {
  color: #8c52ff !important;
  transform: scale(1.05);
}

.text-center p {
  margin-bottom: 10px;
}
</style>
