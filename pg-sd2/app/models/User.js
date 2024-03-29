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

    constructor(user_id){
        this.user_id = user_id;
    }

    async getFirstName(){
        if (typeof this.first_name !== 'string') {
            var sql = "SELECT * from users where user_id = ?"
            const results = await db.query(sql, [this.user_id]);
            this.first_name = results[0].first_name;
        }
    }

    async getLastName(){
        
    }

    async getDOB(){
        
    }

    async getGender(){
        
    }

    async getReligion(){
        
    }

    async getPolitics(){
        
    }

    async getReligion(){
        
    }

    async getCountry(){
        
    }

    async getBio(){
        
    }

    async getPreferences(){
        
    }


}

module.exports = {
    User
}