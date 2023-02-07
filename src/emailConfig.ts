import nodemailer from 'nodemailer';
interface settingMailInterface {
    host: string,
    port: number,
    secure: boolean,
    auth: {
        user: string,
        pass: string
    }
}

const settingMail: settingMailInterface = {
    host: "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: String(process.env.EMAIL_USER),
        pass: String(process.env.EMAIL_PASSWORD),
    },
}
const transporter = nodemailer.createTransport(settingMail);
// checking connection

export default transporter;
