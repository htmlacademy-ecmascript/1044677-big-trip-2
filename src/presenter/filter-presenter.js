import FilterView from '../view/filter-view.js';
import { filterEventPoints } from '../utils.js';
import { UpdateType } from '../const.js';
import { render, replace, remove } from '../framework/render.js';


export default class FilterPresenter {
  #filterModel = null;
  #filterContainer = null;
  #filterComponent = null;
  #eventPointsModel = null;

  constructor({filterContainer, filterModel, eventPointsModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#eventPointsModel = eventPointsModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#eventPointsModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#eventPointsModel.points;
    return filterEventPoints(points);
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;
    this.#filterComponent = new FilterView({
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
