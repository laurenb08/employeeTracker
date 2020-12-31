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
}
