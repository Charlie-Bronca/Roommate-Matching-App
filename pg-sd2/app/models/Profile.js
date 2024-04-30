const db = require('../services/db');
const { Chat } = require("./chat");

class Profile{
    user_id;
    first_name;
    last_name;
    dob;
    job;
    gender;
    religion;
    politics;
    bio;
    country;
    preferences = {};
    chats = [];
    age;
    // user_bio; //hannan

    constructor(user_id){
        this.user_id = user_id;
    }

    calcAge(dob){
        var today = new Date();
        var birthDate = dob;
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {age--;}
        return age
    }

    async getProfileDetails(){
        if (typeof this.first_name !== 'string') {
            var sql = "SELECT * from users WHERE user_id = ?"
            const results = await db.query(sql, [this.user_id]);
            this.first_name = results[0].first_name;
            this.last_name = results[0].last_name;
            this.dob = new Date(results[0].dob);
            this.job = results[0].job;
            this.gender = results[0].gender;
            this.religion = results[0].religion;
            this.politics = results[0].politics;
            this.country = results[0].country;
            this.bio = results[0].bio;
            this.age = this.calcAge(this.dob)
            //this.first_name = "Steve"
        }
    }



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

    async getChatList(){
        var sql = "SELECT * from chats WHERE recipient_id = ? OR sender_id = ?"
        const results = await db.query(sql, [this.user_id, this.user_id]);
        const the_chats = []
        for(let i = 0; i < results.length; i++){
            let a_chat = new Chat (results[i].chat_id)
            await a_chat.getChatDetails();
            the_chats.push(a_chat)
        }
        the_chats.sort(function(a, b){return a.timestamp - b.timestamp});
        this.chats = the_chats
    }

    async getChatFromOtherProfile(user_id){
        var sql = "SELECT * from chats WHERE (recipient_id = ? && sender_id = ?) OR (sender_id = ? && recipient_id = ?)"
        const results = await db.query(sql, [this.user_id, user_id, this.user_id, user_id]);
        const the_chats = []
        for(let i = 0; i < results.length; i++){
            let a_chat = new Chat (results[i].chat_id)
            await a_chat.getChatDetails();
            the_chats.push(a_chat)
        }
        the_chats.sort(function(a, b){return a.timestamp - b.timestamp});
        return the_chats
    }


    async getIdFromEmail() {
        var sql = "SELECT id FROM login WHERE Users.email = ?";
        const result = await db.query(sql, [this.email]);
        // TODO LOTS OF ERROR CHECKS HERE..
        if (JSON.stringify(result) != '[]') {
            this.id = result[0].id;
            return this.id;
        }
        else {
            return false;
        }
    }

   


    async addBio(bio) {
        var sql = "UPDATE users SET users.bio = ? WHERE users.user_id = ?"
        const result = await db.query(sql, [bio, this.user_id]);
        this.bio = bio;
        return result;
    }

    async addProfileDetails(first_name, last_name, dob, job, gender, religion, politics, bio, country, id){
        var sql = "UPDATE users SET first_name = ? , last_name = ? , dob = ? , job = ? , gender = ? , religion = ? , politics = ? , bio = ?, country = ? WHERE user_id = ?"
        //var sql = "INSERT INTO users(user_id, first_name, last_name, dob, job, gender, religion, politics, bio, country) VALUES (?,?,?,?,?,?,?,?,?,?)"
        const result = await db.query(sql, [first_name, last_name, dob, job, gender, religion, politics, bio, country,id ]);
        this.first_name = first_name
        this.last_name = last_name
        this.dob = new Date(dob);
        this.job = job
        this.gender  = gender
        this.religion = religion
        this.politics = politics
        this.bio = bio
        this.country = country
        this.age = this.calcAge(this.dob)
        return result;
    }

    async addPreferences(location, p_age, noise, p_gender, cleanliness, smoking, alcohol, groceries, schedule, pets, guests, p_religion, p_politics, p_country, id){
        var sql = "UPDATE preferences SET location=?, p_age=?, noise=?, p_gender=?, cleanliness=?, smoking=?, alcohol=?, groceries=?, schedule=?, pets=?, guests=?, p_religion=?, p_politics=?, p_country=? WHERE user_id = ?"
        const result = await db.query(sql, [location, p_age, noise, p_gender, cleanliness, smoking, alcohol, groceries, schedule, pets, guests, p_religion, p_politics, p_country, id]);
        return result;
    }
    

}

module.exports = {
    Profile
}