import express from "express";
import cors from "cors";

import { MercadoPagoConfig, Preference } from "mercadopago";

// Agrega credenciales
const client = new MercadoPagoConfig({
     accessToken: "APP_USR-5876905873483712-102017-ba46c0be34f4b6268ec22fc73c7c3499-2030282465",
    })

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Soy el server :)")
})

app.post("/createPreference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.unitPrice),
                    currency_id: "COL", 
                },
            ],
            back_urls: {
                success: "https://www.google.com",
                failure: "https://www.youtube.com",
                pending: "https://www.netflix.com",
            },
            // despues del pago se devuelve
            auto_return: "approved",
            notification_url: "https://4795-186-183-200-125.ngrok-free.app/webhook"
        };

        const preference = new Preference(client);
        const result = await preference.create({body});
        res.json({
            id: result.id,
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            err: "Ocurrio un error al crear la preferencia"
        });
    }
});

// Ruta para recibir el webhook
app.post("/webhook", async function (req, res){
    const paymentId = req.query.id;
    try {
        const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${client.accessToken}`
            }
        });
        if (response.ok){
            const data = await response.json();
            console.log(data)
        }

        res.sendStatus(200);

    } catch (error) {
        
        console.error("Error:", error);
        res.sendStatus(500)

    }
})

// url de donde se recibe la notificacion

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port} `)
})