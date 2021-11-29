import { getAuth } from '@firebase/auth'
import { setDoc, getFirestore, doc } from 'firebase/firestore'
import { app, dataSchema } from './config'
import { succRes, getUserData, removeTaskOrTag } from './controllers'
const db = getFirestore(app)
const auth = getAuth()

/**
 * @desc add tag to db
 * @param tagData -- Object containing id and name of the tag
 * @tagData {id: 'ewfwefw', tag: 'efewfew'}
 * @returns updated tags array
 */
const addTagToDB = async (tagData) => {
  const data = await getUserData(dataSchema)
  data.tags.push(tagData)
  await setDoc(doc(db, 'tasks', auth.currentUser.uid), data)
  return data.tags
}

/**
 * @desc updates tag name
 * @param id of the tag, newName of the tag
 * @returns {success: Boolean, error/tasks:...}
 */
const updateTagName = async (id, newName) => {
  const data = await getUserData()
  data.tags = data.tags.map((t) => (t.id === id ? { id, tag: newName } : t))
  await setDoc(doc(db, 'tasks', auth.currentUser.uid), data)
  return succRes(data.tags)
}

const removeTag = async (id) => await removeTaskOrTag(id, 'tags')

export { addTagToDB, updateTagName, removeTag }
