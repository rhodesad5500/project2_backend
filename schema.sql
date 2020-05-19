DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	due DATE,
	task TEXT,
	is_deleted INT DEFAULT 0
);
