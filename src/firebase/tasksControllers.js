import { getAuth } from '@firebase/auth'
import { setDoc, getFirestore, doc } from 'firebase/firestore'
import { app, dataSchema } from './config'
import { getUserData } from './controllers'
const db = getFirestore(app)
const auth = getAuth()

/**
 * @desc add a task object to the tasks array of the user
 * @param task object with task values
 * @returns updated array of tasks
 */
const addTaskToDB = async (task = {}) => {
  try {
    const data = await getUserData(dataSchema)
    data.tasks.push(task)
    await setDoc(doc(db, 'tasks', auth.currentUser.uid), data)
    return data.tasks
  } catch (error) {
    return error
  }
}

/**
 * @desc reusable method for updating one or more tasks by prop
 * @param prop - prop to update by: id|tag
 * @param propVal - value of the prop to update by
 * @param predicate -- object containing updated key value pairs
 * @returns {success: Boolean, error/data: }
 */
const updateOneOrMore = async (prop, propVal, predicate = {}) => {
  try {
    const data = await getUserData()
    data.tasks = data.tasks.map((t) =>
      t[prop] === propVal ? { ...t, ...predicate } : t
    )
    await setDoc(doc(db, 'tasks', auth.currentUser.uid), data)
    return data.tasks
  } catch (err) {
    return err
  }
}

export { addTaskToDB, updateOneOrMore }
