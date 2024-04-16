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
        if (typeof this.review !== 'string') {
            var sql = "SELECT review from reviews WHERE review_id = ?"
            const results = await db.query(sql, [this.review_id]);
            this.review = results[0].review;
        }
    }

    async getDate() {
        return this.date;
    }

    static async getReviewId(review_id) {
        const sql = 'SELECT review FROM reviews WHERE review_id = ?';
        const result = await db.query(sql, [review_id]);
        return result[0]; 
    }

    static async newReview(review, date, user_id) {
        const sql = 'INSERT INTO reviews (review, date, user_id) VALUES (?, ?, ?)';
        const result = await db.query(sql, [review, date, user_id]);
        return result;
    }
}

module.exports = {
    Review
}