import makeRequest from './makeRequest';

export default class Widget {
  constructor(modalForm, ticketList) {
    this.form = modalForm;
    this.list = ticketList;
  }

  async start() {
    this.list.redraw(await makeRequest('GET', { method: 'allTickets' }));

    document.addEventListener('click', (e) => {
      e.preventDefault();

      if (e.target.classList.contains('add-btn')) {
        this.onAddButton();
      }

      if (e.target.classList.contains('cancel-btn')) {
        this.onCancelButton();
      }

      if (e.target.classList.contains('save-btn')) {
        const editForm = e.target.closest('.edit-form');
        this.onOkButton(editForm);
      }

      if (e.target.classList.contains('edit-btn')) {
        const { id } = e.target.closest('.ticket-element').dataset;
        this.onEditButton(id);
      }

      if (e.target.classList.contains('delete-btn')) {
        const { id } = e.target.closest('.ticket-element').dataset;
        this.onDeleteButton(id);
      }

      if (e.target.classList.contains('ticket-name')) {
        const { id } = e.target.closest('.ticket-element').dataset;
        this.onTicket(id);
      }

      if (e.target.classList.contains('ticket-status-border')) {
        const { id } = e.target.closest('.ticket-element').dataset;
        this.onStatus(id);
      }
    });
  }

  onAddButton() {
    this.list.activeTicket = null;
    this.form.showEditForm();
  }

  onCancelButton() {
    this.list.activeTicket = null;
    this.form.closeForm();
  }

  onOkButton(editForm) {
    if (editForm) {
      const data = this.form.getFormData();
      this.list.saveTicket(data);
    } else {
      this.list.deleteTicket();
    }

    this.form.closeForm();
  }

  async onEditButton(ticketId) {
    const ticket = await this.list.getTicket(ticketId);
    this.form.showEditForm(ticket);
  }

  async onDeleteButton(ticketId) {
    await this.list.getTicket(ticketId);
    this.form.showDeleteForm();
  }

  async onTicket(ticketId) {
    const ticket = await this.list.getTicket(ticketId);
    this.list.showFullTicket(ticket);
  }

  async onStatus(ticketId) {
    const ticket = await this.list.getTicket(ticketId);
    this.list.changeStatus(ticket);
  }
}
