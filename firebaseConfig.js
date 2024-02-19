import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {

  apiKey: "AIzaSyC73wswIG553eJBoQxc4HESjesbx3RAdOs",

  authDomain: "fir-activity-ac58d.firebaseapp.com",

  databaseURL: "https://fir-activity-ac58d.firebaseio.com",

  projectId: "fir-activity-ac58d",

  storageBucket: "fir-activity-ac58d.appspot.com",

  messagingSenderId: "922539553720",

  appId: "1:922539553720:web:1d45e54832c1ceaf18954d"

};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);