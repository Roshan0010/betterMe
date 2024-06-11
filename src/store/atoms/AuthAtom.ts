/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from 'recoil';

interface SignupData {
  email: string;
  password: string;
  name: string;
  imageUrl?: string;
  faceTransformation?: any[];
  bodyTransformation?: any[]; 
  // ... any other fields
}
interface LoginData {
  email: string;
  password: string;
  // ... any other fields
}

export const signupData = atom<SignupData>({
  key: 'signupData', // unique ID (with respect to other atoms/selectors)
  default: {
    email: '',
    password: '',
    name: '',
    imageUrl: '',
    faceTransformation: [],
    bodyTransformation: [] 
  }, // default value (aka initial value)
});

export const loginData = atom<LoginData>({
  key: 'loginData', // unique ID (with respect to other atoms/selectors)
  default: {
    email: '',
    password: '',
  }, // default value (aka initial value)
});
export const loginFlag=atom<boolean>({
  key:'loginFlag',
  default: true
})