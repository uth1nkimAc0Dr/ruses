<template>
  <!-- :rules="rules" -->
  <a-form
    ref="formRef"
    name="custom-validation"
    :model="formState"
    v-bind="layout"
    @finish="handleSubmitProfile"
    @finishFailed="handleFinishFailed"
  >
    <!-- @finish="handleFinish" -->
    <!-- @validate="handleValidate" -->
    <a-form-item
      has-feedback
      label="Имя пользователя"
      name="username"
      :rules="[
        {
          required: true,
          message: 'Введите имя пользователя',
          trigger: 'change',
        },
        {
          max: 60,
          message: 'Введите меньше 60 символов',
          trigger: 'change',
        },
        {
          pattern: /^[a-zA-Zа-яА-Я]{0,90}$/gm,
          trigger: 'blur',
          message: 'Символы русского/латинского алфавита!',
        },
      ]"
    >
      <a-input v-model:value="formState.username" autocomplete="off" />
    </a-form-item>

    <a-form-item
      has-feedback
      label="Логин"
      name="login"
      :rules="[
        { required: true, message: 'Введите логин', trigger: 'blur' },
        { min: 2, message: 'Введите больше 1 символа', trigger: 'blur' },
        { max: 60, message: 'Введите меньше 60 символов', trigger: 'blur' },
        {
          pattern: /^[a-zA-Z]{0,90}$/gm,
          trigger: 'blur',
          message: 'Символы латинского алфавита!',
        },
      ]"
    >
      <a-input v-model:value="formState.login" autocomplete="off" />
    </a-form-item>

    <a-form-item
      has-feedback
      label="Пароль"
      name="pass"
      :rules="[
        { min: 6, message: 'Больше 5 символов!' },
        { validator: validatePass, trigger: 'change' },
        // это не велосипед?
      ]"
    >
      <a-input
        v-model:value="formState.pass"
        type="password"
        autocomplete="off"
      />
    </a-form-item>

    <a-form-item
      has-feedback
      name="checkPass"
      label="Подтвердите"
      :rules="[{ validator: validatePass2, trigger: 'change' }]"
    >
      <a-input
        v-model:value="formState.checkPass"
        type="password"
        autocomplete="off"
      />
    </a-form-item>

    <a-form-item
      has-feedback
      label="Почта"
      name="email"
      :rules="[
        { required: true, message: `Введите почту`, trigger: 'blur' },
        {
          // pattern: /[a-z0-9]+@[a-z0-9]+.[a-z]+/gm,
          pattern: /^[a-z0-9]+@[a-z0-9]+.[a-z]+$/gm,
          trigger: 'blur',
          message: `Введите реальную почту`,
        },
      ]"
    >
      <a-input v-model:value="formState.email" autocomplete="off" />
    </a-form-item>

    <a-form-item
      has-feedback
      label="Phone"
      name="phone"
      :rules="[
        {
          required: false,
          message: `Введите номер телефона`,
          trigger: 'change',
        },
        {
          // pattern: /\+[0-999]{1}[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}/,
          pattern: /^\+[0-999]{1}[0-9]{3}[0-9]{3}[0-9]{2}[0-9]{2}$/gm,
          message: `Введите в формате: +xxxxxxxxxxx`,
          trigger: 'change',
        },
      ]"
    >
      <a-input v-model:value="formState.phone" />
    </a-form-item>

    <!-- :wrapper-col="{ span: 14, offset: 4 }" -->
    <!-- <a-form-item>
    </a-form-item> -->

    <a-form-item>
      <div>
        <div>
          <a-button type="primary" html-type="submit">
            Создать аккаунт
          </a-button>

          <a-button style="margin-left: 10px" @click="resetForm">
            Очистить все поля
          </a-button>
        </div>

        <a-button style="margin: 20px auto; height: 50px">
          <router-link to="/login">
            <p>У меня есть аккаунт.</p>
            <p>Войти</p>
          </router-link>
        </a-button>
      </div>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';
import { createUser } from '@/api/auth';
import type { UserRegistration } from '@/types/authInterfaces';

interface FormState {
  username: string;
  login: string;
  pass: string;
  checkPass: string;
  email: string;
  phone: string;
}

const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
  username: '',
  login: '',
  pass: '',
  checkPass: '',
  email: '',
  phone: '',
});

// вызывается после Создать аккаунт(сработает, если валидация пропустит)
const handleSubmitProfile = async (values: FormState) => {
  console.log(values, formState);
  console.log('handle');
  const newObj: UserRegistration = {
    login: formState.login,
    username: formState.username,
    password: formState.pass,
    email: formState.email,
    phoneNumber: formState.phone,
  };

  try {
    await createUser(newObj);
    alert('Пройдите на страницу входа');
  } catch (error) {
    if (error instanceof Error && error.message === '409') {
      alert('Такой логин или почта уже существует');
    } else {
      alert(`Ошибка при создании профиля: ${error}`);
    }
  }
};

