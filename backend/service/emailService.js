import nodemailer from 'nodemailer';

// configure email transporter -> from where do we send 
// read sensible data out of .env to secure the data
const createTransporter = () => {

    // .env-check -> are all infos there we need to send an email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Error: Could not read important data from .env!');
    }

    return nodemailer.createTransport({

    // define mailservice and 'login' from sender-email
    host: process.env.SMTP_HOST,                  //  SMTP-Server 
    port: Number(process.env.SMTP_PORT) ,         //  Portnummer: 587 für STARTTLS, 465 für SSL/TLS, 25 ist oft blockiert
    secure: false,                                //  true = SSL/TLS (Port 465), false = STARTTLS (587)

    requireTLS: true,                             //  force TLS-Encryption -> most of the time a must have

    auth: {
        user: process.env.EMAIL_USER,               //  from what email do we send 
        pass: process.env.EMAIL_PASS                //  App-specific password -> not the normal passwort 
    }
    });

}

// User-email -> feedback for successfull submission
export const sendProviderMail = async (to) => {
    const mailOptions = {
        from: process.env.EMAIL_USER ,
        to ,
        subject: 'Thanks for Your submission!',
        text: 'Thank you for submitting your project! We appreciate your contribution. Our team will review it soon.\n\nBest regards,\nThe Team'
    }
    try {
        const transporter = createTransporter();
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfull ' , info.response);
    } catch(err){
        console.error('Email failed: ' , err.message)
    }
}

// Collaps-email -> info of a new submited tool
export const sendColapsMail = async (toolTitle , email) => {
    const mailOptions = {
        from: process.env.EMAIL_USER ,
        to: process.env.EMAIL_COLAPS ,
        subject: 'New tool submited!' ,
        text: `New tool submission from ${email}\n Tooltitle: ${toolTitle}`
    }
    try {
        const transporter = createTransporter();
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfull ' , info.response);
    } catch(err){
        console.error('Email failed: ' , err.message)
    }
}

export const sendColapsContactMail = async (message , email) => {
    const mailOptions = {
        from: process.env.EMAIL_USER ,
        to: process.env.EMAIL_COLAPS ,
        subject: `Contact from ${email}` ,
        text: message
    }
    try {
        const transporter = createTransporter();
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfull ' , info.response)
    } catch(err) {
        console.error('Email failed: ' , err.message)
    }
}

export const sendResetLink = async (email , link) => {

    const mailOptions = {
        from: process.env.EMAIL_USER ,
        to: email ,
        subject: 'Requested Password Reset' ,
        html: `<h2>Passwort Reset</h2>
                <p>Please click on the following link to change your password: </p>
                <a href="${link}">Reset Password Here</a>
                <p>This link will be available for 1 hour!</p>`
    };
    try {
        const transporter = createTransporter();
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch(error) {
        console.error('Error in sending reset Email.' , error.message);
    }
}

