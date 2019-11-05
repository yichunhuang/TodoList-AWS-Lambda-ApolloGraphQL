const TodoAPI = require('./todo.js');
const todoAPI = new TodoAPI();
todoAPI.initialize({ context:{} });


test('get all todos', async () => {
    const allTodos = await todoAPI.getAllTodos();
    expect(Array.isArray(allTodos)).toBe(true);
    allTodos.forEach(todo => {
        expect(Object.keys(todo).sort()).toEqual(['id', 'title', 'description'].sort());
    })
    allTodos.forEach(todo => {
        Object.values(todo).forEach(value => {
            expect(typeof value).toEqual('string');
        })
    })
});

test('get one todo by id', async () => {
    const allTodos = await todoAPI.getAllTodos();
    const id = allTodos[0].id;
    const todo = await todoAPI.getTodoById({todoId: id});
    expect(typeof todo === 'object' && todo !== null).toBe(true);

    if (Object.keys(todo).length == 0) return;
    expect(Object.keys(todo).sort()).toEqual(['id', 'title', 'description'].sort());
    Object.values(todo).forEach(value => {
        expect(typeof value).toEqual('string');
    })
});

test('create, update, then delete a todo', async () => {
    // Create
    const newTodo = {
        title: 'testNewTitleHaHa',
        description: 'testNewDescription'
    };
    const newResponse = await todoAPI.newTodo(newTodo);
    expect(Object.keys(newResponse).sort()).toEqual(['statusCode', 'body'].sort());
    expect(typeof newResponse.statusCode).toEqual('number');
    expect(typeof newResponse.body).toEqual('string');

    // Update
    const updateTodo = {
        id: newResponse.body,
        title: 'testUpdateTitle',
        description: 'testUpdateDescription'
    };
    const updateResponse = await todoAPI.updateTodo(updateTodo);
    expect(Object.keys(updateResponse).sort()).toEqual(['statusCode', 'body'].sort());
    expect(typeof updateResponse.statusCode).toEqual('number');
    expect(typeof updateResponse.body).toEqual('string');

    // Delete
    const deleteResponse = await todoAPI.deleteTodo({ todoId: newResponse.body });
    expect(Object.keys(deleteResponse).sort()).toEqual(['statusCode', 'body'].sort());
    expect(typeof deleteResponse.statusCode).toEqual('number');
    expect(typeof deleteResponse.body).toEqual('string');
});