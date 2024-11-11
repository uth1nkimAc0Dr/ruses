export type UserRegistration = {
  login: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}; // Регистрация юзера

export type AuthData = {
  login: string;
  password: string;
}; // аутентификация юзера

export type RefreshToken = {
  refreshToken: string;
}; // обновление токена доступа

export type Profile = {
  id: number;
  username: string;
  email: string;
  date: string;
  isBlocked: boolean;
  isAdmin: boolean;
  phoneNumber: string;
}; // возвращает профиль аутентифицированного юзера

export type ProfileRequest = {
  username: string;
  email: string;
  phoneNumber: string;
}; // обновляет профиль юзера новыми данными

export type PasswordRequest = {
  password: string;
}; // обновляет пароль юзера

// export type Token = {
//   access: string;
//   refresh: string;
// }; //делает токены юзера невалидными

export type Token = {
  accessToken: string;
  refreshToken: string;
}; //делает токены юзера невалидными
