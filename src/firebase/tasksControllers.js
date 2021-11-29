import { getAuth } from '@firebase/auth'
import { setDoc, getFirestore, doc } from 'firebase/firestore'
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
  const data = await getUserData(dataSchema)
  data.tasks.push(task)
  await setDoc(doc(db, 'tasks', auth.currentUser.uid), data)
  return data.tasks
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
    return succRes(data.tasks)
  } catch (err) {
    return errRes(err)
  }
}

/**
 * @desc update a task based on the id
 * @param id:String -- id of the task
 * @param predicate:Object - updating value pairs
 * @returns Object: {success: Boolean, message/tasks: ''/[]}
 */
const updateTask = async (id, predicate = {}) => {
  return await updateOneOrMore('id', id, predicate)
}

/**
 * @desc updates multiple tasks with the same tag
 * @param currTag -- current tag to be identified by
 * @param newTag -- the new tag to be renamed to
 * @returns {success: Boolean, error/data: }
 */
const updateTaskTags = async (currTag, newTag) => {
  return await updateOneOrMore('tag', currTag, { tag: newTag })
}

/**
 * @desc remove a task from tasks array
 * @param id: String id of the task
 * @returns Object {success, tasks}
 */
const removeTask = async (id) => await removeTaskOrTag(id)

/**
 * @desc removes tasks by tag
 * @param tag to be deleted by
 * @returns Object with results
 */
const removeTasksByTag = async (tagName) =>
  await removeTaskOrTag(tagName, 'tasks', 'tag')

export {
  addTaskToDB,
  updateTask,
  updateTaskTags,
  getUserData,
  removeTask,
  removeTasksByTag,
}
