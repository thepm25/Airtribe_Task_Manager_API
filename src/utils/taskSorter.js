class TaskSorter {
    static sortByPriority(tasks, priorityOrder) {
      return tasks.slice().sort((a, b) => {
        return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
      });
    }
  
    static sortByCreatedAtDesc(tasks) {
      return tasks.slice().sort((a, b) => b.createdAt - a.createdAt);
    }
  }
  
  module.exports = TaskSorter;
  