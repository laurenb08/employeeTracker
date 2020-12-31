const { resourceLimits } = require("worker_threads");
const mysql = require("mysql");
const inquirer = require("inquirer");
// const inquirer = require("inquirer"); ****console table dependencies****


const db = require("./db");
const connection = require("./db/connection");

function askForAction() {

    inquirer.prompt({
        message: "Choose something to do",
        name: "action",
        type: "list",
        choices: [
            "VIEW_DEPARTMENTS",
            "VIEW_ROLES",
            "VIEW_EMPLOYEES",
            "CREATE_ROLE",
            "QUIT"
        ]
    }).then((res) => {
        switch (res.action) {
            case "VIEW_DEPARTMENTS":
                viewDepartments();
                return;

            case "VIEW_ROLES":
                return;

            case "VIEW_EMPLOYEES":
                return;

            case "CREATE_ROLE":
                createRole();
                return;

            default:
                connection.end();
        }
    })
}

function viewDepartments() {

    db.getDepartments().then((results) => {
        console.table(results);
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
            }
        ]).then(res => {
            console.log(res);
        });
    })
}




askForAction();



db.getDepartments().then((results) => {
    console.log(results);
});

