import FilterView from '../view/filter-view.js';
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
    this.#eventPointsModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#eventPointsModel.points;
    const filteredPoints = filterEventPoints(points);
     console.log('Filtered Points:', filteredPoints);
    // const pointsFilter = (arr, type) => arr.find((point) => point.type === type);

    return filterEventPoints(points);
    // return [
    //   {
    //     type: FilterType.EVERYTHING,
    //     name: 'everything',
    //     count: pointsFilter(filterEventPoints(points), FilterType.EVERYTHING).count,
    //   },
    //   {
    //     type: FilterType.FUTURE,
    //     name: 'future',
    //     count: pointsFilter(filterEventPoints(points), FilterType.FUTURE).count,
    //   },
    //   {
    //     type: FilterType.PRESENT,
    //     name: 'present',
    //     count: pointsFilter(filterEventPoints(points), FilterType.PRESENT).count,
    //   },
    //   {
    //     type: FilterType.PAST,
    //     name: 'past',
    //     count: pointsFilter(filterEventPoints(points), FilterType.PAST).count,
    //   },
    // ];
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
