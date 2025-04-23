import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/form", async (req, res) => {
    const { name, email, phone, desc = "", services="", submitted_at } = req.body;

    if (!name || !email || !phone || !submitted_at) {
        return res.status(400).send("Missing required fields");
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "huzaifatemp312@gmail.com",
                pass: "ejtl jfsm bfyv jjca",
            },
        });

        await transporter.sendMail({
            from: "huzaifatemp312@gmail.com",
            to: "info@amzbestseller.com",
            subject: "New Form Submission",
            html: `
        <h1>New Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Services:</strong> ${services}</p>
        <p><strong>Description:</strong> ${desc}</p>
        <p><strong>Submitted At:</strong> ${submitted_at}</p>
      `
        });

        res.status(200).json({ message: "Form received and email sent" });
    } catch (err) {
        console.error("Email error:", err);
        res.status(500).send("Error sending email");
    }
});


app.get("/", (req, res) => {
    res.send("Form Submission API is running");
});

// --- Start server --------------------------------------------------
app.listen(PORT, () => console.log(`API running on port ${PORT}`));      