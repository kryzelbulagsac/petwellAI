<script setup>
import { useRouter } from 'vue-router'
import imgWel from '@/assets/images/welcome.png'

const router = useRouter()
const goToLogin = () => router.push('/login')
const goToSignUp = () => router.push('/signup')
</script>

<template>
  <div class="welcome-container">
    <img :src="imgWel" alt="TailCare Logo" class="welcome-image" />
    <div class="welcome-text">
      <h1>Welcome to PetWellAI!</h1>
      <p>Your pet’s health companion.</p>

      <div class="buttons">
        <button @click="goToLogin">Login</button>
        <button @click="goToSignUp">Sign Up</button>
      </div>

      <div class="social-links">
        <a href="https://facebook.com" target="_blank">
          <img src="@/assets/images/fb.png" alt="Facebook" />
        </a>
        <a href="https://instagram.com" target="_blank">
          <img src="@/assets/images/insta.png" alt="Instagram" />
        </a>
        <a href="mailto:tailcare2025@gmail.com">
          <img src="@/assets/images/email.png" alt="Email" />
        </a>
      </div>

      <p class="contact-text">Contact Us</p>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700&display=swap');

/* Ensure full height background on all devices */
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* Main container */
.welcome-container {
  display: flex;
  flex-direction: column; /* always vertical */
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  text-align: center;
  background: linear-gradient(135deg, #f5d5e0, #bb9ac9);
  color: #4a0a5b;
  padding: 2rem;
  box-sizing: border-box;
  gap: 1rem;
}

/* Welcome Image */
.welcome-image {
  max-width: 300px;
  width: 80%;
  margin-bottom: 1rem;
  border-radius: 12px;
  object-fit: contain;
  transition: transform 0.3s ease;
}
.welcome-image:hover {
  transform: scale(1.05);
}

/* Welcome text */
.welcome-text h1 {
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
.welcome-text p {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

/* Buttons */
.buttons {
  display: flex;
  flex-direction: column; /* stacked for all screens */
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;
}
button {
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: white;
  color: #8c52ff;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  transition:
    background 0.3s,
    transform 0.2s;
  width: 160px;
}
button:hover {
  background-color: #8c52ff;
  color: white;
  transform: scale(1.05);
}

/* Social links */
.social-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 0.5rem;
}
.social-links img {
  width: 36px;
  height: 36px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  cursor: pointer;
}
.social-links img:hover {
  transform: scale(1.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

/* Contact text */
.contact-text {
  font-weight: bold;
  color: #4a0a5b;
  font-size: 1rem;
  cursor: pointer;
}
.contact-text:hover {
  transform: scale(1.05);
  color: #8c52ff;
}

/* Large screen adjustments for scaling */
@media (min-width: 768px) {
  .welcome-image {
    max-width: 350px;
  }

  .welcome-text h1 {
    font-size: 2.5rem;
  }

  .welcome-text p {
    font-size: 1.2rem;
  }

  button {
    width: 180px;
  }
}
</style>
