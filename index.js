
const db = require('./db/connection');


const getEmployees = function () {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, departments.department, title.title, title.salary, employees.manager
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
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, departments.department, title.title, title.salary, employees.manager
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
        console.log('Employee: '+id+' has been deleted.')
        getEmployees();
        });
}

const createUser = function (first_name, last_name, title_id, department_id, manager){
    const sql = `INSERT INTO employees (first_name, last_name, title_id, department_id, manager)
      VALUES (?,?,?,?)`;
    const params = [first_name, last_name, title_id, department_id, manager];

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.log('Employee: '+first_name+ ' '+ last_name+' has been created.')
        getEmployees();
        });
}

const updateTitle = function (new_title_id, id) {
    const sql = `UPDATE employees SET title_id = ? 
                 WHERE id = ?`;
    const params= [new_title_id, id];
    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return;
        }
        console.log('Employee: '+id+ ' had their role updated.')
        getEmployees();
        });
}

getEmployees();
//getOneEmployees(11);
//deleteEmployee(11);
//createUser('jon', 'langerman', 1, 1);
//updateTitle(2, 21);

   