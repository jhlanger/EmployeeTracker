INSERT INTO departments(department)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');




INSERT INTO title (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Accounting Lead',150000, 3),
  ('Accountant',125000, 3),
  ('Legal Team Lead', 250000, 4),
  ('Lawyer', 190000, 4);
 
INSERT INTO employees (first_name, last_name, title_id, department_id, supervisor)
VALUES
  ('Ronald', 'Firbank', 1, 1,'Piers Gaveston'),
  ('Virginia', 'Woolf', 2, 1, 'Ronald Firbank'),
  ('Piers', 'Gaveston', 3, 2, NULL),
  ('Charles', 'LeRoi', 4, 2,'Piers Gaveston'),
  ('Katherine', 'Mansfield', 5, 3, NULL),
  ('Dora', 'Carrington', 6, 3,'Katherine Mansfield' ),
  ('Edward', 'Bellamy', 7, 4, NULL),
  ('Montague', 'Summers', 8, 4, 'Edward Bellamy'),
  ('Octavia', 'Butler', 2, 1, 'Ronald Firbank'),
  ('Unica', 'Zurn', 4, 2, 'Piers Gaveston');

  