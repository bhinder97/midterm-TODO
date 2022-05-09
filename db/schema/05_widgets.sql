-- Drop and recreate Widgets table (Example)
DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  task VARCHAR(255) NOT NULL,
  category TEXT
);

INSERT INTO tasks (users_id , task , category)
VALUES
  (1, 'Task 1 test', 'Task 1 cat'),
  (1, 'Task 2 test', 'Task 2 cat'),
  (1, 'Task 3 test', 'Task 3 cat'),
  (4,'United Kingdom','film,'),
  (4,'New Zealand','music'),
  (2,'Philippines','food'),
  (3,'Belgium','travel'),
  (2,'Belgium','cooking');
