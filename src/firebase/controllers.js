import { getAuth, updateProfile, updatePassword } from '@firebase/auth'
import { getDoc, setDoc, getFirestore, doc } from 'firebase/firestore'
import { updateEmail } from 'firebase/auth'
import { app } from './config'
const db = getFirestore(app)
const auth = getAuth()
const succRes = (data) => ({ success: true, data })
const errRes = (error) => ({ success: false, error })

/**
 * @desc method to get the logged user's info
 * @param (optional) fallBack:Object
 * @returns object with data or empty object
 */
const getUserData = async (fallBack = {}, uid) => {
  const docRef = doc(db, 'tasks', uid || auth.currentUser.uid)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? docSnap.data() : fallBack
}

/**
 * @desc update the whole current user data
 * @param newData -- Object containing the updates. E.g. {tasks: []}
 * @param currData -- (optional) current user data. If passed it will save time from requesting data again from the db
 * @returns updated user data Object
 */
const setUserData = async (newData = {}, currData) => {
  const data = currData || (await getUserData())
  const updatedData = { ...data, ...newData }
  await setDoc(doc(db, 'tasks', auth.currentUser.uid), updatedData)
  return updatedData
}

const setList = async (newList, list = 'tasks') => {
  if (!newList) return false
  const data = await getUserData()
  data[list] = newList
  await setDoc(doc(db, 'tasks', auth.currentUser.uid), data)
  return data[list]
}

/**
 * @desc updates the current user
 * @param up:Object
 * @returns Object
 */
const updateCurrUser = async (up = {}) => {
  const updates = { ...up }
  const successRes = { success: true }
  const errorRes = (e) => ({ success: false, message: e.message })

  const emailUpdate = () =>
    updateEmail(auth.currentUser, updates.email)
      .then(() => successRes)
      .catch((e) => errorRes(e))

  const passUpdate = () =>
    updatePassword(auth.currentUser, updates.password)
      .then(() => successRes)
      .catch((e) => errorRes(e))

  const profileUpdate = () => {
    updateProfile(auth.currentUser, updates)
      .then(() => successRes)
      .catch((e) => errorRes(e))
  }

  if (updates.email) {
    const res = await emailUpdate()
    if (!res.success) return res
    delete updates.email
  }
  if (updates.password) {
    const res = await passUpdate()
    if (!res.success) return res
    delete updates.password
  }
  if (Object.keys(updates).length > 1) {
    const res = await profileUpdate()
    if (!res.success) return res
  }
  return successRes
}

const updateTagAndTasks = async (currTag, newTag, userData) => {
  const data = userData || (await getUserData())
  data.tags = data.tags.map((t) =>
    t.tag === currTag ? { ...t, tag: newTag } : t
  )
  data.tasks = data.tasks.map((t) =>
    t.tag === currTag ? { ...t, tag: newTag } : t
  )
  console.log(data)
  await setDoc(doc(db, 'tasks', auth.currentUser.uid), data)
  return data
}

/**
 * @desc removes a task or a tag from the db, by default a task
 * @param key - identifier, such as id or tag value of the object
 * @param group - tasks|tags
 * @param prop - prop by which the object should be deleted: id|tag
 * @returns Object - {success: Boolean, error/tasks}
 */
const removeTaskOrTag = async (key, group = 'tasks', prop = 'id') => {
  try {
    const data = await getUserData()
    const initSize = data[group].length
    data[group] = data[group].filter((t) => t[prop] !== key)
    if (data[group].length === initSize) {
      return errRes(
        `${
          group === 'tasks' ? 'Task' : 'Tag'
        } with the ${prop} of "${key}" not found`
      )
    }
    await setDoc(doc(db, 'tasks', auth.currentUser.uid), data)
    return data[group]
  } catch (err) {
    return err
  }
}

export {
  succRes,
  errRes,
  getUserData,
  updateCurrUser,
  updateTagAndTasks,
  removeTaskOrTag,
  setUserData,
  setList,
}
