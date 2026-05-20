<template>
    <div class="centered-container">
        <div class="container">
            <h1>ВОЙТИ</h1>
            <input type="text" v-model="userLogin" placeholder="Логин">
            <input type="password" v-model="userPass" placeholder="Пароль">

            <p class="error">{{ error }}</p>
            <p class="message">{{ message }}</p>

            <button @click="sendData">Войти</button>
            <p>Для тестирования:</p>
            <p>логин: admin пароль: 1234</p>

            
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import initialRegisteredUsers from '../data/registeredUsers'; 

const router = useRouter(); 

const registeredUsers = ref([]);

function initializeAndLoadUsers() {
  const storedUsers = localStorage.getItem('registeredUsers');
  if (storedUsers) {
    registeredUsers.value = JSON.parse(storedUsers);
  } else {
    console.log("localStorage 'registeredUsers' пуст, инициализируем начальными данными.");
    registeredUsers.value = [...initialRegisteredUsers]; 
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers.value));
  }
}

function setCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

const error = ref('');
const message = ref('');
const userLogin = ref('');
const userPass = ref('');

function sendData() {
  if (!userLogin.value) {
    error.value = "Логин не введен";
    return;
  }
  if (!userPass.value) {
    error.value = "Пароль не введен";
    return;
  }

  error.value = '';

  var userFound = null;
  for (var i = 0; i < registeredUsers.value.length; i++) {
    var user = registeredUsers.value[i];
    console.log('Проверяем пользователя: ', user.login, user.pass);
    if (user.login === userLogin.value && user.pass === userPass.value) {
      userFound = user;
      break;
    }
  }

  if (userFound) {
    message.value = "Вы авторизированы!";
    error.value = '';
    setCurrentUser(userFound);
    router.push({ name: 'Profile' });
  } else {
    message.value = '';
    error.value = "Неверный логин или пароль";
  }
}

onMounted(function() {
  initializeAndLoadUsers();
});
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

h3 {
    text-align: center;
    margin-bottom: 20px;
}

input[type="text"],
input[type="password"] {
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

button {
    border-radius: 5px;
    border: none; 
    outline: none;
    padding: 10px 15px;
    background-color: #8c4945;
    color: rgb(255, 255, 255);
    font-weight: bold;
    cursor: pointer;
    transition: transform 500ms ease;
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
}

.message {
    color: rgb(21, 148, 21);
    text-align: center;
    margin-top: 10px;
}
</style>
