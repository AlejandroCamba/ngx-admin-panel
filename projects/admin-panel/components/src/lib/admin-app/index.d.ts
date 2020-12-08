import { Type } from '@angular/core';

type FormValues = {
  labelName: string,
  controlName: string,
}

type LoginInstace = {
  username: FormValues,
  password: FormValues,
}

type LazyComponent<T> = {
  component: Type<T>,
  loginRoute?: false,
  instance?: any
} | {
  component: Type<T>,
  loginRoute: true,
  instance: LoginInstace
};