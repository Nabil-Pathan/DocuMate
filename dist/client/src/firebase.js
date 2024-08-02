"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_WRlx0rrdbDhz6CRcep9oAdf2V8U1M8s",
    authDomain: "mern-auth-3e07d.firebaseapp.com",
    projectId: "mern-auth-3e07d",
    storageBucket: "mern-auth-3e07d.appspot.com",
    messagingSenderId: "464949371090",
    appId: "1:464949371090:web:732c5b269e8ef5fa1a8d0b"
};
// Initialize Firebase
exports.app = (0, app_1.initializeApp)(firebaseConfig);
