import express from "express";
import cors from "cors";

import { MercadoPagoConfig, Preference } from "mercadopago";

// Agrega credenciales
const client = new MercadoPagoConfig({
     accessToken: "APP_USR-5973245531264106-100816-ef497159852a79201dd70d935c5b8f36-1017499700",
    })

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Soy el server :)")
})

app.post("/createPreference", async (req, res) => {
    console.log(req.body)
    try {
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "ARS", 
                },
            ],
            back_urls: {
                success: "https://www.youtube.com/watch?v=Yd4IB4b9Lwk",
                failure: "https://www.youtube.com/watch?v=Yd4IB4b9Lwk",
                pending: "https://www.youtube.com/watch?v=Yd4IB4b9Lwk",
            },
            // despues del pago se devuelve
            auto_return: "approved",
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

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port} `)
})