import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { app } from './config'

const google = new GoogleAuthProvider()
const auth = getAuth(app)

const defUser = {
  displayName: '',
  email: '',
  password: '',
  providerId: {},
}

const signInWithGoogle = () => signInWithRedirect(auth, google)

const emailSignUp = ({ email, password }) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      return { success: true, user }
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      return { success: false, errorCode, errorMessage }
    })

const emailSignIn = ({ email, password }) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      return { success: true, user }
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      return { success: false, errorCode, errorMessage }
    })

const getCurrUser = () => {
  if (auth.currentUser) return auth.currentUser
  let user = null
  onAuthStateChanged(auth, (u) => {
    user = u ? u : false
  })
  return user
}

const logout = async () => {
  try {
    await signOut(auth)
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

export {
  defUser,
  signInWithGoogle,
  emailSignUp,
  emailSignIn,
  getCurrUser,
  logout,
}
