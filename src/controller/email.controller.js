import nodemailer from 'nodemailer';
import config from '../config/config.js';
import __dirname from '../../utils.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailAccount,
        pass: config.gmailAppPassword
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email Server working properly ');
    }
});


function createMessage(user){
const { first_name, last_name, email, age} = user;
const mailOptions ={
    // Cuerpo del mensaje
    from: "E-Commerce Store " + config.gmailAccount,
    to: "leandroschlain@gmail.com",
    subject: "Nuevo usuario registrado.",
    html: `<div>
    <h1>Usted se ha registrado en nuestro E-Commerce</h1>
    <p>Felicitaciones ${first_name} ${last_name} por haberse registrado. Su email registrado es ${email}</p>
    </div>`,
    attachments: []
}
return mailOptions;
}

export const sendEmail = async (req, res) => {
    // Logica
    console.log(req.body)
    let mailData = createMessage(req.body)
    console.log(mailData)
    try {
        let result = transporter.sendMail(mailData, (error, info) => {
            if (error) {
                console.log(error);
                res.status(400).send({ message: "Error", payload: error })
            }
            console.log('Message sent: ', info.messageId);
            res.send({ message: "Success", payload: info })
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: error, message: "No se pudo enviar el email desde:" + config.gmailAccount });
    }

};

