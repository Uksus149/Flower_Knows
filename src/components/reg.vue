<template>
    <div class="centered-container">
        <div class="container">
            <h1>РЕГИСТРАЦИЯ</h1>
            <input type="text" v-model="userLogin" placeholder="Логин">
            <input type="text" v-model="userName" placeholder="Имя(необязательно)">
            <input type="password" v-model="userPass" placeholder="Пароль">
            <input type="email" v-model="userEmail" placeholder="Email">
            <input type="text" v-model="userPhone" placeholder="Телефон(необязательно)">

            <p class="error">{{ error }}</p>

            <button @click="sendData">Отправить</button>
            
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; 
import { useRouter } from 'vue-router';
import initialRegisteredUsers from '../data/registeredUsers';

const router = useRouter();
const registeredUsers = ref([]);

function loadUsers() {
    var storedUsers = localStorage.getItem('registeredUsers');
    if (storedUsers) {
        registeredUsers.value = JSON.parse(storedUsers);
    } else {
        registeredUsers.value = [].concat(initialRegisteredUsers);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers.value));
    }
}

function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

onMounted(function() {
    loadUsers();
});

var error = ref('');
var userLogin = ref('');
var userName = ref('');
var userPass = ref('');
var userEmail = ref('');
var userPhone = ref('');

function sendData() {
    if (!userLogin.value) {
        error.value = "Логин не введен";
        return;
    }
    if (!userPass.value) {
        error.value = "Пароль не введен";
        return;
    }
    if (!userEmail.value) {
        error.value = "Email не введен";
        return;
    }

    // проверка, существует ли уже такой логин
    var userExists = false;
    for (var i = 0; i < registeredUsers.value.length; i++) {
        if (registeredUsers.value[i].login === userLogin.value) {
            userExists = true;
            break;
        }
    }
    if (userExists) {
        error.value = "Пользователь с таким логином уже существует";
        return;
    }

    // создание нового пользователя
    var newUser = {
        login: userLogin.value,
        name: userName.value || 'Без имени',
        pass: userPass.value,
        email: userEmail.value,
        phone: userPhone.value || 'Не указан'
    };

    registeredUsers.value.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers.value));

    setCurrentUser(newUser);

    error.value = '';

    userLogin.value = '';
    userName.value = '';
    userPass.value = '';
    userEmail.value = '';
    userPhone.value = '';

    router.push({ name: 'Profile' });
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
