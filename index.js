const { resourceLimits } = require("worker_threads");
const mysql = require("mysql");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const cTable = require("console.table");

const db = require("./db");
const connection = require("./db/connection");

console.log(
    logo({
        name: 'Employee Database',
        font: 'Big',
        lineChars: 15,
        padding: 2,
        margin: 3,
        borderColor: 'magenta',
        logoColor: 'white',
        textColor: 'magenta',
    })
        .emptyLine()
        .right('version 1.0')
        .emptyLine()
        .center('Create, track and update departments, roles and employees!')
        .render()
);

function askForAction() {

    inquirer.prompt({
        message: "Choose something to do",
        name: "action",
        type: "list",
        choices: [
            "VIEW_DEPARTMENTS",
            "VIEW_ROLES",
            "VIEW_EMPLOYEES",
            "CREATE_DEPARTMENT",
            "CREATE_ROLE",
            "CREATE_EMPLOYEE",
            "UPDATE_EMPLOYEE_ROLE",
            "QUIT"
        ]
    }).then((res) => {
        switch (res.action) {
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                return;

            case "VIEW_ROLES":
                viewRoles();
                return;

            case "VIEW_EMPLOYEES":
                viewEmployees();
                return;

            case "CREATE_DEPARTMENT":
                createDepartments();
                return;

            case "CREATE_ROLE":
                createRoles();
                return;

            case "CREATE_EMPLOYEE":
                createEmployees();
                return;

            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRoles();
                return;

            default:
                connection.end();
        }
    })
}

function viewDepartments() {

    db.getDepartments()
        .then((results) => {
            let departmentsTable = cTable.getTable(results);
            console.table(departmentsTable);
            askForAction();
        });

}

function viewRoles() {

    db.getRoles()
        .then((results) => {
            let rolesTable = cTable.getTable(results);
            console.table(rolesTable);
            askForAction();
        });

}

function viewEmployees() {

    db.getEmployees()
        .then((results) => {
            let employeesTable = cTable.getTable(results);
            console.table(employeesTable);
            askForAction();
        });

}

function createDepartments() {
    inquirer.prompt([
        {
            message: "What department would you like to create?",
            type: "input",
            name: "name",
        }
    ]).then(newDepartment => {
        db.insertDepartments(newDepartment).then((res) => {
            console.log("New Department Added!")
            askForAction();
        })
    })
}

function createRoles() {
    db.getDepartments().then((departments) => {

        console.log(departments);

        const departmentChoices = departments.map((department) => ({
            value: department.id,
            name: department.name
        }))

        inquirer.prompt([
            {
                message: "What department is this role for?",
                type: "list",
                name: "department_id",
                choices: departmentChoices
            },
            {
                message: "What is the title of this role?",
                type: "input",
                name: "title",
            },
            {
                message: "What is the salary for this role?",
                type: "input",
                name: "salary",
            }
        ]).then(newRole => {
            db.insertRoles(newRole).then((res) => {
                console.log("New Role Added!")
                askForAction();
            })
        })
    })
}

function createEmployees() {
    db.getRoles()
        .then((roles) => {
            console.log(roles);

            const roleList = roles.map((role) => ({
                value: role.id,
                name: role.title
            }));
            db.getEmployees()
                .then((employees) => {
                    console.log(employees);

                    const employeeList = employees.map((employee) => ({
                        value: employee.id,
                        name: `${employee.first_name} ${employee.last_name}`
                    }))
                    inquirer.prompt([
                        {
                            message: "What is the employee's first name?",
                            type: "input",
                            name: "first_name",
                        },
                        {
                            message: "What is the employee's last name?",
                            type: "input",
                            name: "last_name",
                        },
                        {
                            message: "What is the role for this employee?",
                            type: "list",
                            name: "role_id",
                            choices: roleList
                        },
                        {
                            message: "Who will be this employees manager?",
                            type: "list",
                            name: "manager_id",
                            choices: employeeList
                        }
                    ]).then(newEmployee => {
                        db.insertEmployee(newEmployee).then((res) => {
                            console.log("New Employee Added!")
                            askForAction();
                        })
                    })
                })
        }
        )
}

function updateEmployeeRoles() {
    db.getEmployees()
        .then((employees) => {
            console.log(employees);

            const employeeList = employees.map((employee) => ({
                value: employee.id,
                name: `${employee.first_name} ${employee.last_name}`
            }));
            db.getRoles()
                .then((roles) => {
                    console.log(roles);

                    const roleList = roles.map((role) => ({
                        value: role.id,
                        name: role.title
                    })
                    );
                    inquirer.prompt([
                        {
                            message: "Which employee would you like to change?",
                            type: "list",
                            name: "id",
                            choices: employeeList
                        },
                        {
                            message: "What is this employees new role?",
                            type: "list",
                            name: "role_id",
                            choices: roleList
                        }
                    ]).then(updatedEmployee => {
                        db.Employee(updatedEmployee).then((res) => {
                            console.log("Employee Info Updated!")
                            askForAction();
                        })
                    })

                });

        });

}




askForAction();



db.getDepartments().then((results) => {
    console.log(results);
});