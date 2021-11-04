import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signinWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from 'firebase/auth'
import { app } from './config'

const provider = new GoogleAuthProvider()
const auth = getAuth()

const signIn = () => signInWithRedirect(auth, provider)

const logout = async () => {
  try {
    await signOut(auth)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

getRedirectResult(auth)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    const user = result.user
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
    const email = error.email
    const credential = GoogleAuthProvider.credentialFromError(error)
  })

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user)
  } else {
    console.log('not logged')
  }
})

export { signIn, logout }

/**
   * signinWithPopup(auth, provider).then(res=>{
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    const user = result.user
    console.log(user)
  }).catch(error=>{
    const errorCode = error.code
    const errorMessage = error.message
    const email = error.email
    const credential = GoogleAuthProvider.credentialFromError(error)
  })
   */
