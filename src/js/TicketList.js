import makeRequest from './makeRequest';

export default class TicketList {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.activeTicket = null;
  }

  redraw(tickets) {
    this.parentEl.innerHTML = '';

    const ticketList = document.createElement('table');
    ticketList.className = 'ticket-list';
    const editBtn = `<button class="small-btn edit-btn">${String.fromCharCode(0x270E)}</button>`;
    const deleteBtn = `<button class="small-btn delete-btn">${String.fromCharCode(0x2A2F)}</button>`;

    tickets.forEach((o) => {
      const ticketStatus = o.status === 'true' ? String.fromCharCode(0x2713) : '';
      const date = `${o.created.substring(0, 10)} ${o.created.substring(11, 16)}`;

      const ticketEl = document.createElement('tr');
      ticketEl.className = 'ticket-element';
      ticketEl.dataset.id = o.id;
      ticketEl.dataset.status = o.status;
      ticketEl.innerHTML = `
        <td class="ticket-status">
          <div class="ticket-status-border">${ticketStatus}<div>
        </td>
        <td class="ticket-name">${o.name}</td>
        <td class="ticket-date">${date}</td>
        <td class="ticket-btns">
          <div class="ticket-btns-container">${editBtn} ${deleteBtn}</div>
        </td>
      `;

      ticketList.appendChild(ticketEl);
    });

    this.parentEl.appendChild(ticketList);
  }

  async getTicket(ticketId) {
    const params = {
      method: 'ticketById',
      id: ticketId,
    };

    this.activeTicket = await makeRequest('GET', params);
    return this.activeTicket;
  }

  async deleteTicket() {
    const params = {
      method: 'deleteTicket',
      id: this.activeTicket.id,
    };

    const newList = await makeRequest('GET', params);
    this.redraw(newList);
    this.activeTicket = null;
  }

  async saveTicket(data) {
    const params = {
      method: 'createTicket',
      name: data.get('name'),
      description: data.get('description'),
    };

    if (this.activeTicket) {
      params.id = this.activeTicket.id;
      params.status = this.activeTicket.status;
    }

    const newList = await makeRequest('POST', params);
    this.redraw(newList);
    this.activeTicket = null;
  }

  showFullTicket(ticket) {
    const description = this.parentEl.querySelector('.ticket-description');

    if (description) {
      description.remove();
    } else {
      const ticketToShow = this.parentEl.querySelector(`[data-id="${ticket.id}"]`);
      const ticketDescriptionEl = `<div class="ticket-description">${ticket.description}</div>`;
      const ticketNameEl = ticketToShow.querySelector('.ticket-name');
      ticketNameEl.insertAdjacentHTML('beforeend', ticketDescriptionEl);
    }
  }

  async changeStatus(ticket) {
    const newStatus = ticket.status === 'false' ? 'true' : 'false';

    const params = {
      method: 'createTicket',
      id: this.activeTicket.id,
      name: ticket.name,
      description: ticket.description,
      status: newStatus,
    };

    const newList = await makeRequest('POST', params);
    this.redraw(newList);
    this.activeTicket = null;
  }
}
