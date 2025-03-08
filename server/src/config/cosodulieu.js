const mongoose = require("mongoose")
module.exports.connect = async () => {
    try {
        if (!mongoose.connection.readyState) {
            mongoose.connect(process.env.MONGO_URL);
            console.log('Kết nối với cơ sở dữ liệu thành công!');
        }
    } catch (error) {
        console.log(error);
    }
}