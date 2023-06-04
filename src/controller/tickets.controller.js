import {getAllTickets,postNewTicket} from "../services/tickets.service.js"

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
    if (!purchaser) purchaser="pepito@gmail.com";
    let wasTicketCreatedSuccesfully = await postNewTicket(cartId,purchaser);
    res.send({ status: "Success", message: `Ticket creado con exito`, tid:`${wasTicketCreatedSuccesfully._id}`});
    // }catch{
    //     res.status(400).send({ status: "Error", message: "No se pudo crear Ticket" });
    // } 
}
