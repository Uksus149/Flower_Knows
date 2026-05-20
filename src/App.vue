<template>
  <div id="app">
    <HeaderComponent />
    <router-view :key="$route.fullPath" ></router-view>
    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, provide, readonly, watch, onMounted } from 'vue';
import HeaderComponent from './components/header.vue';
import FooterComponent from './components/footer.vue';
import { useRoute } from 'vue-router';

const cartItems = ref([]);
const MAX_QUANTITY = 10;

//Функции для работы с корзиной

const addItemToCart = (newItem) => {
  const existingItem = cartItems.value.find(item => item.id === newItem.id);

  if (existingItem) {
    if (existingItem.quantity < MAX_QUANTITY) {
      existingItem.quantity++;
      console.log(`Увеличено количество ${newItem.name}. Новое количество: ${existingItem.quantity}`);
    } else {
      console.warn(`Достигнуто максимальное количество (${MAX_QUANTITY}) товара "${newItem.name}".`);
    }
  } else {
    cartItems.value.push({
      id: newItem.id,
      name: newItem.name,
      price: newItem.price,
      image: newItem.image,
      quantity: 1
    });
    console.log(`Добавлен новый товар: ${newItem.name}.`);
  }
  saveCartToLocalStorage(); 
};

const increaseQuantity = (itemToModify) => {
  console.log(`[App.vue] attempt increaseQuantity for ${itemToModify.name}, current: ${itemToModify.quantity}`);
  const item = cartItems.value.find(i => i.id === itemToModify.id);
  if (item) {
    if (item.quantity < MAX_QUANTITY) {
      item.quantity++;
      console.log(`[App.vue] Increased ${item.name}. New quantity: ${item.quantity}`);
      saveCartToLocalStorage(); 
    } else {
      console.warn(`[App.vue] Max quantity (${MAX_QUANTITY}) reached for ${item.name}.`);
    }
  } else {
    console.error(`[App.vue] Item with id ${itemToModify.id} not found in cartItems for increaseQuantity.`);
  }
};

const decreaseQuantity = (itemToModify) => {
  console.log(`[App.vue] attempt decreaseQuantity for ${itemToModify.name}, current: ${itemToModify.quantity}`);
  const item = cartItems.value.find(i => i.id === itemToModify.id);
  if (item) {
    if (item.quantity > 1) {
      item.quantity--;
      console.log(`[App.vue] Decreased ${item.name}. New quantity: ${item.quantity}`);
      saveCartToLocalStorage(); 
    } else {
      removeItem(item);
      console.log(`[App.vue] Removed ${item.name} as quantity was 1.`);
    }
  } else {
     console.error(`[App.vue] Item with id ${itemToModify.id} not found in cartItems for decreaseQuantity.`);
  }
};

const removeItem = (itemToRemove) => {
  const initialLength = cartItems.value.length;
  cartItems.value = cartItems.value.filter(item => item.id !== itemToRemove.id);
  if (cartItems.value.length < initialLength) {
    console.log(`[App.vue] Removed item: ${itemToRemove.name}.`);
    saveCartToLocalStorage();
  }
};


const STORAGE_KEY = 'shoppingCart'; 

const saveCartToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems.value));
  console.log('[App.vue] Cart saved to localStorage:', cartItems.value);
};

const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem(STORAGE_KEY);
  if (savedCart) {
    cartItems.value = JSON.parse(savedCart);
    console.log('[App.vue] Cart loaded from localStorage:', cartItems.value);
  } else {
    console.log('[App.vue] No cart found in localStorage.');
  }
};

onMounted(() => {
  loadCartFromLocalStorage();
});

provide('cart', {
  cartItems,
  addItemToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  MAX_QUANTITY
});


const route = useRoute();
const productIdForPage = ref(null);

watch(() => route.params.id, (newId) => {
  if (newId) {
    productIdForPage.value = Number(newId);
  } else {
    productIdForPage.value = null;
  }
}, { immediate: true });
</script>
