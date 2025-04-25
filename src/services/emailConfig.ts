import nodemailer from "nodemailer"; 
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.SMTP_USER, process.env.SMTP_PASS)
// Validate environment variables
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
	throw new Error("SMTP_USER and SMTP_PASS environment variables are required.");
}

export const transporter = nodemailer.createTransport({
	pool: true,
	host: "smtp.hostinger.com",
	port: 465,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
	secure: true, // Use SSL
	connectionTimeout: 30000, // 30 seconds
	socketTimeout: 30000, // 30 seconds
});

export const verifyTransporter = async (retries = 3, delay = 5000) => {
	for (let attempt = 1; attempt <= retries; attempt++) {
		try {
			await transporter.verify();
			console.log("Transporter Verified");
			return true; // Indicate success
		} catch (error) {
			console.error(
				`Transporter verification failed on attempt ${attempt}:`,
				error instanceof Error ? error.message : error,
			);

			if (attempt < retries) {
				console.log(`Retrying in ${delay / 1000} seconds...`);
				await new Promise((resolve) => setTimeout(resolve, delay));
			} else {
				console.error("All attempts to verify transporter failed.");
				throw new Error("Failed to verify transporter after multiple attempts.");
			}
		}
	}
};
