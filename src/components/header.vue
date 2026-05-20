<template>
  <header class="header">
    <div class="header-top">
      <div class="logo-and-auth-container">
        <div class="auth-buttons-top">
          <router-link to="/log" class="auth-button-top" v-if="!hasCurrentUser">Войти</router-link>
          <router-link to="/reg" class="auth-button-top" v-if="!hasCurrentUser">Регистрация</router-link>

          <router-link to="/cart" class="auth-button-top cart-button">
            <img src="../assets/image/icon_01.png" alt="Корзина" class="cart-icon" />
          </router-link>
          <router-link to="/profile" class="auth-button-top cart-button profile-icon" v-if="hasCurrentUser">
            <img src="../assets/image/icon_00.png" alt="Профиль" class="cart-icon" />
          </router-link>
        </div>
        <div class="logo">
          <img src="../assets/image/logo_00.png" alt="Логотип" />
        </div>
      </div>
    </div>
    <div class="header-bottom">
      <nav>
        <router-link to="/">Главная</router-link>
        <router-link to="/catalog">Каталог</router-link>
        <router-link to="/aboutUs">О нас</router-link>
        <router-link to="/delivery">Доставка</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const hasCurrentUser = ref(false);
const route = useRoute();

function checkUserStatus() {
  hasCurrentUser.value = !!localStorage.getItem('currentUser');
}

onMounted(checkUserStatus);
watch(route, checkUserStatus, { immediate: true });
</script>

<style scoped>
.header {
  background-color: #fcf1f1;
  width: 100%;
  font-weight: bold;
  color: #4a2c2a;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: #fcf1f1;
}


.logo-and-auth-container {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  width: 100%; 
}

.logo {
  flex: 1;
  text-align: center;
  padding: 15px 0; 
}

.logo img {
  max-width: 250px;
  height: auto;
}

.auth-buttons-top {
  display: flex;
  gap: 10px;
  padding-bottom: 10px; 
  justify-content: center; 
  width: 100%; 
}

.auth-button-top {
  padding: 8px 15px;
  border: none;
  border-radius: 5px; 
  background-color: transparent;
  color: #4a2c2a;
  font-size: 14px; 
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  display: flex; 
  align-items: center;
  justify-content: center; 
}

.auth-button-top:hover {
  background-color: #8a4b4b;
  color: #fff;
  border-color: #8a4b4b;
}


.auth-button-top.router-link-exact-active {
  background-color: #a85c5c;
  color: #fff;
  border-color: #a85c5c;
}

.cart-button {
  padding: 8px; 
  width: 40px; 
  height: 40px; 
  border-radius: 8px; 
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box; 
}

.cart-button:hover {
  background-color: #8a4b4b; 
}

.cart-icon {
  width: 24px; 
  height: 24px; 
  display: block; 
  transition: filter 0.3s ease; 
}

.cart-button:hover .cart-icon {
  filter: brightness(0) invert(1);
}


.header-bottom {
  text-align: center;
  padding: 15px 0;
  background-color: #fcf1f1;
  box-shadow: 0 2px 5px rgba(74, 44, 42, 0.1);
}

.header-bottom nav {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.header-bottom nav a {
  font-size: 18px;
  color: #4a2c2a;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s ease;
}

.header-bottom nav a.router-link-active,
.header-bottom nav a.router-link-exact-active {
  color: #8a4b4b;
  border-bottom: 2px solid #8a4b4b;
  padding-bottom: 5px;
}

.header-bottom nav a:hover {
  color: #8a4b4b;
}
</style>
