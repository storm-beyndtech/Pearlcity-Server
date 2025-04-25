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
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactUsMail = contactUsMail;
exports.registerCourseMail = registerCourseMail;
exports.newsletterMail = newsletterMail;
exports.registerCourseFeedbackMail = registerCourseFeedbackMail;
const emailTemplate_1 = require("./emailTemplate");
const emailConfig_1 = require("./emailConfig");
const sendMail = (mailData) => {
    return new Promise((resolve, reject) => {
        emailConfig_1.transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                console.log(info);
                resolve(info);
            }
        });
    });
};
const sendMailWithRetry = (mailData_1, ...args_1) => __awaiter(void 0, [mailData_1, ...args_1], void 0, function* (mailData, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return yield sendMail(mailData);
        }
        catch (error) {
            if (i === retries - 1)
                throw error;
            console.log(`Retrying sendMail... Attempt ${i + 1}`);
        }
    }
});
// Optional helper to format course names from IDs
function formatCourseName(courseId) {
    const map = {
        "frontend-development": "Frontend Development",
        "backend-development": "Backend Development",
        "fullstack-development": "Backend Development",
        "graphic-design": "Graphic Design",
        "ui-ux": "UI/UX Design",
    };
    return map[courseId] || "Tech";
}
// Optional helper to format course names from IDs
function emailPreference(courseId) {
    const map = {
        "frontend-development": "frontend@pearl-itcity.com",
        "backend-development": "backend@pearl-itcity.com",
        "fullstack-development": "fullstack@pearl-itcity.com",
        "graphic-design": "graphic.design@pearl-itcity.com",
        "ui-ux": "graphic.design@pearl-itcity.com",
    };
    return map[courseId] || "frontdesk@pearl-itcity.com";
}
// Contact Us Mail
function contactUsMail(email, name, subject, message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bodyContent = `
      <p>New Message from</p>
      <p>Full Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
    `;
            const mailOptions = {
                from: `${name} <frontdesk@pearl-itcity.com>`,
                to: "info@pearl-itcity.com",
                subject,
                html: (0, emailTemplate_1.emailTemplate)(bodyContent),
            };
            return yield sendMailWithRetry(mailOptions);
        }
        catch (error) {
            return { error: error instanceof Error && error.message };
        }
    });
}
// Register Course Mail
function registerCourseMail(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bodyContent = `
      <h3>New Course Registration</h3>
      <p><strong>Full Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Course:</strong> ${formatCourseName(data.courseId)} </p>
      <p><strong>Experience Level:</strong> ${data.experience}</p>
      <p><strong>Laptop Available:</strong> ${data.laptop}</p>
      <p><strong>About:</strong> ${data.about}</p>
      <p><strong>Heard About Us Via:</strong> ${data.hearAbout.join(", ")}</p>
      <p><strong>Payment Option:</strong> ${data.paymentOption}</p>
      <p><strong>Agreed to Terms:</strong> ${data.agreeToTerms ? "Yes" : "No"}</p>
    `;
            const mailOptions = {
                from: `${data.fullName} <frontdesk@pearl-itcity.com>`,
                to: `${emailPreference(data.courseId)} `,
                subject: "New Course Registration",
                html: (0, emailTemplate_1.emailTemplate)(bodyContent),
            };
            return yield sendMailWithRetry(mailOptions);
        }
        catch (error) {
            return { error: error instanceof Error && error.message };
        }
    });
}
// Newsletter Subscription Mail
function newsletterMail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bodyContent = `
      <p>New Newsletter Subscriber:</p>
      <p><strong>Email:</strong> ${email}</p>
    `;
            const mailOptions = {
                from: `Newsletter <frontdesk@pearl-itcity.com>`,
                to: "info@pearl-itcity.com",
                subject: "New Newsletter Subscription",
                html: (0, emailTemplate_1.emailTemplate)(bodyContent),
            };
            return yield sendMailWithRetry(mailOptions);
        }
        catch (error) {
            return { error: error instanceof Error && error.message };
        }
    });
}
// User Feedback Mail after Registration
function registerCourseFeedbackMail(fullName, email, courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courseName = formatCourseName(courseId); // Optional: make course name user-friendly
            const firstName = fullName.split(" ")[0];
            const bodyContent = `
      <p>Dear ${firstName},</p>

      <p>Thank you for registering for our <strong>${courseName}</strong> Training Program! We’re thrilled to have you on board and can’t wait to help you build and enhance your ${courseName} skills.</p>

      <p>Our team is currently processing your registration, and we'll be in touch shortly with all the necessary details, including the program schedule, access instructions, and resources.</p>

      <p>In the meantime, if you have any questions or need assistance, feel free to reach out to us at <a href="mailto:graphic.design@pearl-itcity.com">graphic.design@pearl-itcity.com</a> or ‪+234 906 561 6298‬.</p>

      <p>We're excited to support your journey into the world of ${courseName}!</p>

      <p>Warm regards,</p>
      <p><strong>${courseName} Team</strong><br/>Pearlcity Hub</p>
    `;
            const mailOptions = {
                from: `Pearlcity Hub <frontdesk@pearl-itcity.com>`,
                to: email,
                subject: `Welcome to our ${courseName} Training Program!`,
                html: (0, emailTemplate_1.emailTemplate)(bodyContent),
            };
            return yield sendMailWithRetry(mailOptions);
        }
        catch (error) {
            return { error: error instanceof Error && error.message };
        }
    });
}
