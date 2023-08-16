import TicketManager from "../dao/ticketsManagerMongo.js";

export let TicketManager1 = new TicketManager("./");

export const getAllTickets = async () => {
    let tickets = await TicketManager1.getAll();
    return tickets;
}

export const getById = async (id) => {
    let tickets = await TicketManager1.getById(id);
    return tickets;
}

export const postNewTicket = async (cartId, purchaser) =>{
    let wasTicketAddedSuccesfully = await TicketManager1.save(cartId, purchaser);
    return wasTicketAddedSuccesfully;
}
