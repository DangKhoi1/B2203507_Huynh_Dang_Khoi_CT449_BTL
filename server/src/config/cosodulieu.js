const mongoose = require("mongoose")
module.exports.connect = async () => {
    try {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(process.env.MONGO_URL);
            console.log('Ket noi voi co so du lieu thanh cong!');
        }
    } catch (error) {
        console.log(error);
    }
}