const { RESTDataSource } = require('apollo-datasource-rest');

class TodoAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://9pfinhxi47.execute-api.us-east-2.amazonaws.com/prod/';
    }
    async getAllTodos() {
        const response = await this.get('todos');
        return response.Count
            ? response.Items.map(todo => this.todoReducer(todo))
            : [];
    }

    async getTodoById({ todoId }) {
        const response = await this.get('todos/' + todoId);
        if (!response.Item) return {};
        return this.todoReducer(response.Item);
    }

    async newTodo(todo) {
        const response = await this.post(
            'todos',
            todo
        );
        return response;
    }
    async updateTodo(todo) {
        const response = await this.put(
            'todos/' + todo.id,
            {
                title: todo.title,
                description: todo.description
            }
        );
        return response;
    }

    async deleteTodo({ todoId }) {
        const response = await this.delete('todos/' + todoId);
        return response;
    }

    todoReducer(todo) {
        return {
            id: todo.id.S,
            title: todo.title.S,
            description: todo.description.S
        };
    }
}


module.exports = TodoAPI;