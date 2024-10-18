export default class FilterModel {
  #currentFilter = 'EVERYTHING';

  get currentFilter() {
    return this.#currentFilter;
  }

  set currentFilter(filter) {
    this.#currentFilter = filter;
  }
}
