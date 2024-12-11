import FiltersView from '../view/filter-view.js';
import { filterEventPoints } from '../utils.js';
import { FilterType, UpdateType } from '../const.js';
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
    // this.#eventPointsModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#eventPointsModel.points;

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'everything',
        count: filterEventPoints[FilterType.EVERYTHING](points).length,
      },
      {
        type: FilterType.FUTURE,
        name: 'future',
        count: filterEventPoints[FilterType.FUTURE](points).length,
      },
      {
        type: FilterType.PRESENT,
        name: 'present',
        count: filterEventPoints[FilterType.PRESENT](points).length,
      },
      {
        type: FilterType.PAST,
        name: 'past',
        count: filterEventPoints[FilterType.PAST](points).length,
      },
    ];
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
