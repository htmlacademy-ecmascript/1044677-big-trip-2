import AbstractView from '../framework/view/abstract-view.js';
import { NoEventsMessage } from '../const.js';

function createNoEventPointsTemplate(currentFilter) {
  const noEventsTextValue = NoEventsMessage[currentFilter];
  return (
    `<p class="trip-events__msg">${noEventsTextValue}</p>`
  );
}

export default class NoEventPointsView extends AbstractView {
  #filter = null;
  #filterModel = null;

  constructor(filterModel) {
    super();
    this.#filterModel = filterModel;
    this.#filter = filterModel.filter;
  }

  get template() {
    return createNoEventPointsTemplate(this.#filter);
  }
}
