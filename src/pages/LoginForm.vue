<template>
  <div>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="handleSignIn"
      @finishFailed="onFinishFailed"
      class="login-form"
    >
      <!-- @finish="onFinish" -->
      <a-form-item
        label="Login"
        name="login"
        :rules="[
          {
            required: true,
            message: 'Введите имя пользователя',
          },
        ]"
        class="input-container"
      >
        <a-input v-model:value="formState.login" />
      </a-form-item>

      <!-- <a-form-item label="GangNumbers"></a-form-item> -->

      <a-form-item
        label="Password"
        name="password"
        :rules="[
          { required: true, message: 'Введите пароль' },
          {
            min: 6,
            message: `Пароль не может быть короче 6 символов`,
          },
        ]"
        class="input-container"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <div style="display: flex; justify-content: space-between">
        <!-- :wrapper-col="{ offset: 8, span: 16 }" -->
        <a-form-item name="remember" class="remember-forgot">
          <a-checkbox>
            <!-- <a-checkbox v-model:checked="formState.remember"> -->
            Remember me
          </a-checkbox>
        </a-form-item>
        <router-link to="/forgot">Forgot password?</router-link>
      </div>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit(signIn)</a-button>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <div style="display: flex">
          <p>Don't registered Yet?</p>
          <p><router-link to="/register"> Create an account </router-link></p>
        </div>
      </a-form-item>

      <a-form-item>
        <a-button style="margin: 15px" @click="getProfile()">
          Get Profile
        </a-button>

        <a-button style="margin: 15px" @click="() => refresh()">
          Refresh Token
        </a-button>

        <!-- <a-button style="margin: 15px" @click="() => store.decodeToken()">
          decodeToken
        </a-button> -->
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { getProfile, userAuth } from '@/api/auth';
// import { ref } from 'vue';
// import type { Token } from '@/types/authInterfaces';
import { refresh } from '@/api/auth';
import router from '@/router';

interface FormState {
  login: string;
  password: string;
}

// кнопка войти
const handleSignIn = async (values: any) => {
  try {
    const entered = await userAuth(formState);
    if (entered) {
      router.push('/todos');
    }
  } catch (error) {
    console.error(`Ошибка авторизации ${error}`);
  }
  // if (await userAuth(formState)) {
  //   // возвращает значение только когда мы входим
  //   console.log('userAuth(formState) is', userAuth(formState));
  //   //если все четко(?)
  //   router.push('/todos');
  // } else {
  //   alert('Неверные логин или пароль!');
  // }
  console.log('Success:', values);
};

const formState = reactive<FormState>({
  login: '',
  password: '',
});
// remember: true,

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<style scoped>
div {
  text-align: center;
}
.login-form {
  margin: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* /* margin: 0 auto; */
}
/* .input-container {
  width: 50%;
  margin: 15px;
} */
/* .remember-forgot {
  display: flex !important;
  flex-direction: row !important;
  justify-content: flex-start !important;
} */
</style>
