import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAskCdP8hDL7F9xl8dlrz6EgrGCyWvTcbA",
  authDomain: "project-management-a0b4a.firebaseapp.com",
  projectId: "project-management-a0b4a",
  storageBucket: "project-management-a0b4a.appspot.com",
  messagingSenderId: "438877652778",
  appId: "1:438877652778:web:91c576875475a4f0dd0053",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
