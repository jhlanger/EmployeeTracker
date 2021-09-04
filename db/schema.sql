/* mysql -u root -p */

DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS title;

CREATE TABLE title (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  department VARCHAR(50) NOT NULL,
  salary INTEGER,
  manager VARCHAR(30)
);


CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  title_id INTEGER,
  CONSTRAINT fk_dept FOREIGN KEY(title_id) REFERENCES title(id)
);

/*
CONSTRAINT fk_dept FOREGN KEY(title_id) REFERENCES title(id)
*/

/* query to join party values into candidates
SELECT candidates.*, parties.name
FROM candidates
LEFT JOIN parties ON candidates.party_id = parties.id;


SELECT candidates.*, parties.name AS party_name
FROM candidates
LEFT JOIN parties ON candidates.party_id = parties.id;
*/
