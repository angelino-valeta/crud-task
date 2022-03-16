const express = require('express');
// CONNECT DB
const mongoose = require('./database/database');
const app = express();


// MODELS
const TaskList = require('./database/models/taskList');
const Task = require('./database/models/task');

// CORS
app.use(function(req, res, next){

	res.setHeader('Access-Control-Allow-Origin', '*');

	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, PATCH, DELETE');

	res.header('Access-Control-Allow-Headers', 'Content-Type');

	next();
});

// BODY PARSER
app.use(express.json());

// ENDPOINTS
	// TASKLISTS
app.get('/tasklists', (req, res) => {
	TaskList.find({})
		.then((tasklist) => {
			res.status(200).send(tasklist);
		})
		.catch((error) => {
			res.status(500);
			console.log(error);
		})
});

app.post('/tasklists', (req, res) => {
	const body = {title: req.body.title};

	TaskList(body).save()
		.then((taskList) => {
			res.status(201).send(taskList);
		})
		.catch((error) => {
			res.status(500);
			console.log(error);
		})

	res.status(201).send(body);
});

app.get('/tasklists/:id', (req, res) => {
	TaskList.find({_id: req.params.id })
		.then((taskList) => {
				res.status(200).send(taskList);
		})
		.catch((error) => {
			res.status(500);
			console.log(error);
		});
});
	
app.patch('/tasklists/:id', (req, res) => {
	const id = req.params.id;

	const body = req.body

	TaskList.findOneAndUpdate({ _id: id }, {$set: body})
	.then((taskList) => {
		res.status(200).send(taskList);
	})
	.catch((error) => {
		res.status(500);
		console.log(error);
	})
});


app.put('/tasklists/:id', (req, res) => {
	const id = req.params.id
	const body = {title: req.body.title}
	TaskList.findOneAndUpdate({_id: id}, {$set: body})
	.then((taskList) => {
		res.status(200).send(taskList);
	})
	.catch((error) => {
		res.status(500);
		console.log(error);
	})
});


app.delete('/tasklists/:id', (req, res) => {
	const id = req.params.id;
	TaskList.findOneAndDelete({_id: id})
		.then((taskList) => {
			res.status(200).send(taskList);
		})
		.catch((error) => {
			res.status(500);
			console.log(error);
		});
});


// TASK

app.get('/tasklists/:tasklistsid/tasks', (req, res) => {
	Task.find({_taskListId: req.params.tasklistsid})
		.then((tasks) => {
			res.status(200).send(tasks);
		})
		.catch((error) => {
			res.status(500);
			console.log(error);
		});
});

app.post('/tasklists/:tasklistsid/tasks', (req, res) => {
	const body = {title: req.body.title, _taskListId: req.params.tasklistsid }
	Task(body).save()
		.then((task) => {
			res.status(200).send(task);
		})
		.catch((error) => {
			res.status(500);
			console.log(error);
		});
});

app.get('/tasklists/:tasklistsid/tasks/:taskid', (req, res) => {
	Task.find({ _taskListId: req.params.tasklistsid, _id: req.params.taskid })
		.then((tasks) => {
			res.status(200).send(tasks);
		})
		.catch((error) => {
			res.status(500);
			console.log(error);
		});
});

app.patch('/tasklists/:tasklistsid/tasks/:taskid', (req, res) => {
	Task.findOneAndUpdate({_taskListId: req.params.tasklistsid, _id: req.params.taskid}, {$set: req.body })
		.then((task) => {
			res.status(200).send(task);
		})
		.catch((error) => {
			res.status(500);
			console.log(error);
		});
});

app.put('/tasklists/:tasklistid/tasks/:taskid', (req, res) => {
	Task.findOneAndUpdate({_taskListId: req.params.tasklistid, _id: req.params.taskid }, {$set: req.body })
		.then((task) => {
			res.status(200).send(task);
		})
		.catch((error) => {
			res.status(500);
			console.log(error);
		});
});

app.delete('/tasklists/:tasklistsid/tasks/:taskid', (req, res) => {
	Task.findOneAndDelete({ _taskListId: req.params.tasklistsid, _id: req.params.taskid })
		.then((task) => {
			res.status(200).send(task);
		})
		.catch((error) => {
			res.status(500);
			console.log(error);
		});
});

 
app.listen(3000, () => { console.log('Server running on port 3000!')});