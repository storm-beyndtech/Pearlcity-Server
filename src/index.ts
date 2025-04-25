import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { verifyTransporter } from "./services/emailConfig";
import { contactUsMail, newsletterMail, registerCourseFeedbackMail, registerCourseMail } from "./services/emailService";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// Verify Email Transporter
(async () => {
	await verifyTransporter();
})();

// Start the server
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

// Default route
app.get("/", (req: Request, res: Response) => {
	res.send("API running 🥳");
});

// contact mail route
app.post("/api/contact-us", async (req: Request, res: Response) => {
	const { email, name, subject, message } = req.body;
	try {
		const mailRes: any = await contactUsMail(email, name, subject, message);
		if (mailRes.error) throw new Error(mailRes.error);

		res.status(200).json({ message: "Mail Sent Successfully..." });
	} catch (error) {
		console.error("Error sending email:", error);
		res.status(500).json({ message: "Failed to send email" });
	}
});

// Register course route
app.post("/api/register-course", async (req: Request, res: Response) => {
	try {
		const mailRes: any = await registerCourseMail({ ...req.body });
		if (mailRes.error) throw new Error(mailRes.error);

		const mailRes2: any = await registerCourseFeedbackMail(
			req.body.fullName,
			req.body.email,
			req.body.courseId,
		);
		if (mailRes2.error) throw new Error(mailRes2.error);

		res.status(200).json({ message: "Reg Successfully 🎉, we've sent you an email." });
	} catch (error) {
		console.error("Error sending email:", error);
		res.status(500).json({ message: "Failed to send email" });
	}
});

// Register course route
app.post("/api/newsletter-sub", async (req: Request, res: Response) => {
	try {
		const mailRes: any = await newsletterMail(req.body.email);
		if (mailRes.error) throw new Error(mailRes.error);

		res.status(200).json({ message: "Mail Sent Successfully..." });
	} catch (error) {
		console.error("Error sending email:", error);
		res.status(500).json({ message: "Failed to send email" });
	}
});
