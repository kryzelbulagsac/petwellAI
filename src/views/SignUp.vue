<script setup>
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'

import { ref } from 'vue'
import AlertNotification from '../../common/AlertNotification.vue'
import { supabase, formActionDefault } from '@/utils/supabase.js'
import imgSix from '@/assets/images/six.png'
import imgWel from '@/assets/images/welcome.png'
import { useRouter } from 'vue-router'

// Reactive form state
const router = useRouter()

const formDataDefault = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })
const refVForm = ref()

// Submit logic
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const onSubmit = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
    options: {
      data: {
        username: formData.value.username,
      },
    },
  })

  if (error) {
    console.log(error)
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    console.log(data)
    formAction.value.formSuccessMessage = 'Successfully Registered Account!'
    router.replace('/doggo')
    refVForm.value?.reset()
  }

  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
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
        <v-container>
          <v-row class="align-center">
             <!-- Image Section -->
            <v-col cols="12" md="4" class="signup-picture pa-6 d-flex justify-center mt-6 mt-md-0">
              <img
                :src="imgSix"
                alt="Pets"
                style="width: 80%; max-width: 500px; height: auto" 
              />
            </v-col>
            <!-- Registration Form -->
            <v-col cols="12" md="8" class="mt-8 mb-5">
              <v-card class="register pa-4">
                <h1 style="color: #8c52ff" class="d-flex justify-center"><b>REGISTER NOW!</b></h1>

                <AlertNotification
                  :form-success-message="formAction.formSuccessMessage"
                  :form-error-message="formAction.formErrorMessage"
                />

                <v-form class="mt-5" ref="refVForm" @submit.prevent="onFormSubmit">
                  <v-text-field
                    v-model="formData.username"
                    variant="solo-inverted"
                    label="Username"
                    prepend-inner-icon="mdi-account"
                    type="text"
                    :rules="[requiredValidator]"
                  />
                  <v-text-field
                    v-model="formData.email"
                    variant="solo-inverted"
                    label="Email address"
                    prepend-inner-icon="mdi-email"
                    type="email"
                    :rules="[requiredValidator, emailValidator]"
                  />
                  <v-text-field
                    v-model="formData.password"
                    :type="showPassword ? 'text' : 'password'"
                    variant="solo-inverted"
                    label="Create Password"
                    prepend-inner-icon="mdi-lock"
                    :rules="[requiredValidator, passwordValidator]"
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

                  <!--  Modified Confirm Password -->
                  <v-text-field
                    v-model="formData.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    variant="solo-inverted"
                    label="Confirm Password"
                    prepend-inner-icon="mdi-lock-check"
                    :rules="[
                      requiredValidator,
                      confirmedValidator(formData.confirmPassword, formData.password),
                    ]"
                  >
                    <template #append-inner>
                      <v-fade-transition>
                        <v-icon
                          :key="showConfirmPassword"
                          class="mr-2"
                          @click="showConfirmPassword = !showConfirmPassword"
                          style="cursor: pointer"
                        >
                          {{ showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye' }}
                        </v-icon>
                      </v-fade-transition>
                    </template>
                  </v-text-field>

                  <v-btn
                    class="button mt-4"
                    type="submit"
                    block
                    :disabled="formAction.formProcess"
                    :loading="formAction.formProcess"
                  >
                    Sign Up
                  </v-btn>
                </v-form>

                <div class="text-center mt-3">
                  <span>Already have an account?</span>
                  <RouterLink to="/login" style="color: skyblue"> Log In</RouterLink>
                </div>
              </v-card>
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

.signup-picture {
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

.signup-picture img {
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

/*register-text*/
.register h1 {
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


/*signup button*/
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
