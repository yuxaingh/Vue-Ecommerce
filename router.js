const routers = [
    {
        path: '/list',
        meta: {
            title: 'Product List'
        },
        component: (resolve) => require(['./views/list.vue'], resolve)
    },
    {
        path: '/product/:id',
        meta: {
            title: 'Product Detail'
        },
        component: (resolve) => require(['./views/product.vue'], resolve)
    },
    {
        path: '/cart',
        meta: {
            title: 'Shop Cart'
        },
        component: (resolve) => require(['./views/cart.vue'], resolve)
    },
    {
        path: '/*',
        redirect: '/list'
    }
];

export default routers;
