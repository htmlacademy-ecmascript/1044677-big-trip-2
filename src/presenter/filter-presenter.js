import { render, replace, remove } from '../framework/render.js';
import FiltersView from '../view/filter-view.js';
import { filterEventPoints } from '../utils.js';
import { FilterType, UpdateType } from '../const.js';


export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #eventsPointsModel = null;
  #filterComponent = null;

  constructor({filterContainer, filterModel, eventsPointsModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#eventsPointsModel = eventsPointsModel;

    // this.#eventsPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#eventsPointsModel.points;

    return Object.values(FilterType).map((type) => ({
      type,
      isEnable: filterEventPoints[type](points).length > 0,
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FiltersView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange,
    });

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
