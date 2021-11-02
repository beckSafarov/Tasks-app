import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signinWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth'
import { app } from './config'

const provider = new GoogleAuthProvider()
const auth = getAuth()

const signIn = () => signInWithRedirect(auth, provider)

getRedirectResult(auth)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    const user = result.user
    console.log(user)
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    const email = error.email
    const credential = GoogleAuthProvider.credentialFromError(error)
    console.log(error)
  })

// signinWithPopup(auth, provider).then(res=>{
//   const credential = GoogleAuthProvider.credentialFromResult(result)
//   const token = credential.accessToken
//   const user = result.user
//   console.log(user)
// }).catch(error=>{
//   const errorCode = error.code
//   const errorMessage = error.message
//   const email = error.email
//   const credential = GoogleAuthProvider.credentialFromError(error)
// })

onAuthStateChanged(auth, (user) => {
  function onLogin() {
    console.log(user)
  }
  function onNotLogged() {
    console.log('user is not logged in')
  }
  return user ? onLogin() : onNotLogged()
})

export { signIn }
