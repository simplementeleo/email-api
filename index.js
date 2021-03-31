const nodemailer = require("nodemailer");
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.post('/email', (req, res) => {
    const data = req.body;
    async function main() {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, 
            auth: {
                user: 'ibizawashservicecontact@gmail.com',
                pass: 'qbjjckcadrsruyxe',
            },
            connectionTimeout: 5 * 60 * 1000, 
        });
        let info = await transporter.sendMail({
            from: data.lavado === '' ? 'Lavado '+data.name+' '+data.surname:'Lavado '+data.lavado +'<ibizawashservicecontact@gmail.com>',
            to: "fetchapipublic@gmail.com", 
            subject: data.lavado === '' ? 'Lavado para '+data.name+' '+data.surname:'Lavado '+data.lavado,
            html: `
         
           <div style="max-width: 600px; margin: 0 auto;">
                <div style="padding: 34px;border-radius: 10px 10px 0 0; background: #065f46; text-align: center;">
                    <h1 style="color: white; text-align: center;">Ibiza Wash Service</h1>
                </div>
                <div style="background: #eee; padding: 7rem;">
                    <h1>Hola! Soy ${data.name} ${data.surname}</h1>
                    <h2>Requiero de sus servicios para un ${data.lavado === '' ? 'lavado.':'lavado '+data.lavado}</h2>
                    <p style="font-size: 1rem;">Mensaje: ${data.message}</p>
                    <h3>Contactame por:</h3>
                    <ul style="font-size: 1rem;">
                        <li>Correo: ${data.email}</li>
                        <li>Número telefónico: ${data.phone}</li>
                    </ul>
                </div>
                <div style="padding: 30px;border-radius: 0 0 10px 10px; background: #065f46;">
                </div>
           </div>
            `,
        });
    }
    main().catch(console.error);
})

app.listen(3000, () => {})
