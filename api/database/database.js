const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/crudtask', {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => {
		console.log('Database connected Sucessfully!');
	})
	.catch((error) => {
		console.log('Error occurred while Datbasade connection ', error);
	});

module.exports = mongoose;