const filterTasksByCompletion = (tasks, completed) => {
    if (completed !== undefined) {
      const isCompleted = completed.toLowerCase() === 'true';
      return tasks.filter(task => task.completed === isCompleted);
    }
    return tasks;
  };

const sortTasksByCreatedAt = (tasks, sortOrder) => {
    if (sortOrder === 'createdAt:desc') {
        return tasks.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortOrder === 'createdAt:asc') {
        return tasks.sort((a, b) => a.createdAt - b.createdAt);
    }
    return tasks;
};
  
module.exports = {
    filterTasksByCompletion,
    sortTasksByCreatedAt,
  };