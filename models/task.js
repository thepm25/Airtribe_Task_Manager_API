class Task {
    constructor(id, title, description, completed, priority) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.completed = completed;
      this.priority = priority;
      this.createdAt = this.createdAt;
    }
  }
  
  module.exports = Task;