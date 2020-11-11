/**
 * Conexión a la base de datos
 */

const mongoose = require('mongoose');

class ConectionDB {
    constructor() {
        this.connectDB()
    }

    static getInstance() {
        if (!this.connectionDB) {
            this.connectionDB = new ConectionDB();
        } else {
            return this.connectionDB;
        }
    }

    async connectDB() {
        try {
            await mongoose.connect(process.env.DB_PIXIE, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });

            console.log("Database connected")
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ConectionDB;