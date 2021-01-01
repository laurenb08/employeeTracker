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
                createDepartment();
                return;

            case "CREATE_ROLE":
                createRole();
                return;

            case "CREATE_EMPLOYEE":
                createEmployee();
                return;

            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
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

function createRole() {
    db.getDepartments().then((departments) => {

        console.log(departments);

        const departmentChoices = departments.map((departments) => ({
            value: departments.id,
            name: departments.name
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
        ]).then(res => {
            db.insertRole(res);
            console.log(res);
            askForAction();
        });
    })
}




askForAction();



db.getDepartments().then((results) => {
    console.log(results);
});

