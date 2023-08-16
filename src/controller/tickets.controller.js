import {getAllTickets,postNewTicket,getById} from "../services/tickets.service.js"
import config from '../config/config.js';
import { sendMailMessage } from "./email.controller.js";
export const getTickets =async (req,res)=>{
   	let tickets = await getAllTickets();
    res.send(tickets);
}

export const getTicketById =async (req,res)=>{
    let ticketId=req.params.tid;
    let tickets = await getById(ticketId);
    res.send(tickets);
}

export const createNewTicket =async (req,res) =>{
    //try{
    let cartId= req.params.cid;
    let purchaser=req.user;
    //if (!purchaser) purchaser="pepito@gmail.com";
    let wasTicketCreatedSuccesfully = await postNewTicket(cartId,purchaser);
    let ticket= await getById(wasTicketCreatedSuccesfully._id)
    
    let html1=`<h1>compra realizada </h1><br>
                <p>Usted esta recibiendo este mensaje porque ha realizado una compra en nuestra tienda de E-Commerce.
                El Numero de ticker es ${ticket._id} por un valor de ${ticket.amount}</p>`
    let html2= ticket.products.map((producto)=>{
        let texto=`<h2>
                        ${producto.pid.title}
                    </h2>
                    <br>
                    <p>
                        <img src=${producto.pid.thumbnail} alt=${producto.pid.title} height="50px" width="auto" />
                    </p>
                    <br>
                    <p>Cantidad: ${producto.quant}</p>
                    <br>
                    <p>Precio:$ ${producto.pid.price}</p>
                    <br>`
                return texto;
    })
    
    const ticketMail = {
        to: ticket.purchaser,
        from: "Ecommerce Store" + config.gmailAccount,
        subject: `Ticket de compra`,
        html: html1+html2,
    };
    let mailEnviado=await sendMailMessage(ticketMail);
    res.send({ status: "Success", message: `Ticket creado con exito`, tid:`${wasTicketCreatedSuccesfully._id}`});
    // }catch{
    //     res.status(400).send({ status: "Error", message: "No se pudo crear Ticket" });
    // } 
}