const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Введите пароль');
  } else {
    if (formState.checkPass !== '') {
      formRef?.value.validateFields('checkPass');
      //я не дал default value, so TS extends:"мб и undefined?"(когда знач не задано)
      //formRef!.value - "хоть это и мб null или undefined, оно не будет, if it does let if fail
      //formRef?.value - "TS, call da method only if значение не является ни null, ни undefined
    }
    return Promise.resolve();
  }
};

const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Введите снова пароль');
  } else if (value !== formState.pass) {
    return Promise.reject('Не совпадают!');
  } else {
    return Promise.resolve('');
  }
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

// const handleFinish = (values: FormState) => {
// console.log('handleFinish');
// console.log(values, formState);
// handleSubmitProfile();
// его надо асинк делать, раз он вызывает асинк? Или если он занимается только этим, то нет необходимости?
// };

const handleFinishFailed = (errors: any) => {
  console.log(errors);
};

const resetForm = () => {
  formRef?.value.resetFields();
};

// 409 = такой логин или почта уже существуют

// handleValidate выводит результат каждого поля после его заполнения
// const handleValidate = (...args: any) => {
//   console.log(`handleValidate: ${args}`);
// };

// interface PhoneInputFormItemProps {
//   skipValidityCheck?: boolean;
//   errorMessage?: string;
//   // Recognise local phone numbers in country
//   // default: US
//   countryCode?: string;
// }

// interface PhoneInputProps {}

// const rules: Record<string, Rule[]> = {
//   // name: [{ required: true, message: 'Введите имя пользователя' }],
//   password: [{ required: true, validator: validatePass, trigger: 'change' }],
//   checkPass: [{ validator: validatePass2, trigger: 'change' }],
//   age: [{ validator: checkAge, trigger: 'change' }],
// };

// <a-form-item label="Age" name="age" class="input-container">
//   <a-input v-model:value="formState.age" />
// </a-form-item>

// const checkAge = async (_rule: Rule, value: number) => {
//   if (!value) {
//     return Promise.reject('Please input the age');
//   }
//   if (!Number.isInteger(value)) {
//     return Promise.reject('Please input digits');
//   } else {
//     if (value < 18) {
//       return Promise.reject('Age must be greater than 18');
//     } else {
//       return Promise.resolve();
//     }
//   }
// };

// interface ProfileInterface {
//   login: string;
//   username: string;
//   password: string;
//   email: string;
//   phone: string;
// }
// const Profile1 = reactive<ProfileInterface>({
//   login: 'asdfloginaaq',
//   username: 'usernameq',
//   password: 'stasdf100q',
//   email: 'asdf125q@gmail.com',
//   phone: '+19995550102',
// });
</script>

<!-- <template>
  <div class="auth-layout">
    <div>Symbol</div>
    <div class="login-1">
      <div class="login-2">
        <h1 class="login-title">Register new Account</h1>
        <p class="login-title-description">
          See what is going on with your business
          </p>
      </div>

      <div>
        <div>
          <div>
            <div>Имя пользователя</div>
            <input class="data-input" type="text" placeholder="mail@abc.com" />
          </div>
          
          <div>
            <div>Логин</div>
            <input
              class="data-input"
              type="text"
              placeholder="****************"
            />
          </div>

          <div>
            <div>Пароль</div>
            <input
              class="data-input"
              type="text"
              placeholder="****************"
            />
          </div>
          <div>Remember Me</div>
          <div>
            <router-link to="/forgot">Forgot Password?</router-link>
          </div>
        </div>

        <div class="login-button">
          <button class="login">Login</button>
        </div>
      </div>

      <div class="content"></div>
    </div>

    <div class="create-account">
      <router-link to="/register">
        Not Registered Yet? Create an account</router-link
      >
    </div>
  </div>
</template>

<script lang="ts" setup></script> -->

<!-- <style lang="scss" scoped>
// input {
//   max-width: 100%;
// }

.auth-layout {
  margin: 0 auto;
  max-width: 420px;
  text-align: center;

  .remember-forgot {
    display: flex;
    // column надо сделать
    justify-content: space-around;
  }
  .login-button {
    max-width: 100%;
    max-height: 50px;
  }
  .login-1 {
    border: 1px solid blueviolet;
    display: flex;
    flex-direction: column;
    gap: 36px;
  }
  .login-2 {
    gap: 3px;
    display: flex;
    flex-direction: column;
    // стоит ли добавлять flex, wrap и тд ради гап, если можно просто margin-bottom
    .login-title {
      all: unset;
      font-size: 36px;
    }
    .login-title-description {
      all: unset;
    }
  }
  .create-account {
    margin-top: 317px;
  }
  .data-input {
    width: 100%;
  }
}
</style> -->
