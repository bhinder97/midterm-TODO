-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO users (name, email, password)
VALUES
  ('test', 'test@test.com', 'test'),
  ('Hayfa Rice','sagittis.felis@protonmail.ca','Soz8'),
  ('Caesar Wilkerson','suspendisse@icloud.org','Cez0'),
  ('Akeem Boyer','vulputate@aol.net','Ofz6'),
  ('Harper Myers','erat.eget@yahoo.edu','Cnz7'),
  ('Yara Frank','sem@hotmail.edu','Hlz2');
