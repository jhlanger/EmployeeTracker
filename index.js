
const db = require('./db/connection');
const inquirer = require('inquirer');

// sql query to get all employees in a neat table 
const getAllEmployees = function () {
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, departments.department, title.title, title.salary, employees.supervisor
    FROM employees
    LEFT JOIN departments ON employees.department_id = departments.id
    LEFT JOIN title ON employees.title_id = title.id;`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log('You have an error: ', err);
            return initialPrompt();
        }
        console.table(rows);
    });

}
// sql query to delete an employee with a specific ID
const deleteEmployee = function (id) {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = id;

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return initialPrompt();
        }
        console.log('Employee: ' + id + ' has been deleted.')
        getAllEmployees();
    });
}
// add employee to employees table 
const addEmployee = function (first_name, last_name, title_id, department_id, supervisor) {
    const sql = `INSERT INTO employees (first_name, last_name, title_id, department_id, supervisor)
      VALUES (?,?,?,?,?)`;
    const params = [first_name, last_name, title_id, department_id, supervisor];

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return initialPrompt();
        }
        console.log('Employee: ' + first_name + ' ' + last_name + ' has been created.')
        getAllEmployees();
    });
}
// update the employee title_id 
const updateEmployeeRole = function (new_title_id, id) {
    const sql = `UPDATE employees SET title_id = ? 
                 WHERE id = ?`;
    const params = [new_title_id, id];
    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return initialPrompt();
        }
        console.log('Employee: ' + id + ' had their role updated.')
        getAllEmployees();
    });
}
// view all departments
const getAllDepartments = function () {
    const sql = `SELECT * FROM departments;`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log('You have an error: ', err);
            return initialPrompt();
        }
        console.table(rows);
    });
}
// add department
const addDepartment = function (department) {
    const sql = `INSERT INTO departments (department)
      VALUES (?)`;
    const params = [department];

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return initialPrompt();
        }
        console.log('Department: ' + department + ' has been created.')
        getAllDepartments();
    });
}
// view all roles from title table 
const getAllRoles = function () {
    const sql = `SELECT title.id, title.title,  title.salary, departments.department 
    FROM title                                                          
    LEFT JOIN departments ON title.department_id = departments.id;`;

    db.query(sql, (err, rows) => {
        if (err) {
            console.log('You have an error: ', err);
            return initialPrompt();
        }
        console.table(rows);
    });
}
// add role to title table
const addRole = function (title, salary, department_id) {
    const sql = `INSERT INTO title (title, salary, department_id)
      VALUES (?,?,?)`;
    const params = [title, salary, department_id];

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return initialPrompt();
        }
        console.log('Role: ' + title + ' has been created.')
        getAllRoles();
    });
}
// update an employees manager
const updateEmployeeManager = function (new_supervisor, id) {
    const sql = `UPDATE employees SET supervisor = ? 
    WHERE id = ?`;
    const params = [new_supervisor, id];
    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return initialPrompt();
        }
        console.log('Employee: ' + id + ' had their supervisor updated to ' + new_supervisor + '.')
        getAllEmployees();
    });
}
//view employees by specific manager
const getEmployeeByManager = function (supervisor) {
    const sql = `SELECT id, first_name, last_name, supervisor
    FROM employees
    WHERE supervisor = ?;`;
    const params = supervisor;

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return initialPrompt();
        }
        console.table(row);
    });
}
// view employees with a specific department 
const getEmployeeByDepartment = function (department_id) {
    const sql = `SELECT id, first_name, last_name, department_id
    FROM employees
    WHERE department_id = ?;`;
    const params = department_id;

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return initialPrompt();
        }
        console.table(row);
    });
}
// delete department with specific ID 
const deleteDepartment = function (id) {
    const sql = `DELETE FROM departments WHERE id = ?`;
    const params = id;

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return initialPrompt();
        }
        console.log('Department: ' + id + ' has been deleted.')
        getAllDepartments();
    });
}
// delete role with specific ID
const deleteRole = function (id) {
    const sql = `DELETE FROM title WHERE id = ?`;
    const params = id;

    db.query(sql, params, (err, row) => {
        if (err) {
            console.log('You have an error: ', err);
            return initialPrompt();
        }
        console.log('Role: ' + id + ' has been deleted.')
        getAllRoles();
    });
}
// Intial leading questions for view/add/update or delete
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
// Below are futher leading questions and follow up questions to get the data needed to query
// sql and display or do the required action. The data is gathered using inquirer.
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
            // if view all employees run getallemployees etc
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
                            return initialPrompt();
                        })
                }
                inputDepartmentID();
            }
        })
}

const addEmployeeData = function () {
    return inquirer
        .prompt([
            {
                type: 'rawlist',
                name: 'addDataChoice',
                message: 'What would you like to add?',
                choices: ['Employee', 'Role', 'Department']

            }
        ]).then(addEmployeeData => {
            if(addEmployeeData.addDataChoice === 'Employee'){
                const newEmployeeInfo = function () {
                    return inquirer
                        .prompt([
                            {
                                type: 'text',
                                name: 'first_name',
                                message: 'Please enter the new employees first name.'
                            },
                            {
                                type: 'text',
                                name: 'last_name',
                                message: 'Please enter the new employees last name.'
                            },
                            {
                                type: 'text',
                                name: 'titleID',
                                message: 'Please enter the new employees title ID number.'
                            },
                            {
                                type: 'text',
                                name: 'departmentID',
                                message: 'Please enter the new employees department ID number.'
                            },
                            {
                                type: 'text',
                                name: 'supervisor',
                                message: 'Please enter the new employees manager.'

                            }
                        ]).then(newEmployeeInfo => {
                            addEmployee(newEmployeeInfo.first_name, newEmployeeInfo.last_name,newEmployeeInfo.titleID, newEmployeeInfo.departmentID, newEmployeeInfo.supervisor);
                            return initialPrompt();
                        })

                }
                newEmployeeInfo();
                
            }else if (addEmployeeData.addDataChoice === 'Department'){
                const newDepartmentInfo = function () {
                    return inquirer
                        .prompt([
                            {
                                type: 'text',
                                name: 'department',
                                message: 'Please enter the new department name.'
                            }
                            
                        ]).then(newDepartmentInfo => {
                            addDepartment(newDepartmentInfo.department);
                            return initialPrompt();
                        })

                }
                newDepartmentInfo();
            }else if(addEmployeeData.addDataChoice === 'Role'){
                const newRoleInfo = function () {
                    return inquirer
                    .prompt([
                        {
                            type: 'text',
                            name: 'title',
                            message: 'Please enter the new role name.'
                        },
                        {
                            type: 'text',
                            name: 'salary',
                            message: 'Please enter the new role salary.'
                        },
                        {
                            type: 'text',
                            name: 'departmentID',
                            message: 'Please enter the new role department ID number.'
                        }
                      
                    ]).then(newRoleInfo => {
                        addRole(newRoleInfo.title, newRoleInfo.salary, newRoleInfo.departmentID);
                        return initialPrompt();
                    })

                }
                newRoleInfo();
            }
        })
}

const updateEmployeeData = function () {
    return inquirer
        .prompt([
            {
                type: 'rawlist',
                name: 'updateDataChoice',
                message: 'What would you like to update?',
                choices: ['Employee Role', 'Employee Manager']
            }
        ]).then(updateEmployeeData => {
            if(updateEmployeeData.updateDataChoice === 'Employee Role'){
                const newRoleInfo = function () {
                    return inquirer
                        .prompt([
                            {
                                type: 'text',
                                name: 'employeeID',
                                message: 'Please enter the ID number of the employee you would like to update.'
                            },
                            {
                                type: 'text',
                                name: 'newRoleID',
                                message: 'Please enter the new role ID for the employee'
                            }
                        ]).then(newRoleInfo => {
                            updateEmployeeRole(newRoleInfo.newRoleID, newRoleInfo.employeeID);
                            return initialPrompt();
                        })
                }
                newRoleInfo();
            }else if( updateEmployeeData.updateDataChoice === 'Employee Manager') {
                const newManagerInfo = function () {
                    return inquirer
                        .prompt([
                            {
                                type: 'text',
                                name: 'employeeID',
                                message: 'Please enter the ID number of the employee you would like to update.'
                            },
                            {
                                type: 'text',
                                name: 'newManager',
                                message: 'Please enter the new manager for the employee'
                            }
                        ]).then(newManagerInfo => {
                            updateEmployeeManager( newManagerInfo.newManager, newManagerInfo.employeeID);
                            return initialPrompt();
                        })
                }
                newManagerInfo();
            }
        })
    }

        const deleteEmployeeData = function () {
            return inquirer
                .prompt([
                    {
                       type: 'rawlist',
                       name: 'deleteDataChoice',
                       message: 'What would you like to delete?',
                       choices: ['Employee', 'Role', 'Department']
                    
                    }
                ]).then(deleteEmployeeData => {
                    if(deleteEmployeeData.deleteDataChoice === 'Employee') {
                        const deleteEmployeeInfo = function () {
                            return inquirer
                                .prompt([
                                    {
                                        type: 'text',
                                        name: 'employeeID',
                                        message: 'What is the ID of the employee that is being deleted?'
                                    }
                                ]).then(deleteEmployeeInfo => {
                                    deleteEmployee(deleteEmployeeInfo.employeeID);
                                    return initialPrompt();
                                })
                        }
                        deleteEmployeeInfo();
                    }else if(deleteEmployeeData.deleteDataChoice === 'Role') {
                        const deleteRoleInfo = function () {
                            return inquirer
                                .prompt([
                                    {
                                        type: 'text',
                                        name: 'roleID',
                                        message: 'What is the ID of the role that is being deleted?'
                                    }
                                ]).then(deleteRoleInfo => {
                                    deleteRole(deleteRoleInfo.roleID);
                                    return initialPrompt();
                                })
                        }
                        deleteRoleInfo();
                    }else if(deleteEmployeeData.deleteDataChoice === 'Department') {
                        const deleteDepartmentInfo = function () {
                            return inquirer
                                .prompt([
                                    {
                                        type: 'text',
                                        name: 'departmentID',
                                        message: 'What is the ID of the department that is being deleted?'
                                    }
                                ]).then(deleteDepartmentInfo => {
                                    deleteDepartment(deleteDepartmentInfo.departmentID);
                                    return initialPrompt();
                                })
                        }
                        deleteDepartmentInfo();
                    }
                })
        }


// run initial set of questions which will lead into the above follow up questions. 
initialPrompt();


//*** TO DO ****/

//add input validation if ID entered does not exist give error message and return to inital prompt






