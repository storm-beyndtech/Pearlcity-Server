"use strict";
// export function emailTemplate(title: string, bodyContent: string) {
//   return `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <title>${title}</title>
//   </head>
//   <body style="margin: 0; padding: 0; background: #f9f9f9; font-family: Arial, sans-serif;">
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplate = emailTemplate;
//     <!-- Main Container -->
//     <table role="presentation" width="100%" bgcolor="#f9f9f9" style="padding: 20px 0;">
//       <tr>
//         <td align="center">
//           <table role="presentation" width="100%" max-width="600px" bgcolor="#ffffff" style="border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
//             <!-- Header (Logo) -->
//             <tr>
//               <td align="center" style="padding: 20px; background: #13160F;">
//                 <img src="https://instantsglobal-p.com/logo.png" width="120" alt="Company Logo" style="display: block;">
//               </td>
//             </tr>
//             <!-- Body Content -->
//             <tr>
//               <td style="padding: 20px; color: #333; font-size: 16px; line-height: 1.6;">
//                 ${bodyContent}
//               </td>
//             </tr>
//             <!-- Footer -->
//             <tr>
//               <td align="center" style="padding: 15px; background: #13160F; color: #fafafa; font-size: 12px;">
//                 © 2025 InstantsGlobal | All Rights Reserved
//               </td>
//             </tr>
//           </table>
//         </td>
//       </tr>
//     </table>
//   </body>
//   </html>
//   `;
// }
function emailTemplate(bodyContent) {
    return `
      <table role="presentation" width="100%" bgcolor="#f9f9f9" style="padding: 20px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" max-width="600px" bgcolor="#ffffff" style="border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            
            <!-- Header (Logo) -->


            <tr>
              <td align="center" style="padding: 20px; background: #13160F;">
                <img src="https://i.postimg.cc/Vk7fh1FF/ig-p-logo-1.png" width="120" alt="Company Logo" style="display: block;">
              </td>
            </tr>

            <!-- Body Content -->
            <tr>
              <td style="padding: 20px; color: #333; font-size: 16px; line-height: 1.6;">
                <p style="font-size:18px; margin-bottom: 30px">Dear Esteemed Customer</p>

                ${bodyContent}

                <p>Best regards, <br>The Instantsglobal Team</p>
              </td>
            </tr>
  

            <!-- Footer -->
            <tr>
              <td align="center" style="padding: 20px; background: #13160F; color: #fafafa; font-size: 12px;">
                © 2025 InstantsGlobal | All Rights Reserved
              </td>
            </tr>
          </table>
  `;
}
