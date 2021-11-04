import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  doc,
  deleteDoc,
  runTransaction,
} from 'firebase/firestore'
const db = getFirestore()

/**
 * @param listName: String
 * @param value: Obj
 * @returns Obj|false
 */
const addToDB = async (listName = 'tasks', value = {}) => {
  if (listName) {
    try {
      const docRef = await addDoc(collection(db, listName), value)
      return docRef
    } catch (err) {
      return false
    }
  }
}

/**
 * @param listName:String
 * @param id:String
 * @param predicate:Object
 * @returns Object
 */
const updateInDB = async (listName, id, predicate = {}) => {
  const sfDocRef = doc(db, listName, id)
  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef)
      if (!sfDoc.exists()) {
        return { success: false, msg: 'Does not exist!' }
      }
      transaction.update(sfDocRef, predicate)
      return { success: true }
    })
  } catch (e) {
    return { success: false, msg: e }
  }
}

/**
 * @param id:String
 * @returns <Promise>
 */
const removeFromDB = async (id) => await deleteDoc(doc(db, 'tasks', id))

/**
 * @param listName:String
 * @returns res:Array
 */
const getFromDB = async (listName = 'tasks') => {
  let res = []
  const querySnapshot = await getDocs(collection(db, listName))
  querySnapshot.forEach((doc) => {
    res.push({
      ...doc.data(),
      id: doc._key.path.toString().split('/')[1],
    })
  })
  return res
}

/**
 * @param tag:String
 * @returns res:Array
 */
const getTasksByTag = async (tag) => {
  let res = []
  const q = query(collection(db, 'tasks'), where('tag', '==', tag))

  await getDocs(q).forEach((doc) => res.push(doc.data()))
  return res
}

export { addToDB, getFromDB, updateInDB, getTasksByTag, removeFromDB }
