
import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD } from './env.js';

// It's best if this matches the user in auth.user
export const accountEmail = 'isnake1011@gmail.com';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: accountEmail,
        pass: EMAIL_PASSWORD,
    },
});


export default transporter;
