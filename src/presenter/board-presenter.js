import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';
import EventListView from '../view/event-list-view.js';
import EventPointPresenter from './event-point-presenter.js';
import NoEventPointsView from '../view/no-event-points-view.js';
import { sortByDate, sortByTime, sortByPrice } from '../utils.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { filterEventPoints } from '../utils.js';
import { SortType, UpdateType, UserAction } from '../const.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');

export default class BoardPresenter {
  #container = null;
  #filterModel = null;
  #sortComponent = null;
  #eventPointsModel = null;
  #currentSortType = SortType.DAY;
  #tripInfoComponent = new TripInfoView();
  #eventListComponent = new EventListView();
  #eventPointsPresenters = new Map();

  constructor({container, eventPointsModel, filterModel}) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#filterModel = filterModel;

    this.#eventPointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch(this.#currentSortType) {
      case SortType.DAY:
        return [...this.#eventPointsModel.points].sort(sortByDate);
      case SortType.PRICE:
        return [...this.#eventPointsModel.points].sort(sortByPrice);
      case SortType.TIME:
        return [...this.#eventPointsModel.points].sort(sortByTime);
    }

    return this.#eventPointsModel.points;
  }

  init() {
    this.#renderTripInfo();
    this.#renderSort();
    this.#renderFilter();
    // this.#renderEventsList();
    this.#renderBoard();
    this.#renderNoEvents();
  }

  #renderEventPoint(point) {
    const eventPointPresenter = new EventPointPresenter({
      container: this.#eventListComponent.element,
      eventPointsModel: this.#eventPointsModel,
      filterModel: this.#filterModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    eventPointPresenter.init(point);
    this.#eventPointsPresenters.set(point.id, eventPointPresenter);
  }

  #renderTripInfo() {
    render(this.#tripInfoComponent, tripMainElement, RenderPosition.AFTERBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEventPointsList();
    this.#renderBoard();
    this.#sortComponent.element.remove();
    this.#renderSort();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#eventPointsPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPointsPresenters.clear();
    // remove(this.#sortComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleModeChange = () => {
    this.#eventPointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#eventPointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#eventPointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#eventPointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPointsPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #renderFilter() {
    const filters = filterEventPoints(this.#eventPointsModel.points);
    render(new FilterView(filters,this.#filterModel),tripMainElement);
  }

  // #renderEventsList() {
  //   render(this.#eventListComponent, this.#container);
  //   this.#renderSort();
  // }

  #clearEventPointsList() {
    this.#eventPointsPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPointsPresenters.clear();
  }

  #renderNoEvents() {
    if(this.#eventPointsModel.points.length === 0) {
      render(new NoEventPointsView(this.#filterModel), this.#container);
    }
  }

  #renderBoard() {
    for (let i = 0; i < this.points.length; i++) {
      this.#renderEventPoint(
        this.points[i],
        this.#eventPointsModel.getOffersByType(this.points[i].type),
        this.#eventPointsModel.getOffersById(this.points[i].type, this.points[i].offers),
        this.#eventPointsModel.getDestinationById(this.points[i].destination)
      );
    }

    render(this.#eventListComponent, this.#container);
  }
}
