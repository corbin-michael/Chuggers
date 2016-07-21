// Initialize Firebase
var config = {
    apiKey: "AIzaSyAscTI05Id9bLCy6S_xc1-2tLY1gMnKsvY",
    authDomain: "chuggers-ad93e.firebaseapp.com",
    databaseURL: "https://chuggers-ad93e.firebaseio.com",
    storageBucket: "",
};
firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();
