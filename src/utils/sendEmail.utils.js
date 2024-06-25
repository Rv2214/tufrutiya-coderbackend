import { createTransport } from "nodemailer";
import env from "../utils/env.util.js";
import { generateResetToken } from "./token.utils.js";

const sendEmail = async (data) => {
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
      html: `<h1>FELICITACIONES. TE HAS REGISTRADO EN TU FRUTI YA!!</h1>,
          <p>VERIFY CODE: ${data.verifiedCode}</p>
        `,
    });
  } catch (error) {
    throw error;
  }
};

const sendResetPasswordEmail = async (data) => {
  try {
    const token = generateResetToken(data._id);
    const resetLink = `http://localhost:8080/sessions/resetpassword/${token}`;
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
      subject: `Restablecer contraseña de TUFRUTIYA`,
      html: `
        <h1>Restablecer contraseña</h1>
        <p>Hola ${data.name},</p>
        <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Este enlace expirará en 1 hora.</p>
      `,
    });
  } catch (error) {
    throw error;
  }
};

export { sendEmail, sendResetPasswordEmail };
