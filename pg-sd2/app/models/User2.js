// Get the functions in the db.js file to use
const db = require('../services/db');
const bcrypt = require("bcryptjs");

class User2 {

    user_id;
    email;

    constructor(email) {
        this.email = email;
    }
    
    // Get an existing user id from an email address, or return false if not found
    async getIdFromEmail() {
        var sql = "SELECT user_id FROM login WHERE login.email = ?";
        const result = await db.query(sql, [this.email]);
        // TODO LOTS OF ERROR CHECKS HERE..
        if (JSON.stringify(result) != '[]') {
            this.user_id = result[0].user_id;
            return this.user_id;
        }
        else {
            return false;
        }
    }

    // Add a password to an existing user
    async setUserPassword(password) {
        const pw = await bcrypt.hash(password, 10);
        //const pw = password
        console.log(pw.length)
        var sql = "UPDATE login SET password = ? WHERE login.user_id = ?"
        const result = await db.query(sql, [pw, this.user_id]);
        return true;
    }

    
    // Add a new record to the users table    
    async addUser(password) {
        const pw = await bcrypt.hash(password, 10);
        //const pw = password
        var sql = "INSERT INTO login (email, password) VALUES (? , ?)";
        const result = await db.query(sql, [this.email, pw]);
        console.log(result.insertId);
        this.user_id = result.insertId;
        var sql2 = "INSERT INTO users (user_id) VALUES (?)";
        const result2 = await db.query(sql2, [this.user_id]);
        var sql3 = "INSERT INTO preferences (user_id) VALUES (?)";
        const result3 = await db.query(sql3, [this.user_id]);
        return true;
    }

    // Test a submitted password against a stored password
    async authenticate(submitted) {
        // Get the stored, hashed password for the user
        var sql = "SELECT password FROM login WHERE user_id = ?";
        const result = await db.query(sql, [this.user_id]);
        console.log(submitted, result[0].password)
        const match = await bcrypt.compare(submitted, result[0].password);
        //const match = submitted
        if (match == true) {
            return true;
        }
        else {
            return false;
        }
    }


}

module.exports  = {
    User2
}