const useTasksMethods = (setTasks) => {
  const addTask = (task) => {
    setTasks((tasks) => [...tasks, task])
  }

  const updateTasks = (updates, prop, propVal) => {
    setTasks((tasks) =>
      tasks.map((t) => (t[prop] === propVal ? { ...t, ...updates } : t))
    )
  }

  const removeTasks = (prop, propVal) => {
    setTasks((tasks) => tasks.filter((t) => t[prop] !== propVal))
  }

  return { addTask, updateTasks, removeTasks }
}

export default useTasksMethods
