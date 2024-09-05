export default class FilterModel {
  #currentFilter = 'EVERYTHING';

  get сurrentFilter() {
    return this.#currentFilter;
  }

  set сurrentFilter(filter) {
    this.#currentFilter = filter;
  }
}
