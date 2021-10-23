import express from "express";

const app = express();
const PORT = process.env.PORT || 4200;

app.listen(3000);
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "I am using babel in NodeJS",
        status: "success",
    });
});

app.listen(PORT, () => console.log("server up and running"));
