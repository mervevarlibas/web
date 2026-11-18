import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js"; // Baştaki // silindi

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        time: new Date().toISOString(),
        student: "2311012025"
    });
});

app.use("/events", eventRoutes); // Baştaki // silindi

app.use((req, res) => {
    res.status(404).json({ error: { message: "Route not found" } });
});
app.use((req, res) => {
    res.status(404).json({ error: { message: "Route not found" } });
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: { message: "Server error" } });
});

export default app;