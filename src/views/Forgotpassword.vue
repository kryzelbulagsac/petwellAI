<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { requiredValidator, emailValidator } from '@/utils/validators'
import { supabase, formActionDefault } from '@/utils/supabase.js'

// Assets
import imgWel from '@/assets/images/welcome.png'

// Router
const router = useRouter()

// Form
const refVForm = ref()
const formDataDefault = { email: '' }
const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })
const showRedirectMessage = ref(false) // 👈 redirect animation

// Submit logic
const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(formData.value.email, {
      redirectTo: `${window.location.origin}/resetpassword`,
    })

    if (error) {
      if (error.message.includes('invalid') || error.message.includes('not found')) {
        formAction.value.formErrorMessage = '❌ Unsuccessfully sent! Invalid email.'
      } else {
        formAction.value.formErrorMessage = `❌ Unsuccessfully sent! ${error.message}`
      }
      formAction.value.formStatus = error.status
    } else {
      formAction.value.formSuccessMessage = 'Successfully sent! Please check your email.'
      refVForm.value?.reset()
      formData.value = { ...formDataDefault }

      // ⏳ Show redirecting message after success
      setTimeout(() => {
        showRedirectMessage.value = true
        setTimeout(() => {
          router.push('/login')
        }, 5000)
      }, 1000)
    }
  } catch (err) {
    console.error(err)
    formAction.value.formErrorMessage = '❌ Unexpected error occurred.'
  } finally {
    formAction.value.formProcess = false
  }
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}

// 👈 Back to login
const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <v-responsive>
    <v-app>
      <!-- Main Content -->
      <v-main>
        <v-container class="d-flex justify-center align-center" style="min-height: 90vh">
          <v-col cols="12" md="6" lg="4">
            <v-card class="glass-card pa-6 text-center">
              <!-- Logo inside the card -->
              <div class="logo-container mb-1">
                <img :src="imgWel" alt="TailCare Logo" class="logo-img" />
              </div>

              <h3 class="mb-2" style="color: #8c52ff"><b>Forgot Password?</b></h3>
              <p class="small-text mb-4">
                No worries! Enter your registered email and we’ll send you a secure link to reset
                your password.
              </p>

              <v-form ref="refVForm" @submit.prevent="onFormSubmit">
                <v-text-field
                  v-model="formData.email"
                  label="Enter your email address"
                  type="email"
                  variant="solo-inverted"
                  prepend-inner-icon="mdi-email"
                  :rules="[requiredValidator, emailValidator]"
                />
                <v-btn class="button mt-4" type="submit" block :loading="formAction.formProcess">
                  Send Reset Link
                </v-btn>
              </v-form>

              <!-- Success Message -->
              <p v-if="formAction.formSuccessMessage" class="success-text mt-4">
                {{ formAction.formSuccessMessage }}
              </p>

              <!-- Error Message -->
              <p v-if="formAction.formErrorMessage" class="error-text mt-4">
                {{ formAction.formErrorMessage }}
              </p>

              <!-- Redirect Message with 3-dot animation -->
              <div v-if="showRedirectMessage" class="redirect-message animate-in mt-3">
                Redirecting to login<span class="dots">...</span>
              </div>

              <!-- 👇 Back to Login (only show if no success yet) -->
              <div v-if="!formAction.formSuccessMessage" class="back-link mt-4" @click="goToLogin">
                ← Back to Login
              </div>
            </v-card>
          </v-col>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped>
/* 🔥 Logo styling inside card */
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo-img {
  height: 150px; /* 👈 make it bigger */
  max-height: 150px;
  object-fit: contain;
}

.top-logo-bar {
  background: transparent; /* Let background animation show through */
  color: #4a0a5b;
  box-shadow: none;
}

/* 🔥 Full-page animated background */
.v-application {
  background: linear-gradient(135deg, #f5d5e0, #bb9ac9);
  animation: fadeBg 6s ease-in-out infinite alternate;
}

@keyframes fadeBg {
  0% {
    background: linear-gradient(135deg, #f5d5e0, #bb9ac9);
  }
  100% {
    background: linear-gradient(135deg, #d9b6e3, #f5d5e0);
  }
}

.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(14px);
  border-radius: 25px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease-in-out;
}
.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
}

.small-text {
  font-size: 0.9rem;
  color: #6c2d7e;
}

.success-text {
  color: #8c52ff; /* 👈 Theme color instead of green */
  font-weight: bold;
  font-family: 'Baloo 2', cursive;
  margin-bottom: 0.5rem;
  animation: bounce 2s ease-in-out infinite;
}

.error-text {
  color: red;
  font-weight: bold;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/*forgot button*/
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

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Redirect message */
.redirect-message {
  font-weight: bold;
  color: #6c2d7e;
  font-size: 1rem;
  margin-top: 10px;
}

/* Fade-in + scale animation */
.animate-in {
  animation: fadeScale 0.6s ease forwards;
}

@keyframes fadeScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 3-dot loading animation */
.dots::after {
  content: '';
  display: inline-block;
  width: 1em;
  text-align: left;
  animation: dots 1.5s steps(3, end) infinite;
}

@keyframes dots {
  0% {
    content: '';
  }
  33% {
    content: '.';
  }
  66% {
    content: '..';
  }
  100% {
    content: '...';
  }
}

/* Back to login as link */
.back-link {
  color: #6a1b9a;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: color 0.3s;
  text-decoration: none;
}
.back-link:hover {
  color: #4a0a5b;
  text-decoration: underline;
}
</style>
