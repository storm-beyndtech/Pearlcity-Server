"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTransporter = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.SMTP_USER, process.env.SMTP_PASS);
// Validate environment variables
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP_USER and SMTP_PASS environment variables are required.");
}
exports.transporter = nodemailer_1.default.createTransport({
    pool: true,
    host: "mail.privateemail.com",
    port: 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    secure: true, // Use SSL
    connectionTimeout: 30000, // 30 seconds
    socketTimeout: 30000, // 30 seconds
});
const verifyTransporter = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (retries = 3, delay = 5000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            yield exports.transporter.verify();
            console.log("Transporter Verified");
            return true; // Indicate success
        }
        catch (error) {
            console.error(`Transporter verification failed on attempt ${attempt}:`, error instanceof Error ? error.message : error);
            if (attempt < retries) {
                console.log(`Retrying in ${delay / 1000} seconds...`);
                yield new Promise((resolve) => setTimeout(resolve, delay));
            }
            else {
                console.error("All attempts to verify transporter failed.");
                throw new Error("Failed to verify transporter after multiple attempts.");
            }
        }
    }
});
exports.verifyTransporter = verifyTransporter;
