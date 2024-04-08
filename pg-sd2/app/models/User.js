const db = require('../services/db');

class User{
    user_id;
    first_name;
    last_name;
    dob;
    gender;
    religion;
    politics;
    bio;
    country;
    preferences = {};
    age;
    // user_bio; //hannan

    constructor(user_id){
        this.user_id = user_id;
    }

    async getFirstName(){
        if (typeof this.first_name !== 'string') {
            var sql = "SELECT * from users WHERE user_id = ?"
            const results = await db.query(sql, [this.user_id]);
            this.first_name = results[0].first_name;
            //this.first_name = "Steve"
        }
    }

    async getLastName(){
        if (typeof this.last_name !== 'string') {
            var sql = "SELECT * from users WHERE user_id = ?"
            const results = await db.query(sql, [this.user_id]);
            this.last_name = results[0].last_name;
        }
        
    }

    async getDOB(){
        if (typeof this.dob !== 'string') {
            var sql = "SELECT * from users WHERE user_id = ?"
            const results = await db.query(sql, [this.user_id]);
            this.dob = new Date(results[0].dob);
        }
    }

    getAge(){
        var today = new Date();
        var birthDate = this.dob;
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {age--;}
        this.age = age
    }

    async getGender(){
        if (typeof this.gender !== 'string') {
            var sql = "SELECT * from users WHERE user_id = ?"
            const results = await db.query(sql, [this.user_id]);
            this.gender = results[0].gender;
        }
    }

    async getReligion(){
        if (typeof this.religion !== 'string') {
            var sql = "SELECT * from users WHERE user_id = ?"
            const results = await db.query(sql, [this.user_id]);
            this.religion = results[0].religion;
        }
        
    }

    async getPolitics(){
        if (typeof this.politics !== 'string') {
            var sql = "SELECT * from users WHERE user_id = ?"
            const results = await db.query(sql, [this.user_id]);
            this.politics = results[0].politics;
        }
    }


    async getCountry(){
        if (typeof this.country !== 'string') {
            var sql = "SELECT * from users WHERE user_id = ?"
            const results = await db.query(sql, [this.user_id]);
            this.country = results[0].country;
        }
        
    }

    async getBio(){
        if (typeof this.bio !== 'string') {
            var sql = "SELECT * from users WHERE user_id = ?"
            const results = await db.query(sql, [this.user_id]);
            this.bio = results[0].bio;
        }
        
    }

    // //hannan
    // async addUserbio(user_bio) {

    //     var sql = "UPDATE users SET user_bio = ? WHERE user_id = ?"
    //     const results = await db.query(sql, [user_bio, this.user_bio]);
    //             // ensure the user_bio property is up to date in model
        
    //         this.user_bio
    //     return result
    //     }

    async getPreferences(){
        //if (this.preferences == {}) {
        var sql = "SELECT * from preferences WHERE user_id = ?"
        const results = await db.query(sql, [this.user_id]);
        this.preferences["noise"] = results[0].noise
        this.preferences["pets"] = results[0].pets
        this.preferences["gender"] = results[0].p_gender
        this.preferences["smoking"] = results[0].smoking
        this.preferences["cleanliness"] = results[0].cleanliness
        this.preferences["age"] = results[0].p_age
        this.preferences["groceries"] = results[0].groceries
        this.preferences["country"] = results[0].p_country
        this.preferences["politics"] = results[0].p_politics
        this.preferences["religion"] = results[0].p_religion
        this.preferences["schedule"] = results[0].schedule
        this.preferences["guests"] = results[0].guests

           
        //console.log("hey")
    }

    // async save() {
    //     const db = require('../services/db');
    //     try {
    //         const sql = "INSERT INTO users (first_name, last_name, dob, gender, religion, politics, bio, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    //         const values = [this.first_name, this.last_name, this.dob, this.gender, this.religion, this.politics, this.bio, this.country];
    //         await db.query(sql, values);
    //         return true; // Return true indicating successful save
    //     } catch (error) {
    //         console.error("Error saving user:", error);
    //         return false; // Return false indicating failure to save
    //     }
    // }
    
    async save() {
        const db = require('../services/db');
        try {
            const sql = "INSERT INTO users (first_name, last_name, dob, gender, religion, politics, bio, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            const values = [
                this.first_name || "TestValue",
                this.last_name || "TestValue",
                this.dob || "2024-12-23",
                this.gender || "TestValue",
                this.religion || "TestValue",
                this.politics || "TestValue",
                this.bio || "TestValue",
                this.country || "TestValue",
                this.user_id||123
            ];
            
            // Remove undefined values from the array
            const definedValues = values.filter(value => value !== undefined);
    
            await db.query(sql, definedValues);
            return true; // Return true indicating successful save
        } catch (error) {
            console.error("Error saving user:", error);
            return false; // Return false indicating failure to save
        }
    }
    

}

module.exports = {
    User
}