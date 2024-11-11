import axios from 'axios';
import router from '@/router';
// import { useAuthStore } from '@/stores/authStore';
// const store = useAuthStore();
const BASE_URL = 'https://easydev.club/api/v1';

export const outOfExpired = async (): Promise<boolean | undefined> => {
  //boolean
  const refreshTry = async () => {
    console.log('refreshTry');
    let refreshResult = false; //истек
    try {
      refreshResult = await refresh();
      console.log('refreshResult !s', refreshResult);
    } catch (error) {
      refreshResult = true;
      console.log('Ошибка обновления токена');
      router.push('/login'); //с любой ошибки выпинываем(останется false)
      throw error;
      // console.log('Перебросило');
    }
    return refreshResult;
  };

  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    try {
      const tokenParts = accessToken.split('.');
      const payloadData = atob(tokenParts[1]);
      const payloadDataParsed = JSON.parse(payloadData); //обернуть в try-catch?
      const payloadDataExp = payloadDataParsed.exp;
      const currentTime = Math.floor(Date.now() / 1000);

      console.log('разница', payloadDataExp - currentTime);
      if (payloadDataExp < currentTime + 100) {
        console.log('refreshTry(accessTimeOut)');
        const refreshSuccess = await refreshTry();
        if (!refreshSuccess) {
          return true;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error('Ошибка при проверке токена, ${error}');
      // router.push('/login');
      return true;
    }
  } else {
    try {
      const refreshSuccess = await refreshTry();

      if (!refreshSuccess) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(`ошибка: ${error}`);
      throw new Error(`${error}`);
    }
    // console.log('постараемя зарефрешить(!accessToken)');
    // refreshTry();
  }
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // console.log('здесь каждый');
    // outOfExpired();

    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === '401') {
        router.push('/login');
      } else {
        console.error(error);
      }
    }
    return Promise.reject(error);
  },
);

// если токен имеется, то headers
// interceptor: 401 -> обновление
// каждый запрос мы проверяем

import type {
  UserRegistration,
  AuthData,
  RefreshToken,
  Profile,
  // ProfileRequest,
  // PasswordRequest,
  Token,
} from '@/types/authInterfaces';

export const createUser = async (
  userData: UserRegistration,
): Promise<Profile | any> => {
  await apiClient
    .post<Profile>(`/auth/signup`, userData)
    .then((response) => {
      const profile = response.data;
      return profile;
    })
    .catch((error) => {
      console.error(`Ошибка регистрации${error}`);
      throw error;
    });
};
// if (!response) {
//   console.log('!response');
//   console.log('response is', response);
//   console.log('response.data is', response.data);
//   throw new Error(`${response.status}`);
// }

// export const userAuth = async(userData: AuthData): <Token> => {

export const userAuth = async (userData: AuthData): Promise<Token | any> => {
  try {
    const response = await apiClient.post<Token>(`/auth/signin`, userData);

    if (response.data) {
      const data: Token = response.data; // if (error instanceof Error && error.message.trim() === '401') {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      return response.data;
    } else {
      throw new Error(`Ответ сервера пуст`);
    }
  } catch (error) {
    console.error(`${error}`);
    if (
      error instanceof Error &&
      error.message === 'Request failed with status code 401'
    ) {
      alert('Неверный логин или пароль');
      throw error;
    } else {
      alert(`Ошибка входа: ${error}`);
      throw error;
    }
  }
};

export const refresh = async (): Promise<Token | any> => {
  const refreshToken: RefreshToken = localStorage.getItem('refreshToken');

  await apiClient
    .post<Token>(`/auth/refresh`, refreshToken)
    .then((response) => {
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('accessToken', response.data.accessToken);

      console.log(`reponse в .then is: `, response);
      if (!response.data) {
        throw new Error(`${response.status}`);
      }
      return response;
    })
    .catch((error) => {
      console.error(`${error}`);
      throw error;
    });
  console.log('refreshNULLsya');
};
// try {
//   const response = await apiClient.post(`/auth/refresh`, refreshToken);
//   const data: Token = response.data;
//   localStorage.setItem('refreshToken', data.refreshToken);
//   localStorage.setItem('accessToken', data.accessToken);
//   if (!response.data) {
//     throw new Error(`${response.status}`);
//   }
// } catch (error) {
//   console.log(`${error}`);
//   throw error;
// }

export const getProfile = async (): Promise<Profile> => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    // почему не await?
    if (!accessToken) {
      throw new Error(`С токеном проблемы`);
    }
    const response = await apiClient.get(`/user/profile`);
    // headers: {Authorization: `Bearer ${accessToken}`}

    if (!response.data) {
      throw new Error(`${response.status}`);
    }

    const profile: Profile = await response.data;
    return profile;
  } catch (error) {
    console.log(`error trouble is ${error}`);
    throw error;
  }
};

// export const signIn = async (signInData: AuthData): Promise<Token | any> => {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/signin`, {
//       method: 'POST',
//       headers: {
//         // accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(signInData),
//     });

//     if (!response.ok) {
//       throw new Error(`Ошбика авторизации ${response.status}`);
//     }
//     const data: Token = await response.json();
//     console.log('data', data);
//     // const refreshToken: Token = await response.json(); //при ф5 берем для новой пары
//     // localStorage.setItem('refreshToken', data.refresh);
//     console.log(data.accessToken);
//     localStorage.setItem('accessToken', data.accessToken);
//     localStorage.setItem('refreshToken', data.refreshToken);
//     console.log('aces is', data.accessToken);
//     console.log('refre is', data.refreshToken);
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
// import tokens from '@/pages/LoginForm.vue';

// export const refresh = async (): Promise<Token | any> => {
//   try {
//     const refreshToken = localStorage.getItem('refreshToken');
//     const response = await fetch(`${BASE_URL}/auth/refresh`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ refreshToken }),
//     });
//     if (!response.ok) {
//       throw new Error(`${response.status}`);
//     }
//     const data: Token = await response.json();
//     localStorage.setItem('refreshToken', data.refreshToken);
//     localStorage.setItem('accessToken', data.accessToken);
//     console.log('Зарефрешили');
//   } catch (error) {
//     console.log(`refresh Error ${error}`);
//     throw error;
//   }
// };

// access для запросов авторизации
// refresh - если access устарел, то получаю новый
// export const getProfile = async (): Promise<Profile> => {
//   const accessToken = localStorage.getItem('accessToken');
//   console.log('getProfileCalled');
//   try {
//     if (!accessToken) {
//       throw new Error('Нет токена доступа');
//     }
//     const response = await fetch(`${BASE_URL}/user/profile`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`${response.status}`);
//     }
//     const profile: Profile = await response.json();
//     return profile;
//   } catch (error) {
//     console.log(`ошибка при получении профиля ${error}`);
//     throw error;
//   }
// };

// console.log(`createProfileError is ${error}`);
// throw error;

// export const signIn = async (signInData: AuthData): Promise<Token | any> => {
//   try {
//     const response = await fetch(`${BASE_URL}/auth/signin`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(signInData),
//     });

//     if (!response.ok) {
//       throw new Error(`${response.status}`);
//     }
//   } catch (error) {
//     // console.log('asdf');
//     throw error;
//   }
// };
