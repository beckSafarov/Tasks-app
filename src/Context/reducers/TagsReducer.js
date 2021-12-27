import produce from 'immer'

const TagsReducer = produce((draft, action) => {
  switch (action.type) {
    case 'loading':
      draft.loading = !draft.loading
      break
    case 'error':
      draft.error = action.error
      break
    case 'set':
      draft.tags = action.tags
      break
    case 'add':
      draft.tags.push(action.tag)
      break
    case 'update':
      draft.tags = draft.tags.map((t) =>
        t.tag === action.currTag ? { ...t, tag: action.newTag } : t
      )
      console.log(draft.tags)
      break
    case 'remove':
      draft.tags = draft.tags.filter((t) => t.tag !== action.tag)
      break
    default:
      return draft
  }
})

export default TagsReducer
