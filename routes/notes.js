const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the saved notes
notes.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) =>
        res.json(JSON.parse(data)))
);

// POST Route for submitting notes
notes.post('/', (req, res) => {
    // Destructuring the req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        const newTask = {
            title,
            text,
            id: uuidv4(),
        };
        console.log(newTask);

        readAndAppend(newTask, './db/db.json');

        const response = {
            status: 'success',
            body: newTask,
            message: `💾 Task with ID ${newTask.id} saved successfully.`
        };

        res.json(response);
        console.log(`\x1b[36m   ${response.message} \x1b[0m`);
    } else {
        res.json('Error in posting task');
    }
});

// Delete Route for deleting notes
notes.delete('/:id', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        const selectedTaskId = req.params.id;
        const tasks = JSON.parse(data);
        const updatedTasks = tasks.filter((task) => task.id !== selectedTaskId)
        writeToFile('./db/db.json', updatedTasks);
        const response = {
            status: 'success',
            message: `  🗑️ Task with ID ${selectedTaskId} deleted successfully.`,
        };
        res.json(response);
        console.log('\x1b[31m' + response.message + '\x1b[0m')

    });
});

module.exports = notes;

