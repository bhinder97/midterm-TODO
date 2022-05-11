-- Users table seeds here (Example)
-- INSERT INTO users (name) VALUES ('Alice');
-- INSERT INTO users (name) VALUES ('Kira');

INSERT INTO users (name, email, password)
VALUES
  ('test', 'test@test.com', 'test'),
  ('Hayfa Rice','sagittis.felis@protonmail.ca','Soz8'),
  ('Caesar Wilkerson','suspendisse@icloud.org','Cez0'),
  ('Akeem Boyer','vulputate@aol.net','Ofz6'),
  ('Harper Myers','erat.eget@yahoo.edu','Cnz7'),
  ('Yara Frank','sem@hotmail.edu','Hlz2');


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
