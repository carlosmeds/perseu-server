import admin from "firebase-admin";

const fcm = require("fcm-notification");
const serviceAccount = require("./firebase-keys.json");

export const firebaseApp = new fcm(admin.credential.cert(serviceAccount));