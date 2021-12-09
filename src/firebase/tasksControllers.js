import { getAuth } from '@firebase/auth'
import { setDoc, getFirestore, doc, Timestamp } from 'firebase/firestore'
import { app, dataSchema } from './config'
import { succRes, errRes, getUserData, removeTaskOrTag } from './controllers'
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
    if (task.dueDate) {
      task.dueDate = Timestamp.fromDate(new Date(task.dueDate.toDate()))
    }
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
    if (predicate.dueDate) {
      predicate.dueDate = Timestamp.fromDate(
        new Date(predicate.dueDate.toDate())
      )
    }
    data.tasks = data.tasks.map((t) =>
      t[prop] === propVal ? { ...t, ...predicate } : t
    )
    await setDoc(doc(db, 'tasks', auth.currentUser.uid), data)
    return data.tasks
  } catch (err) {
    return err
  }
}

/**
 * @desc update a task based on the id
 * @param id:String -- id of the task
 * @param predicate:Object - updating value pairs
 * @returns Object: {success: Boolean, message/tasks: ''/[]}
 */
const updateTask = async (id, predicate = {}) => {
  try {
    return await updateOneOrMore('id', id, predicate)
  } catch (err) {
    return err
  }
}

/**
 * @desc updates multiple tasks with the same tag
 * @param currTag -- current tag to be identified by
 * @param newTag -- the new tag to be renamed to
 * @returns {success: Boolean, error/data: }
 */
const updateTaskTags = async (currTag, newTag) => {
  try {
    return await updateOneOrMore('tag', currTag, { tag: newTag })
  } catch (err) {
    return err
  }
}

/**
 * @desc remove a task from tasks array
 * @param id: String id of the task
 * @returns Object {success, tasks}
 */
const removeTask = async (id) => {
  try {
    return await removeTaskOrTag(id)
  } catch (err) {
    return err
  }
}

/**
 * @desc removes tasks by tag
 * @param tag to be deleted by
 * @returns Object with results
 */
const removeTasksByTag = async (tagName) => {
  try {
    return await removeTaskOrTag(tagName, 'tasks', 'tag')
  } catch (err) {
    return err
  }
}

export {
  addTaskToDB,
  updateTask,
  updateTaskTags,
  getUserData,
  removeTask,
  removeTasksByTag,
}
