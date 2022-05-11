-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
<<<<<<< HEAD
=======
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  task VARCHAR(255) NOT NULL,
  category TEXT
>>>>>>> 13e1702961e59172f0929858e2a2cca4fa7450a8
);

INSERT INTO users (name, email, password)
VALUES
  ('test', 'test@test.com', 'test'),
  ('Hayfa Rice','sagittis.felis@protonmail.ca','Soz8'),
  ('Caesar Wilkerson','suspendisse@icloud.org','Cez0'),
  ('Akeem Boyer','vulputate@aol.net','Ofz6'),
  ('Harper Myers','erat.eget@yahoo.edu','Cnz7'),
  ('Yara Frank','sem@hotmail.edu','Hlz2');
