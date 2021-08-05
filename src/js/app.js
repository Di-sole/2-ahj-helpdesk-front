import Widget from './Widget';
import TicketList from './TicketList';
import ModalForm from './ModalForm';

const formContainer = document.querySelectorAll('.form-container');
const modalForm = new ModalForm(formContainer);

const ticketListContainer = document.querySelector('.ticket-list-container');
const ticketList = new TicketList(ticketListContainer);

const widget = new Widget(modalForm, ticketList);
widget.start();
