import { createRouter, createWebHistory } from 'vue-router';
import ToDoPage from '@/pages/ToDoPage.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import LoginForm from '@/pages/LoginForm.vue';
import RegisterForm from '@/pages/RegisterForm.vue';
import ForgotPasswordForm from '@/pages/ForgotPasswordForm.vue';
import UserSetting from '@/components/UserSetting.vue';
// import { useAuthStore } from '@/stores/authStore';
import { outOfExpired } from '@/api/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        { path: '/login', component: LoginForm, name: 'login' },
        { path: '/register', component: RegisterForm, name: 'register' },
        { path: '/forgot', component: ForgotPasswordForm },
      ],
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          redirect: '/todos',
        },
        {
          path: '/todos',
          name: 'allToDo',
          component: ToDoPage,
        },
        {
          path: '/setting',
          component: UserSetting,
        },
      ],
    },
    // {
    //   path: '/x',
    //   component: TestComponent,
    // },
    // {
    //   path: '/todos',
    //   name: 'allToDo',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: ToDoPage,
    // },
  ],
});

router.beforeEach(async (to) => {
  // if (to.name !== 'login' && localStorage.getItem('accessToken')) {
  //   console.log('не из логина и есть аксес');
  //   const isAuthenticated = localStorage.getItem('accessToken');
  //   if (to.meta.auth && !isAuthenticated) {
  //     router.push('/login');
  //     console.log('NEXT');
  //   }
  //   if (isAuthenticated) {
  //     console.log('else');
  //     const sessionValid = await outOfExpired();
  //     console.log('response is', sessionValid);
  //     if (sessionValid) {
  //       return next({ name: 'login' });
  //     }
  //     if (sessionValid === undefined || sessionValid === false) {
  //       // return next('/login');
  //       // router.push('/login').catch(() => {});
  //       console.log('a;sdflk');
  //     }
  //   }
  //   // const store = useAuthStore();
  //   // if (response === undefined || response === false) {
  //   //   router.push('/login');
  //   // }
  //   // await store.outOfExpired();
  // } else {
  //   next();
  // }
  if (to.name !== 'login' && to.name !== 'register') {
    const isExpired = await outOfExpired();
    console.log('Истекло! -', isExpired);
    if (isExpired) {
      router.push('/login');
    }
  }
});

export default router;

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '/',
//       redirect: { name: 'allToDo' },
//     },
//     {
//       path: '/todos',
//       name: 'allToDo',
//       // route level code-splitting
//       // this generates a separate chunk (About.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: ToDoPage,
//     },
//   ],
// });
