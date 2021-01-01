const connection = require("./connection");

module.exports = {
    getDepartments() {
        return connection.query("SELECT * FROM departments");
    },
    getRoles() {
        return connection.query("SELECT * FROM roles");
    },
    getEmployees() {
        return connection.query("SELECT * FROM employees");
    },
    insertDepartments(data) {
        return connection.query("INSERT INTO departments SET ?", data);

    },
    insertRoles(data) {
        return connection.query("INSERT INTO roles SET ?", data);

    },
    insertEmployee(data) {
        return connection.query("INSERT INTO employees SET ?", data);

    }

}
