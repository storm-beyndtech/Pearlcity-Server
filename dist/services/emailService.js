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
exports.bulkMail = bulkMail;
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
// Verification Code Mail
function bulkMail(mails, subject, message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let bodyContent = `
        <p>${message}</p>
    `;
            let mailOptions = {
                from: `Instantsglobal <support@mirrorexp.com>`,
                to: mails,
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
