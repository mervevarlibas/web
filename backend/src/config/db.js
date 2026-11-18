import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Atlas'a başarıyla bağlanıldı!");
    } catch (error) {
        console.error("MongoDB bağlantı hatası:", error.message);
        process.exit(1); // Bağlantı başarısız olursa sunucuyu durdur
    }
};