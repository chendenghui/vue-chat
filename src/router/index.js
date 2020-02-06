import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login/Login.vue';
import Chatting from '../components/Chatting/Chatting.vue';
// import AI from '../components/Chatting/AI.vue';
import Qa from '../components/Chatting/qa.vue';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Chatting',
      component: Chatting,
      // beforeEnter: (to, from, next) => {
      //   console.log('router', Math.random());
      //   next();
      // }
    },
    {
      path: '/qa',
      name: 'Qa',
      component: Qa,
    },
  ]
});

export default router;
