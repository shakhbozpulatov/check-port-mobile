// plugins/firebase.js
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyDDBNxLqISqT3uhqaBYrDD1MMmPYuJueD4',
    authDomain: 'shining-berm-417220.firebaseapp.com',
    projectId: 'shining-berm-417220',
    storageBucket: 'shining-berm-417220.appspot.com',
    messagingSenderId: '673090903165',
    appId: '1:673090903165:web:7f0cd47a0e21db276fe514',
    measurementId: 'G-X97Z7BNYJ6',
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)
  const auth = getAuth(app)
  return {
    provide: {
      firebaseAuth: auth,
    },
  }
})
