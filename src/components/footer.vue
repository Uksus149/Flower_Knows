<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-column">
                <h3>КОЛЛЕКЦИИ</h3>
                <ul>
                    <li>LITTLE ANGEL</li>
                    <li>SWAN BALLET</li>
                    <li>STRAWBERRY ROCOCO</li>
                    <li>MIDSUMMER FAIRYTALES</li>
                    <li>NEWER'S SHOP</li>
                    <li>MOONLIGHT MERMAID</li>
                    <li>BUTTERFLY CLOUD COLLAR</li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>ДОСТАВКА</h3>
                <ul>
                    <li>Доставка</li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>КОНТАКТЫ</h3>
                <ul>
                    <li><strong>Телефон:</strong> +7 (800) 555-35-35</li>
                    <li><strong>Email:</strong> hello@flowerknows.ru</li>
                    <li><strong>WhatsApp:</strong> +7 (999) 123-45-67</li>
                    <li><strong>Время работы:</strong> Пн-Вс 10:00-21:00</li>
                </ul>
            </div>
        </div>


    </footer>
</template>

<script setup>

</script>

<style scoped>
.footer {
    background-color: #f8e8e8;
    border-top: 1px solid #e6c7c7;
    width: 100%;
    min-width: 1200px;
    margin-top: 0px;
}

.footer-content {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    padding: 60px 20px;
    max-width: 1200px;
    margin: 0 auto;
    gap: 40px;
}

.footer-column {
    flex: 1;
    min-width: 200px;
}

.footer-column h3 {
    font-size: 18px;
    font-weight: bold;
    color: #4a2c2a;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.footer-column ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-column li {
    font-size: 14px;
    color: #666;
    margin-bottom: 12px;
    cursor: pointer;
    transition: color 0.3s ease;
}

.footer-column li:hover {
    color: #4a2c2a;
}

</style>
