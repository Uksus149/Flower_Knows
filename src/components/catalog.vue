<template>
  <div>
    <div class="search-container">
      <div class="search-form">
        <input type="text" placeholder="Поиск..." v-model.trim="searchQuery" />
        <button>
          <img src="../assets/image/icon_02.png" alt="Поиск" />
        </button>
      </div>
    </div>

    <div class="products-section">
      <h2>Каталог товаров</h2>
      <div class="product-grid">
        <div v-if="isAdmin" class="product-card create-product-card">
          <div class="product-image-container">
            <img src="../assets/image/icon_03.png" alt="Новый товар" class="product-image" />
          </div>
          <div class="product-details">
            <textarea
              placeholder="Введите название товара"
              class="product-name-input"
              v-model.trim="newProductName"
            ></textarea>
            <textarea
              placeholder="Введите описание товара"
              class="product-description-input"
              v-model.trim="newProductDescription"
            ></textarea>
            <input
              type="text"
              placeholder="Введите цену"
              class="product-price-input"
              v-model.trim.number="newProductPrice"
            />
          </div>
          <div class="product-actions">
            <button class="btn-details" @click="addNewProduct">Создать</button>
          </div>
          <div v-if="creationError" class="error-message">{{ creationError }}</div>
        </div>

        <div v-for="product in filteredProducts" :key="product.id" class="product-card">
          <div class="product-image-container">
            <img :src="product.image" :alt="product.name" class="product-image" />
          </div>
          <div class="product-details">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">{{ product.description }}</p>
            <p class="product-price">{{ formatPrice(product.price) }}</p>
          </div>
          <div class="product-actions">
            <router-link :to="`/product/${product.id}`" class="btn-details-link">
              <button class="btn-details">Подробнее о товаре</button>
            </router-link>

            <button
              v-if="isAdmin"
              class="btn-delete"
              @click="deleteProduct(product.id)"
              title="Удалить товар"
            >
              <img src="../assets/image/icon_04.png" alt="Удалить" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { allProducts } from '../data/products.js';
import defaultImage from '../assets/image/image_00.png';

const searchQuery = ref('');

const newProductName = ref('');
const newProductDescription = ref('');
const newProductPrice = ref(null);
const products = ref(allProducts);

const isAdmin = ref(false);
const creationError = ref(''); 

function checkAdminStatus() {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    const user = JSON.parse(storedUser);
    isAdmin.value = user.login === 'admin';
  } else {
    isAdmin.value = false;
  }
}

onMounted(function() {
  scrollToTop();
  checkAdminStatus();
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  });
}

const filteredProducts = computed(function() {
  if (!searchQuery.value) {
    return products.value;
  }

  const query = searchQuery.value.toLowerCase();
  const queryWords = query.split(' ').filter(word => word.length > 0);

  return products.value.filter(function(product) {
    const productNameLower = product.name.toLowerCase();
    const productNameWords = productNameLower.split(' ');

    return queryWords.some(function(queryWord) {
      return productNameWords.some(function(productWord) {
        return productWord.includes(queryWord);
      });
    });
  });
});


function formatPrice(price) {
  if (typeof price !== 'number' || isNaN(price)) {
    return 'N/A';
  }
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(price);
}

function addNewProduct() {
  if (!newProductName.value || !newProductDescription.value || newProductPrice.value === null) {
    creationError.value = 'Пожалуйста, заполните все поля.';
    return;
  }
  if (isNaN(newProductPrice.value) || newProductPrice.value <= 0) {
    creationError.value = 'Цена должна быть положительным числом.';
    return;
  }


  creationError.value = '';

  const lastId = products.value.length > 0 ? Math.max(...products.value.map(function(p) { return p.id; })) : 0;
  const newId = lastId + 1;

  const newProduct = {
    id: newId,
    name: newProductName.value,
    description: newProductDescription.value,
    price: newProductPrice.value,
    image: defaultImage,
  };

  products.value.push(newProduct);

  newProductName.value = '';
  newProductDescription.value = '';
  newProductPrice.value = null;
}

// удаление
function deleteProduct(productId) {
  const isConfirmed = confirm('Вы уверены, что хотите удалить этот товар?');

  if (isConfirmed) {
    const indexToDelete = products.value.findIndex(function(product) { return product.id === productId; });

    if (indexToDelete !== -1) {
      products.value.splice(indexToDelete, 1);
      alert('Товар успешно удален!');
    } else {
      alert('Ошибка: Товар для удаления не найден.');
    }
  }
};
</script>

<style scoped>
.btn-delete {
  top: 10px;        
  right: 10px;        
  border: none;      
  width: 40px;       
  height: 40px;     
  display: flex;    
  align-items: center; 
  justify-content: center; 
  cursor: pointer;    
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
}

.btn-delete img {
  width: 40px;      
  height: 40px;     
}

.create-product-card {
  background-color: #ffffff;
  border: 1px #ced4da; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: default; 
}

.create-product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.product-details textarea,
.product-details input {
  width: 100%; 
  padding: 10px 12px;
  margin-bottom: 10px; 
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 15px;
  box-sizing: border-box; 
  resize: vertical; 
}

.product-details textarea:focus,
.product-details input:focus {
  border-color:  #dd9099;
  outline: 0;
  box-shadow: 0 0 0 0.2rem #dd9099;
}

.search-container {
  background-color: #ffffff;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 100px;
  box-sizing: border-box;
}

.search-form {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-form input[type="text"] {
  border: none;
  outline: none;
  padding: 10px 15px;
  border-radius: 5px 0 0 5px;
  font-size: 16px;
  width: 700px;
}

.search-form button {
  background-color: #af7077;
  border: none;
  border-radius: 0 5px 5px 0;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.search-form button:hover {
  background-color: #dd9099;
}

.search-form button img {
  width: 20px;
  height: 20px;
}

.products-section {
  padding: 30px 20px;
  text-align: center;
}

.products-section h2 {
  margin-bottom: 30px;
  font-size: 36px;
  color: #af7077;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px;
  justify-items: center;
}

.product-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 320px;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.product-image-container {
  text-align: center;
  margin-bottom: 20px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image {
  max-width: 100%;
  height: 300px;
  object-fit: contain;
  border-radius: 5px;
}

.product-details {
  margin-bottom: 20px;
  flex-grow: 1; 
}

.product-name {
  font-size: 24px;
  margin-bottom: 10px;
  color: #7e4f55;
}

.product-description {
  font-size: 14px;
  color: #af7077;
  margin-bottom: 15px;
  line-height: 1.5;
}

.product-price {
  font-size: 20px;
  font-weight: bold;
  color: #8c4945;
  margin-top: auto; 
}

.product-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 15px;
}

.btn-details,
.btn-add-to-cart {
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

.btn-details {
  background-color: #ffeaec;
  color: #946267;
}

.btn-details:hover {
  background-color: #ffeaec;
}

.btn-add-to-cart {
  background-color: #af7077;
  color: white;
}

.btn-add-to-cart:hover {
  background-color: #8c4945;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 0.9em;
}

</style>
