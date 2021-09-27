import produce from 'immer'
import { renameProp, withoutProp } from '../helpers'
import { setStore as setTags } from '../helpers/tagsLCS'

const TagsReducer = produce((draft, action) => {
  let { tags } = draft
  switch (action.type) {
    case 'add':
      tags[action.tag] = action.id
      break
    case 'update':
      draft.tags = renameProp(tags, action.currTag, action.newTag)
      break
    case 'remove':
      draft.tags = withoutProp(tags, action.tag)
      break
    default:
      return draft
  }
  setTags(draft.tags)
})

export default TagsReducer
