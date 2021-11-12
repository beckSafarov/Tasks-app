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

const provider = new GoogleAuthProvider()
const auth = getAuth()

const signIn = () => signInWithRedirect(auth, provider)

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
  onAuthStateChanged(auth, (user) => {
    console.log(user)
    return user ? user : false
  })
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

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log(user)
//   } else {
//     console.log('not logged')
//   }
// })

export { signIn, emailSignUp, emailSignIn, getCurrUser, logout }
