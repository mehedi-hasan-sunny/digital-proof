import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDXm4myA3zs5J70e8EhnkTBXvaKnIAoJJ0",
	authDomain: "digital-proof-7e1ef.firebaseapp.com",
	projectId: "digital-proof-7e1ef",
	storageBucket: "digital-proof-7e1ef.appspot.com",
	messagingSenderId: "903541130102",
	appId: "1:903541130102:web:60202b6f2f2fbd32803057"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);