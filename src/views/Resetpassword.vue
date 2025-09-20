<script setup>
import { ref } from 'vue'
import { supabase, formActionDefault } from '@/utils/supabase.js'
import welcomeImg from '@/assets/images/welcome.png'

// Form state
const formDataDefault = { password: '', confirmPassword: '' }
const formData = ref({ ...formDataDefault })
const formAction = ref({ ...formActionDefault })

// Toggle password visibility
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  // Check if new password is empty
  if (!formData.value.password) {
    formAction.value.formErrorMessage = 'Please enter a new password!'
    formAction.value.formProcess = false
    return
  }

  // Check if passwords match
  if (formData.value.password !== formData.value.confirmPassword) {
    formAction.value.formErrorMessage = 'Passwords do not match.'
    formAction.value.formProcess = false
    return
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password: formData.value.password,
    })

    if (error) {
      formAction.value.formErrorMessage = error.message
      formAction.value.formStatus = error.status
    } else {
      formAction.value.formSuccessMessage = 'Your password has been updated successfully!'
      formData.value = { ...formDataDefault }
    }
  } catch (err) {
    console.error(err)
    formAction.value.formErrorMessage = 'Unexpected error occurred.'
  } finally {
    formAction.value.formProcess = false
  }
}
</script>

<template>
  <v-responsive>
    <v-app>
      <v-main>
        <!-- Animated Background -->
        <div class="reset-bg d-flex justify-center align-center">
          <v-container>
            <v-col cols="12" md="6" lg="4" class="mx-auto">
              <v-card class="glass-card pa-6 text-center">
                
                <!-- Logo -->
                <v-img
                  :src="welcomeImg"
                  alt="Welcome Logo"
                  contain
                  max-height="150"
                  class="mb-1"
                />

                <h3 class="mb-2 theme-color"><b>Reset Password</b></h3>
                <p class="small-text mb-4">Enter your new password below.</p>

                <v-form @submit.prevent="onSubmit">
                  <!-- New Password -->
                  <v-text-field
                    v-model="formData.password"
                    label="New Password"
                    :type="showPassword ? 'text' : 'password'"
                    variant="solo-inverted"
                    prepend-inner-icon="mdi-lock"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPassword = !showPassword"
                    required
                  />

                  <!-- Confirm Password -->
                  <v-text-field
                    v-model="formData.confirmPassword"
                    label="Confirm Password"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    variant="solo-inverted"
                    prepend-inner-icon="mdi-lock-check"
                    :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showConfirmPassword = !showConfirmPassword"
                    required
                  />

                  <v-btn
                    class="button mt-4"
                    type="submit"
                    block
                    :loading="formAction.formProcess"
                  >
                    Update Password
                  </v-btn>
                </v-form>

                <!-- Messages -->
                <p v-if="formAction.formSuccessMessage" class="mt-3 success-text">
                  {{ formAction.formSuccessMessage }}
                </p>
                <p v-if="formAction.formErrorMessage" class="mt-3 error-color">
                  {{ formAction.formErrorMessage }}
                </p>
              </v-card>
            </v-col>
          </v-container>
        </div>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped>
/* Animated Background */
.reset-bg {
  min-height: 100vh;
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
.theme-color {
  color: #8c52ff; /* Theme color */
  font-weight: 600;
}
.success-text {
  color: #8c52ff;
  font-weight: 300;
  animation: bounce 2s ease-in-out infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.error-color {
  color: #e63946;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: linear-gradient(135deg, #f5d5e0, #bb9ac9);
  color: #4a0a5b;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
  width: 160px;
}
button:hover {
  background-color: #8c52ff;
  color: white;
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(140, 82, 255, 0.3);
}
</style>
