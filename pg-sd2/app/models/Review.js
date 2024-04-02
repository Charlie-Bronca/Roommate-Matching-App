const db = require('../services/db');

class Review{
    review_id;
    review;
    date;
    user_id;

    constructor(review_id, review, date, user_id){
        this.review_id = review_id;
        this.review = review;
        this.date = date;
        this.user_id = user_id;
    }

    async fetchUserById(user_id) {
        const sql = 'SELECT user_id FROM reviews WHERE user_id = ?';
        const result = await db.query(sql, [user_id]);
        return result[0]; 
    }

    async getReview() {
        return this.review;
    }

    async getDate() {
        return this.date;
    }

    static async getReviewID(review_id) {
        const sql = 'SELECT * FROM chats WHERE review_id = ?';
        const result = await db.query(sql, [review_id]);
        return result[0]; 
    }
}

module.exports = {
    Review
}