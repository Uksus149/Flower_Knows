<template>
    <div class="centered-container">
        <div class="container">
            <h1>Профиль</h1>
            <div v-if="currentUser">
                <p><strong>Логин:</strong> {{ currentUser.login }}</p>
                <p><strong>Имя:</strong> {{ currentUser.name || 'Не указано' }}</p>
                <p><strong>Email:</strong> {{ currentUser.email }}</p>
                <p><strong>Телефон:</strong> {{ currentUser.phone || 'Не указан' }}</p>
            </div>
            <div v-else>
                <p>Войдите или зарегистрируйтесь</p>
            </div>
            <button @click="logout">Выйти</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentUser = ref(null);
const isLoggedOut = ref(false);

onMounted(function() {
  var storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    currentUser.value = JSON.parse(storedUser);
  } else {
    isLoggedOut.value = true;
  }
});

function logout() {
  localStorage.removeItem('currentUser');
  currentUser.value = null;
  isLoggedOut.value = true;
  router.push({ name: 'Main' });
}
</script>

<style scoped>
.centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 10vh; 
    padding: 20px;
    box-sizing: border-box;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    padding: 30px;
    background-color: #ffffff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
}

input[type="text"],
input[type="password"],
input[type="email"] {
    display: block;
    width: calc(100% - 30px);
    margin-bottom: 10px;
    border-radius: 3px;
    border: 1px solid silver;
    outline: none;
    padding: 10px 15px;
    background: #ffffff;
    color: #000000;
    box-sizing: border-box;
}

input::placeholder {
    color: #888; 
}

button {
    border-radius: 5px;
    border: none;
    outline: none;
    padding: 10px 15px;
    background-color: #8c4945;
    color: rgb(255, 255, 255);
    font-weight: bold;
    cursor: pointer;
    transition: transform 500ms ease, background-color 300ms ease;
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;
}

button:hover {
    transform: translateY(-3px);
}

.error {
    color: #f7314b;
    text-align: center;
    margin-top: 10px;
    font-size: 0.9rem; 
}


.back-button {
    display: block;
    width: auto; 
    padding: 10px 20px;
    margin: 20px auto; 
    background-color: #5c8d8a; 
    font-size: 1rem;
    transition: background-color 300ms ease;
}

.back-button:hover {
    background-color: #70a2a0;
    transform: none; 
}
</style>
