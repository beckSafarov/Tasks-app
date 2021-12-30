import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import { PreferencesContext } from '../Context/PreferencesContext'
import { TagsContext } from '../Context/TagsContext'
import { TasksContext } from '../Context/TasksContext'

export const useAppContext = () => useContext(AppContext)
export const useTasksContext = () => useContext(TasksContext)
export const useTagsContext = () => useContext(TagsContext)
export const usePrefsContext = () => useContext(PreferencesContext)
