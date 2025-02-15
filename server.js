const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors()); // CORS error fix

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // API key from .env

app.post("/generate", async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Gemini Model
        const result = await model.generateContent(req.body.prompt);
        const response = result.response.text();
        res.json({ result: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
