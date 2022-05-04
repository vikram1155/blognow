const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology:true,
            useNewUrlParser:true,
        });
        console.log('====================================');
        console.log(`mongodb connected, ${conn.connection.host}`);
        console.log('====================================');
        
    } catch (error) {
        console.log(`error, ${error.message}`);
    }
}

module.exports = connectDB;