USE employee_tracker_db;
INSERT INTO
  departments (name)
VALUES
  ("HR"),
  ("Accounting"),("Sales"),
  ("Engineering");
INSERT INTO
  roles (title, salary, department)
VALUES
  ("HR Manager", 75000, "HR");;
INSERT INTO
  employees (first_name, last_name, role_id, manager_id)
VALUES
  ("Lauren", "Plenger", 1, NULL);