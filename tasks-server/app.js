const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToObject(row) {
	return {
		id: row.id,
		due: row.due,
		task: row.task
	};
}




app.get('/tasks/:due', (request, response) => {
	const query = 'SELECT task, due, id FROM tasks WHERE is_deleted = 0 AND due <= ? ORDER BY due ASC';
	const params = [request.params.due];
	connection.query(query, params, (error, rows) => {
		response.send({
			ok: true,
			tasks: rows.map(rowToObject)
		});
	});
});

app.post('/tasks', (request, response) => {
	const query = 'INSERT INTO tasks(due, task) VALUES (?, ?)';
	const params = [request.body.due, request.body.task];
	connection.query(query, params, (error, result) => {
		response.send({
			ok: true,
			id: result.insertId
		});
	});
});

app.patch('/tasks/:id', (request, response) => {
	const query = 'UPDATE tasks SET due = ?, task = ? WHERE id = ?';
	const params = [request.body.due, request.body.task, request.params.id];
	connection.query(query, params, (error, result) => {
		response.send({
			ok: true
		});
	});
});

app.delete('/tasks/:id', (request, response) => {
	const query = 'UPDATE tasks SET is_deleted = 1 WHERE id = ?';
	const params = [request.params.id];
	connection.query(query, params, (error, result) => {
		response.send({
			ok: true
		});
	});
});



const port = 3443;
app.listen(port, () => {
	console.log(`We're live on port ${port}!`);
});
