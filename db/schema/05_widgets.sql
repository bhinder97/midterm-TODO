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
  (1, 'Romeo and Juliet', 'Books (To read)'),
  (1, 'Pizza', 'Restaurants, cafes, etc. (To eat)'),
  (1, 'Avenger', 'Film / Series (To watch)'),
  (4,'United Kingdom','film,'),
  (4,'New Zealand','music'),
  (2,'Philippines','food'),
  (3,'Belgium','travel'),
  (2,'Belgium','cooking');
