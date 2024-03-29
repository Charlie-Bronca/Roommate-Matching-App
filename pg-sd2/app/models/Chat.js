const db = require('../services/db');

class Chat {
    chat_id;
    sender_id;
    recipient_id;
    timestamp;
    message;

    constructor(chat_id, sender_id, recipient_id, timestamp, message) {
        this.chat_id = chat_id;
        this.sender_id = sender_id;
        this.recipient_id = recipient_id;
        this.timestamp = timestamp;
        this.message = message;
      }

    async getSenderName() {
        if (!this.senderName) {
            const sender = await this.fetchUserById(this.sender_id);
            this.senderName = sender ? "${sender.first_name} ${sender.last_name}" : 'Unknown';
        }
        return this.senderName;
    }

    async getRecipientName() {
        if (!this.recipientName) {
            const recipient = await this.fetchUserById(this.recipient_id);
            this.recipientName = recipient ? "${recipient.first_name} ${recipient.last_name}" : 'Unknown';
        }
        return this.recipientName;
    }

    async fetchUserById(user_id) {
        const sql = 'SELECT first_name, last_name FROM users WHERE user_id = ?';
        const result = await db.query(sql, [user_id]);
        return result[0]; 
    }

    async getTimestamp() {
        return this.timestamp;
    }

    async getMessage() {
        return this.message;
    }

    static async getChatById(chatId) {
        const sql = 'SELECT * FROM chats WHERE chat_id = ?';
        const result = await db.query(sql, [chat_id]);
        return result[0]; 
    }
}

module.exports = {
    Chat
}