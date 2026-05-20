import mainComponent from './components/main.vue';
import catalogComponent from './components/catalog.vue';
import aboutUsComponent from './components/aboutUs.vue';
import deliveryComponent from './components/delivery.vue';
import productComponent from './components/product.vue';
import logComponent from './components/log.vue'; 
import regComponent from './components/reg.vue'; 
import logRegComponent from './components/cart.vue';
import profileComponent from './components/profile.vue'; 

const routes = [
    { path: '/', component: mainComponent, name: 'Main' },
    { path: '/catalog', component: catalogComponent, name: 'Catalog' },
    { path: '/aboutUs', component: aboutUsComponent, name: 'AboutUs' },
    { path: '/delivery', component: deliveryComponent, name: 'Delivery' },
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: productComponent,
        props: true
    },
    { path: '/log', component: logComponent, name: 'Log' },
    { path: '/reg', component: regComponent, name: 'Reg' },
    { path: '/cart', component: logRegComponent, name: 'Cart' },
    { path: '/profile',component: profileComponent, name: 'Profile'}
];

export { routes };
