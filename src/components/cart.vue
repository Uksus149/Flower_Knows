<template>
  <div class="cart-container">
    <div v-if="!cartItems.length" class="empty-cart-message">
      <h2>В корзине ничего нет</h2>
      <p>Выберите товары или войдите в аккаунт, если добавляли товары в корзину</p>
    </div>

    <div v-else class="cart-items-list">
      <h2>Ваша корзина</h2>
      <div class="cart-item" v-for="item in cartItems" :key="item.id">
        <div class="item-image">
          <img :src="item.image || '/path/to/placeholder.png'" :alt="item.name" class="cart-item-image">
        </div>
        <div class="item-details">
          <h3 class="item-name">{{ item.name }}</h3>
          <p class="item-price">{{ formatCurrency(item.price) }}</p>
        </div>
        <div class="item-quantity">
          <button class="quantity-btn" @click="decreaseQuantity(item)" :disabled="item.quantity <= 1">
            -
          </button>
          <span class="quantity-count">{{ item.quantity }}</span>
          <button class="quantity-btn" @click="increaseQuantity(item)" :disabled="item.quantity >= MAX_QUANTITY">
            +
          </button>
        </div>
        <div class="item-remove">
          <button class="remove-btn" @click="removeItem(item)">
            <img src="../assets/image/icon_04.png" alt="Удалить" />
          </button>
        </div>
      </div>

      <hr class="cart-divider"> 

      <div class="cart-summary">
        <div class="total-price">
          <span>Общая сумма:</span>
          <strong>{{ formatCurrency(totalPrice) }}</strong>
        </div>
        <button class="checkout-btn">Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue';

const { cartItems, increaseQuantity, decreaseQuantity, removeItem, MAX_QUANTITY } = inject('cart');


const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
});


const formatCurrency = (amount) => {
  return amount.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' });
};


</script>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: column; 
  justify-content: flex-start; 
  align-items: center;    
  min-height: 50vh; 
  text-align: center;
  padding: 20px; 
  box-sizing: border-box; 
}

.empty-cart-message {
  margin-bottom: 30px; 
}

h2 {
  font-size: 2.5rem; 
  color: #333; 
  text-transform: uppercase; 
  letter-spacing: 2px; 
  margin-bottom: 15px; 
}

p {
  font-size: 1.2rem; 
  color: #666; 
  line-height: 1.6; 
  margin-top: 0; 
}

.cart-item {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px; 
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  box-sizing: border-box;
}

.item-image {
  margin-right: 20px;
}

.item-image img {
  width: 100px; 
  height: 100px; 
  object-fit: cover; 
  border-radius: 4px;
}

.item-details {
  flex-grow: 1; 
  text-align: left; 
  margin-right: 20px; 
}

.item-name {
  font-size: 1.5rem;
  color: #333;
  margin-top: 0;
  margin-bottom: 5px;
}

.item-price {
  font-size: 1.1rem;
  color: #555;
  margin-top: 0;
  margin-bottom: 0;
}

.item-quantity {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 10px;
}

.quantity-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 10px;
  color: #666;
}

.quantity-btn:hover {
  color: #007bff;
}

.quantity-count {
  font-size: 1.1rem;
  margin: 0 10px;
  min-width: 20px; 
  text-align: center;
}

.remove-btn {
  background: none; 
  border: none; 
  cursor: pointer; 
  padding: 5px; 
  display: flex; 
  align-items: center;
  justify-content: center;
}

.remove-btn img {
  width: 40px;
  height: 40px;
  transition: opacity 0.2s ease-in-out; 
  border-radius: 5px;;
}


.checkout-btn {
  padding: 12px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
  flex-grow: 1;
  margin: 0 5px;
}

.checkout-btn {
  background-color: #ffeaec;
  color: #946267;
}

.checkout-btn:hover {
  background-color: #ffeaec;
}
</style>
