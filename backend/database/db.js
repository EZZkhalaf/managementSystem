const mongoose = require("mongoose")

const connection = async() =>{
    try {
        await mongoose.connect(process.env.DB_CONNECTOR)
        console.log("connected to the DB ...")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connection; 