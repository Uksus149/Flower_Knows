<template>
  <main class="main">
    <div class="banner-wrapper">
      <img src="../assets/image/banner_04.png" alt="Верхний баннер" class="banner top-banner" />
      <router-link to="/catalog" class="catalog-btn-link">
        <button class="catalog-btn">Каталог товаров</button>
      </router-link>
    </div>

    <div class="lower-section">
      <div class="product-info product-info-right">
        <h2>FLOWER KNOWS</h2>
        <p>
          Flower Knows — косметика, завоевывающая популярность по всему миру. Бренд который смело можно назвать настоящим экспертом 
          в области красоты и макияжа. Ее уникальные продукты и инновационные формулы покорили сердца множества женщин по всему миру.
        </p>
      </div>
      <img src="../assets/image/banner_02.png" alt="Нижний баннер слева" class="banner side-banner" />
    </div>

    <div class="lower-section">
      <img src="../assets/image/banner_03.png" alt="Нижний баннер справа" class="banner side-banner" />
      <div class="product-info product-info-left">
        <h2>Эстетика, инновации и красота в каждом продукте</h2>
        <p>
          Косметика Flower Knows – это идеальный выбор для тех, кто стремится выглядеть безупречно и ухаживать за своей кожей. Она сочетает в себе эстетику, инновации и моду, что делает ее неповторимой. 
          Не упустите возможность попробовать эту премиальную китайскую косметику и преобразить свой образ с помощью Flower Knows.
        </p>
      </div>
    </div>

    <div class="lower-section">
      <div class="product-info product-info-right">
        <h2>Почему Flower Knows выбирают визажисты и знаменитости</h2>
        <p>
          Популярность Flower Knows растет с каждым днем. Модницы по всему миру оценили ее качество, эффективность и доступность. 
          Бренд активно сотрудничает с ведущими визажистами и знаменитостями, что только усиливает его репутацию. Бренд стал неотъемлемой 
          частью многих профессиональных макияжных арсеналов и пользуется огромным спросом среди обычных потребителей.
        </p>
      </div>
      <img src="../assets/image/banner_05.png" alt="Нижний баннер слева" class="banner side-banner" />
    </div>

    <div class="product">
    <div class="item">
      <img src="../assets/image/image_01.png" alt="Заколка для волос" class="banner side-banner" />
      <p>Заколка для волос Flower Knows Swan Ballet</p>
      <router-link to="/catalog">
        <button>Смотреть в каталоге</button>
      </router-link>
    </div>
    <div class="item">
      <img src="../assets/image/image_02.png" alt="Парфюм" class="banner side-banner" />
      <p>Парфюм Strawberry Cupid</p>
      <router-link to="/catalog"> 
        <button>Смотреть в каталоге</button>
      </router-link>
    </div>
    <div class="item">
      <img src="../assets/image/image_03.png" alt="Пудра" class="banner side-banner" />
      <p>Прессованная пудра Strawberry Cupid</p>
      <router-link to="/catalog"> 
        <button>Смотреть в каталоге</button>
      </router-link>
    </div>
  </div>

    <img src="../assets/image/banner_06.png" alt="Верхний баннер" class="banner top-banner" />
  </main>
</template>

<script setup>
</script>

<style scoped>
.main {
  padding: 0px;
  text-align: center;
  font-family: inherit; 
}

.banner-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.top-banner {
  width: 100%;
  display: block;
}

.catalog-btn {
  position: absolute;
  bottom: 200px;
  left: 50%;
  transform: translateX(-50%);

  background: white;
  color: #3a1f1f;
  font-weight: bold;
  font-size: 18px;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: inherit; 
}

.catalog-btn:hover {
  transform: translateX(-50%) translateY(-5px);
  box-shadow: 0 5px 15px rgba(92, 12, 12, 0.3);
}

.lower-section {
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
}

.lower-section img {
  border-radius: 8px;
}

.side-banner {
  width: 50%;
  display: block;
}

.product-info {
  width: 58%;
  padding: 20px;
}

.product-info-right {
  text-align: right;
}

.product-info-left {
  text-align: left;
}

h2 {
  margin-top: 20px;
  font-family: inherit;
}

p {
  margin-top: 20px;
  font-family: inherit;
}

.product {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fcf1f1;
}

.item {
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

.item img {
  display: block;
  width: 60%;
  border-radius: 8px;
  margin-bottom: 10px;
  margin: auto;
}

.item p {
  text-align: center;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: bold; 
  color: #4a2c2a;
  font-family: inherit;
}

.item button {
  background-color: #af7077;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  border: none;
  transition: all 0.3s ease; 
  font-weight: bold;
  font-family: inherit; 
}

.item button:hover {
  transform: translateY(-3px); 
}
</style>
