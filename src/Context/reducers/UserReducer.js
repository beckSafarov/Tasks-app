import produce from 'immer'

const UserReducer = produce((draft, action) => {
  switch (action.type) {
    case 'set':
      draft.user = action.user
      break
    default:
      return draft
  }
})

export default UserReducer
