import TodoList from "../models/todos.model.js";


export const getTodoList = async (req, res, next) => {
    console.log("todo")
    const userId = req.userId;
    const reqUser = req.params.userId;

    if (userId !== reqUser) {
        const error = new Error();
        error.message = "Unauthorized";
        error.code = 'C4444';
        return next(error);
    }



    try {
        const todos = await TodoList.findOne({ createdBy: userId });
        console.log(todos.list)
        return res.status(200).json(todos);
    }
    catch (err) {
        return next(err);
    }
}

export const addListing = async (req, res, next) => {


    const todo = req.body;
    const userId = req.userId;
    console.log(todo)
    console.log("Add listing")
    try {
        const listing = await TodoList.findOneAndUpdate({ createdBy: userId }, { $push: { list: { task: todo.title, completed: false, deadline: todo.deadline, createdAt: todo.createdAt, estimatedTime: todo.estimatedTime, repeat: todo.repeat } } });
        console.log(listing);
        return res.status(200).json(listing);
    }
    catch (err) {
        return next(err);
    }
}

export const deleteListing = async (req, res, next) => {

    const userId = req.userId;
    const listingId = req.params.id;
    try {

        const updatedList = await TodoList.updateOne({ createdBy: userId }, { $pull: { list: { _id: listingId } } });
        return res.status(204);
    }
    catch (err) {
        next(err);
    }
}

export const editListing = async (req, rex, next) => {
    const userId = req.userId;
    const listingId = req.params.id;
    const todo = req.body;
    try {
        const update = {
            $set: {
                'list.$[list].task': todo.title,
                'list.$[list].completed': todo.completed,
                'list.$[list].deadline': todo.deadline,
                'list.$[list].estimatedTime': todo.estimatedTime,
                'list.$[list].repeat': todo.repeat
            }
        }
        const filter = {
            arrayFilters: [{ '_id': listingId }]
        }
        const updatedList = await TodoList.updateOne({ createdBy: userId }, update, filter);
        return res.status(200).json(updatedList);
    }
    catch (err) {
        return next(err);
    }
}