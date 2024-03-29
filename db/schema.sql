/* mysql -u root -p */

DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS title;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(30) NOT NULL
);

CREATE TABLE title (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  salary INTEGER,
  department_id INTEGER,
  CONSTRAINT fk_department FOREIGN KEY(department_id) REFERENCES departments(id) ON DELETE SET NULL
);


CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  title_id INTEGER,
  department_id INTEGER,
  supervisor VARCHAR(30),
  CONSTRAINT fk_title FOREIGN KEY(title_id) REFERENCES title(id) ON DELETE SET NULL, 
  CONSTRAINT fk_deparment FOREIGN KEY(department_id) REFERENCES departments(id) ON DELETE SET NULL
);
/*
 SELECT employees.first_name, employees.last_name FROM employees JOIN title ON employee.title_id = title.id JOIN departments ON departments.id = title.department_id;
*/

/* query to join party values into candidates
SELECT candidates.*, parties.name
FROM candidates
LEFT JOIN parties ON candidates.party_id = parties.id;


SELECT candidates.*, parties.name AS party_name
FROM candidates
LEFT JOIN parties ON candidates.party_id = parties.id;
*/
