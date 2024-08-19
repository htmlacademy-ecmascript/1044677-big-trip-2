import AbstractView from '../framework/view/abstract-view.js';
import { NoEventsMessage } from '../const.js';
import { FilterType } from '../const.js';


function createNoEventPointsTemplate(filterType) {
  // console.log(filterType);
  const noEventsTextValue = NoEventsMessage[FilterType[filterType]];

  return (`
    <p class="trip-events__msg">${noEventsTextValue}</p>`
  );
}

export default class NoEventPointsView extends AbstractView {
  #filter = null;

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createNoEventPointsTemplate(this.#filter);
  }
}
