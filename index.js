
const db = require('./db/connection');
const inquirer = require('inquirer');


const getAllEmployees = function () {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, departments.department, title.title, title.salary, employees.supervisor
    FROM employees
    LEFT JOIN departments ON employees.department_id = departments.id
    LEFT JOIN title ON employees.title_id = title.id;`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.table(rows);
    });

}

const getOneEmployees = function (id) {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, departments.department, title.title, title.salary, employees.supervisor
    FROM employees
    LEFT JOIN departments ON employees.department_id = departments.id
    LEFT JOIN title ON employees.title_id = title.id
    WHERE employees.id = ?`;
    const params = id;

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.table(row);
    });

}

const deleteEmployee = function (id) {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = id;

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.log('Employee: ' + id + ' has been deleted.')
        getAllEmployees();
    });
}

const addEmployee = function (first_name, last_name, title_id, department_id, manager) {
    const sql = `INSERT INTO employees (first_name, last_name, title_id, department_id, manager)
      VALUES (?,?,?,?)`;
    const params = [first_name, last_name, title_id, department_id, manager];

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.log('Employee: ' + first_name + ' ' + last_name + ' has been created.')
        getAllEmployees();
    });
}

const updateEmployeeRole = function (new_title_id, id) {
    const sql = `UPDATE employees SET title_id = ? 
                 WHERE id = ?`;
    const params = [new_title_id, id];
    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.log('Employee: ' + id + ' had their role updated.')
        geAllEmployees();
    });
}

const getAllDepartments = function () {
    const sql = `SELECT * FROM departments;`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.table(rows);
    });
}

const addDepartment = function (department) {
    const sql = `INSERT INTO departments (department)
      VALUES (?)`;
    const params = [department];

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.log('Department: ' + department + ' has been created.')
        getAllDepartments();
    });
}

const getAllRoles = function () {
    const sql = `SELECT title.id, title.title,  title.salary, departments.department 
    FROM title                                                          
    LEFT JOIN departments ON title.department_id = departments.id;`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.table(rows);
    });
}

const addRole = function (title, salary, department_id) {
    const sql = `INSERT INTO title (title, salary, department_id)
      VALUES (?,?,?)`;
    const params = [title, salary, department_id];

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.log('Role: ' + title + ' has been created.')
        getAllRoles();
    });
}

const updateEmployeeManager = function (new_supervisor, id) {
    const sql = `UPDATE employees SET supervisor = ? 
    WHERE id = ?`;
    const params = [new_supervisor, id];
    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.log('Employee: ' + id + ' had their supervisor updated to ' + new_supervisor + '.')
        getAllEmployees();
    });
}
const getEmployeeByManager = function (supervisor) {
    const sql = `SELECT id, first_name, last_name, supervisor
    FROM employees
    WHERE supervisor = ?;`;
    const params = supervisor;

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.table(row);
    });
}

const getEmployeeByDepartment = function (department_id) {
    const sql = `SELECT id, first_name, last_name, department_id
    FROM employees
    WHERE department_id = ?;`;
    const params = department_id;

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.table(row);
    });
}

const deleteDepartment = function (id) {
    const sql = `DELETE FROM departments WHERE id = ?`;
    const params = id;

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.log('Department: ' + id + ' has been deleted.')
        getAllDepartments();
    });
}

const deleteRole = function (id) {
    const sql = `DELETE FROM title WHERE id = ?`;
    const params = id;

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.log('Role: ' + id + ' has been deleted.')
        getAllRoles();
    });
}

const initialPrompt = function () {
    return inquirer
        .prompt([
            {
                type: 'rawlist',
                name: 'initialChoice',
                message: 'What would you like to do?',
                choices: ['View', 'Add', 'Update', 'Delete']
            }
        ]).then(initialPrompt => {
            if (initialPrompt.initialChoice === 'View') {
                viewEmployeeData();
            } else if (initialPrompt.initialChoice === 'Add') {
                addEmployeeData();
            } else if (initialPrompt.initialChoice === 'Update') {
                updateEmployeeData();
            } else if (initialPrompt.initialChoice === 'Delete') {
                deleteEmployeeData();
            }
        })
}

const viewEmployeeData = function () {
    return inquirer
        .prompt([
            {
                type: 'rawlist',
                name: 'viewEmployeeChoice',
                message: 'Which set of data would you like to view?',
                choices: ['View all employees', 'View all Departments', 'View All Roles', 'View employees by manager', 'View employees by department']
            }
        ]).then(viewEmployeeData => {
            if (viewEmployeeData.viewEmployeeChoice === 'View all employees') {
                getAllEmployees();
                return initialPrompt();
            } else if (viewEmployeeData.viewEmployeeChoice === 'View all Departments') {
                getAllDepartments();
                return initialPrompt();
            } else if (viewEmployeeData.viewEmployeeChoice === 'View All Roles') {
                getAllRoles();
                return initialPrompt();
            } else if (viewEmployeeData.viewEmployeeChoice === 'View employees by manager') {

                const inputManagerName = function () {
                    return inquirer
                        .prompt([
                            {
                                type: 'rawlist',
                                name: 'managerName',
                                message: 'Which manager do you want to search by?',
                                choices: ['Piers Gaveston', 'Ronald Firbank', 'Katherine Mansfield', 'Edward Bellamy']

                            }
                        ]).then(inputManagerName => {
                            if (inputManagerName.managerName === 'Piers Gaveston') {
                                getEmployeeByManager('Piers Gaveston');
                                return initialPrompt();
                            } else if (inputManagerName.managerName === 'Ronald Firbank') {
                                getEmployeeByManager('Ronald Firbank');
                                return initialPrompt();
                            } else if (inputManagerName.managerName === 'Katherine Mansfield') {
                                getEmployeeByManager('Katherine Mansfield');
                                return initialPrompt();
                            } else if (inputManagerName.managerName === 'Edward Bellamy') {
                                getEmployeeByManager('Edward Bellamy');
                                return initialPrompt();
                            }
                        })
                }
                inputManagerName();
            } else if (viewEmployeeData.viewEmployeeChoice === 'View employees by department') {
                const inputDepartmentID = function () {
                    return inquirer
                        .prompt([
                            {
                                type: 'text',
                                name: 'departmentID',
                                message: 'Which department ID do you want to search by?',
                             }
                        ]).then(inputDepartmentID => {
                            getEmployeeByDepartment(inputDepartmentID.departmentID);
                            //add input validation
                            return initialPrompt();
                        })
                }
                inputDepartmentID();
            }
        })
}

//getAllEmployees();
//getOneEmployees(11);
//deleteEmployee(11);
//createUser('jon', 'langerman', 1, 1);
//updateTitle(2, 21);
//getAllDepartments();
//getAllRoles();
//addDepartment('Test');
//addRole('testing', 1000000, 5);
//updateEmployeeManager('Ronald Firbank', 10);
//getEmployeeByManager('Ronald Firbank');
//getEmployeeByDepartment(1);
//deleteRole(1);
//deleteDepartment(1);

initialPrompt();

//add input validation for get employee by ID line 291





