import { createTransport } from "nodemailer";
import env from "../utils/env.util.js"; // Asegúrate de importar correctamente el módulo env.util.js

export default async function sendEmail(data) {
  try {
    const transport = createTransport({
      service: "gmail",
      port: env.PORT,
      auth: {
        user: env.GOOGLE_EMAIL,
        pass: env.GOOGLE_PASSWORD,
      },
    });
    await transport.sendMail({
      from: `TUFRUTIYA <${env.GOOGLE_EMAIL}>`,
      to: data.email,
      subject: `USER ${data.name.toUpperCase()} REGISTERED!`,
      html: `<h1>USER REGISTERED!</h1>,
          <p>VERIFY CODE: ${data.verifiedCode}</p>
        `,
    });
  } catch (error) {
    throw error;
  }
}
