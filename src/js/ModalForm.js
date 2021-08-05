export default class ModalForm {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.container = document.querySelector('.form-container');
  }

  static createEditForm() {
    const formEl = document.createElement('form');
    formEl.classList.add('form');
    formEl.classList.add('edit-form');
    formEl.innerHTML = `
      <div class="form-title-container">
        <h3 class="form-title"></h3>
      </div>
      <label>
        <span>Краткое описание</span>
        <input type="text" class="input name-input" name="name" required>
      </label>
      <label>
        <span>Подробное описание</span>
        <input type="text" class="input description-input" name="description" required>
      </label>
      <div class="form-buttons">
        <button class="btn form-btn save-btn" type="submit">Ok</button>
        <button class="btn form-btn cancel-btn" type="reset">Отмена</button>
      </div>
    `;

    return formEl;
  }

  static createDeleteForm() {
    const formEl = document.createElement('form');
    formEl.classList.add('form');
    formEl.classList.add('delete-form');
    formEl.innerHTML = `
      <div class="form-title-container">
        <h3 class="form-title">Удалить тикет</h3>
      </div>
      <p>Вы уверены, что хотите удалить тикет? Это действие необратимо</p>
      <div class="form-buttons">
        <button class="btn form-btn save-btn" type="submit" name="save">Ok</button>
        <button class="btn form-btn cancel-btn" type="reset" name="cancel">Отмена</button>
      </div>
    `;

    return formEl;
  }

  showEditForm(ticket = null) {
    this.closeForm();
    const form = ModalForm.createEditForm();
    this.container.appendChild(form);

    const titleEl = document.querySelector('.form-title');

    if (!ticket) {
      titleEl.textContent = 'Добавить тикет';
      form.name.value = '';
      form.description.value = '';
    } else {
      titleEl.textContent = 'Изменить тикет';
      form.name.value = ticket.name;
      form.description.value = ticket.description;
    }
  }

  showDeleteForm() {
    this.closeForm();
    const form = ModalForm.createDeleteForm();
    this.container.appendChild(form);
  }

  closeForm() {
    const form = this.container.querySelector('.form');

    if (form) {
      form.remove();
    }
  }

  getFormData() {
    const form = this.container.querySelector('.form');
    return new FormData(form);
  }
}
