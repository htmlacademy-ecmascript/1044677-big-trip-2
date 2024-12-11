import Observable from '../framework/observable.js';

export default class FilterModel extends Observable {
  #currentFilter = 'EVERYTHING';

  get currentFilter() {
    return this.#currentFilter;
  }

  setCurrentFilter(updateType,filter) {
    this.#currentFilter = filter;
    this._notify(updateType, filter);
  }
}
