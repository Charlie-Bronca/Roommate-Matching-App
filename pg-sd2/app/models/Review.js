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

    /*
    async fetchUserById(user_id) {
        const sql = 'SELECT user_id FROM reviews WHERE user_id = ?';
        const result = await db.query(sql, [user_id]);
        return result[0]; 
    }
    */
    static async getReviewById(reviewId) {
        const sql = "SELECT * FROM reviews WHERE review_id = ?";
        const results = await db.query(sql, [reviewId]);
        return results.length ? results[0] : null;
    }
    
    async getReviewDetails() {
        if (typeof this.review !== 'string') {
            var sql = "SELECT * from reviews WHERE review_id = ?"
            const results = await db.query(sql, [this.review_id]);
            this.review = results[0].review;
            this.user_id = results[0].user_id;
            this.date = results[0].date;

        }
    }

    static async findByUserId(user_id) {
        const sql = "SELECT * FROM reviews WHERE user_id = ?";
        const results = await db.query(sql, [user_id]);
        return results; // Return an array of reviews for the given user ID
    }
}

    /*
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
    */

module.exports = {
    Review
}