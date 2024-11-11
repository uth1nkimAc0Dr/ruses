// имя почта
// userProfileData можно хранить
// reactive переманная можно хранить, которые буду в другом месте юзать
// функция стейт забивает, а мы уже в саму компоненту данные из стора хватаем

import { defineStore } from 'pinia';
import router from '@/router';
import { refresh } from '@/api/auth';

export const useAuthStore = defineStore('authStore', () => {
  const edf = () => {
    console.log('adsf');
    router.push('/login');
    refresh();
  };
  return {};
});
