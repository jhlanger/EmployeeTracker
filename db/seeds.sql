INSERT INTO departments(department)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');




INSERT INTO title (title, salary, manager)
VALUES
  ('Sales Lead', 100000, 'Piers Gaveston'),
  ('Salesperson', 80000, 'Ronald Firbank'),
  ('Lead Engineer', 150000, NULL),
  ('Software Engineer', 120000, 'Piers Gaveston'),
  ('Accounting Lead',150000 , NULL),
  ('Accountant',125000 , 'Katherine Mansfield'),
  ('Legal Team Lead', '250000', NULL),
  ('Lawyer', 190000, 'Edward Bellamy');
 
INSERT INTO employees (first_name, last_name, title_id, department_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 3, 2),
  ('Charles', 'LeRoi', 4, 2),
  ('Katherine', 'Mansfield', 5, 3),
  ('Dora', 'Carrington', 6, 3),
  ('Edward', 'Bellamy', 7, 4),
  ('Montague', 'Summers', 8, 4),
  ('Octavia', 'Butler', 2, 1),
  ('Unica', 'Zurn', 4, 2);

  