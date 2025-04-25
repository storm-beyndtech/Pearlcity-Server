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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const emailConfig_1 = require("./services/emailConfig");
const emailService_1 = require("./services/emailService");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Verify Email Transporter
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, emailConfig_1.verifyTransporter)();
}))();
// Start the server
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
// Default route
app.get("/", (req, res) => {
    res.send("API running 🥳");
});
// contact mail route
app.post("/api/contact-us", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, subject, message } = req.body;
    try {
        const mailRes = yield (0, emailService_1.contactUsMail)(email, name, subject, message);
        if (mailRes.error)
            throw new Error(mailRes.error);
        res.status(200).json({ message: "Mail Sent Successfully..." });
    }
    catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email" });
    }
}));
// Register course route
app.post("/api/register-course", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailRes = yield (0, emailService_1.registerCourseMail)(Object.assign({}, req.body));
        if (mailRes.error)
            throw new Error(mailRes.error);
        const mailRes2 = yield (0, emailService_1.registerCourseFeedbackMail)(req.body.fullName, req.body.email, req.body.courseId);
        if (mailRes2.error)
            throw new Error(mailRes2.error);
        res.status(200).json({ message: "Reg Successfully 🎉, we've sent you an email." });
    }
    catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email" });
    }
}));
// Register course route
app.post("/api/newsletter-sub", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailRes = yield (0, emailService_1.newsletterMail)(req.body.email);
        if (mailRes.error)
            throw new Error(mailRes.error);
        res.status(200).json({ message: "Mail Sent Successfully..." });
    }
    catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email" });
    }
}));
