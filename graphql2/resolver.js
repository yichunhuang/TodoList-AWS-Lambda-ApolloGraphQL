module.exports = {
    Query: {
        todos: (_, __, { dataSources }) =>
            dataSources.todoAPI.getAllTodos(),
        todo: (_, { id }, { dataSources }) =>
            dataSources.todoAPI.getTodoById({ todoId: id })
    },
    Mutation: {
        newTodo: (_, { title, description }, { dataSources }) => 
            dataSources.todoAPI.newTodo({ title, description }),
        updateTodo: (_, { id, title, description, isCompleted }, { dataSources }) => 
            dataSources.todoAPI.updateTodo({ id, title, description, isCompleted }),
        deleteTodo: (_, { id }, { dataSources }) => 
            dataSources.todoAPI.deleteTodo({ todoId: id }), 
    }
  };