import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 3000;

// Önce veritabanına bağlan, sonra sunucuyu dinlemeye başla
connectDB().then(() => {
    app.listen(PORT, () => console.log(`API: http://localhost:${PORT}`));
});