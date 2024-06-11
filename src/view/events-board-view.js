import {createElement} from '../render.js';

function createEventsBoardTemplate() {
  return '<section class="trip-events"></section>';
}

export default class EventsBoardView {
  getTemplate() {
    return createEventsBoardTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
