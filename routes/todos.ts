import { Router } from 'express';

import { Todo } from '../models/todo'; // for named import we need to mention the name of function that we want to import in '{}' brackets

type RequestBody = { text: String };
type RequestParams = { todoId: String };

let todos: Todo[] = []; // array type will be 'Todo' type

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json({todos: todos});
});

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody;
    const newTodo: Todo = { // the object type will be 'Todo' type, means the exact type what we mention in 'Todo' object
        id: new Date().toISOString(),
        text: body.text
    };

    todos.push(newTodo);
    return res.status(201).json({message: 'Added todo', todo: newTodo, todos: todos});
});

router.put('/todos/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    const tid = params.todoId;
    const body = req.body as RequestBody;

    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = {id: todos[todoIndex].id, text: body.text};
        return res.status(200).json({message: 'Updated todo', todos: todos});
    }
    res.status(404).json({message: 'Could not find the todo with this id.'});
});

router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    todos = todos.filter((todoItem) => todoItem.id !== params.todoId);
    return res.status(200).json({message: 'Deleted todo', todos: todos});
})

export default router;