<template>
    <div class="page-wrapper">
        <div v-if="product" class="product-container">
            <div class="image-section">
                <img :src="product.image" :alt="product.name" class="product-image">
            </div>
            <div class="details-section">
                <h1 class="product-title"><strong>{{ product.name }}</strong></h1>
                <p class="product-description">
                    {{ product.description }}
                </p>
                <div class="product-meta">
                    <p class="product-price"><strong>{{ product.price.toLocaleString('ru-RU') }} ₽</strong></p>
                </div>
                <button class="add-to-cart-button" @click="addToCartAndRedirect(product)">Добавить в корзину</button>
            </div>
        </div>
        <div v-else class="product-not-found">
            <p>Товар с ID {{ id }} не найден.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'; 
import { useRouter } from 'vue-router';
import { allProducts } from '../data/products'; 


const { addItemToCart } = inject('cart'); 

const router = useRouter(); 

const addToCartAndRedirect = (productToAdd) => {
  addItemToCart(productToAdd); 
  router.push('/cart'); 
};


const props = defineProps({
    id: { 
        type: [String, Number],
        required: true
    }
});

const productId = ref(props.id); 

const product = ref(null);

function findProductById(productId) {
    const numericProductId = Number(productId);
    return allProducts.find(p => p.id === numericProductId) || null;
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  });
}

onMounted(function() {
    product.value = findProductById(productId.value);
    console.log('Компонент ProductDetail смонтирован. ID товара:', productId.value, 'Найденный товар:', product.value);
    scrollToTop();
});

</script>

<style scoped>
.page-wrapper {
    padding-left: 40px; 
    padding-right: 40px; 
    width: 100%; 
    box-sizing: border-box; 
}


.product-container {
    display: flex; 
    padding: 30px 0; 
    gap: 30px;
    max-width: 1200px; 
    margin: 0 auto; 
    align-items: flex-start; 
}

.image-section {
    flex: 1; 
    flex-basis: 400px; 
    max-width: 500px; 
    display: flex;
    justify-content: center;
    align-items: center;
}

.product-image {
    max-width: 100%;
    height: auto;
    display: block; 
    border-radius: 8px; 
    border: 1px solid #ddd; 
    box-shadow: 0 4px 15px rgba(0,0,0,0.1); 
}


.details-section {
    flex: 2; 
    display: flex;
    flex-direction: column; 
    align-items: flex-start; 
    gap: 20px;
    padding-left: 20px; 
}

.product-title {
    margin: 0;
    font-size: 2.5em; 
    color: #2c3e50; 
    font-weight: 600; 
}

.product-title strong {
    color: #7e4f55;
}

.product-description {
    font-size: 1.2em; 
    color: #af7077;
    line-height: 1.7; 
}

.product-meta {
    width: 100%;
    margin-top: 10px; 
    padding-bottom: 10px; 
    border-bottom: 1px solid #eee; 
}

.product-price {
    font-size: 1.8em; 
    color: #e63946; 
    margin: 0; 
    font-weight: bold;
}

.add-to-cart-button {
    background-color: #af7077;
    color: white; 
    padding: 15px 30px; 
    border: none;
    border-radius: 8px; 
    font-size: 1.1em; 
    cursor: pointer; 
    transition: background-color 0.3s ease, transform 0.2s ease; 
}

.add-to-cart-button:hover {
    background-color: #8c4945;
    transform: translateY(-2px); 
}

.product-not-found {
    text-align: center;
    margin-top: 50px;
    font-size: 1.3em;
    color: #dc3545; 
    font-weight: 500;
}
</style>
