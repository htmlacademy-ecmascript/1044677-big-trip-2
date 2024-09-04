import AbstractView from '../framework/view/abstract-view.js';
import { NoEventsMessage } from '../const.js';
import { FilterType } from '../const.js';

function createNoEventPointsTemplate(currentFilter) {
  const filterKey = FilterType[currentFilter];
  const noEventsTextValue = NoEventsMessage[filterKey];
  // console.log(currentFilter);
  return (
    `<p class="trip-events__msg">${noEventsTextValue}</p>`
  );
}

export default class NoEventPointsView extends AbstractView {
  #filter = null;

  constructor(filterModel) {
    super();
    this.#filter = filterModel.getCurrentFilter();
  }

  get template() {
    return createNoEventPointsTemplate(this.#filter);
  }
}
