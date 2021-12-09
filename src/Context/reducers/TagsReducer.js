import produce from 'immer'

const TagsReducer = produce((draft, action) => {
  switch (action.type) {
    case 'set':
      draft.tags = [...draft.tags, ...action.tags]
      break
    case 'add':
      draft.tags.push(action.tag)
      break
    case 'update':
      for (let tag in draft.tags) {
        if (tag.name === action.currTag) {
          tag.name = action.newTag
        }
      }
      break
    case 'remove':
      draft.tags = draft.tags.filter((t) => t.name !== action.tag)
      break
    default:
      return draft
  }
})

export default TagsReducer
