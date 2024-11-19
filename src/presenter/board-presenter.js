import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';
import EventListView from '../view/event-list-view.js';
import EventPointPresenter from './event-point-presenter.js';
import NoEventPointsView from '../view/no-event-points-view.js';
import { sortByDate, sortByTime, sortByPrice } from '../utils.js';
import { render, RenderPosition } from '../framework/render.js';
import { filterEventPoints } from '../utils.js';
import { SortType } from '../const.js';

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
  #eventPoints = [];

  constructor({container, eventPointsModel, filterModel}) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#filterModel = filterModel;
  }

  get points() {
    return this.#eventPointsModel.points;
  }

  init() {
    this.#eventPoints = [...this.#eventPointsModel.points];
    this.#renderTripInfo();
    this.#renderSort();
    this.#renderFilter();
    this.#renderEventsList();
    this.#renderBoard();
    this.#renderNoEvents();
  }

  #renderEventPoint(point) {
    const eventPointPresenter = new EventPointPresenter({
      container: this.#eventListComponent.element,
      eventPointsModel: this.#eventPointsModel,
      filterModel: this.#filterModel,
      onDataChange: this.#handleEventPointChange,
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
    this.#sortPoints(sortType);
    this.#clearEventPointsList();
    this.#renderBoard();
    this.#sortComponent.element.remove();
    this.#renderSort();
  };

  #sortPoints(sortType) {

    switch(sortType) {
      case SortType.DAY:
        this.#eventPoints.sort(sortByDate);
        break;
      case SortType.PRICE:
        this.#eventPoints.sort(sortByPrice);
        break;
      case SortType.TIME:
        this.#eventPoints.sort(sortByTime);
        break;
    }
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #handleModeChange = () => {
    this.#eventPointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventPointChange = (updatedPoint) => {
    this.#eventPoints = this.#eventPointsModel.updatePoint(this.#eventPoints, updatedPoint);
    this.#eventPointsPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderFilter() {
    const filters = filterEventPoints(this.#eventPointsModel.points);
    render(new FilterView(filters,this.#filterModel),tripMainElement);
  }

  #renderEventsList() {
    render(this.#eventListComponent, this.#container);
  }

  #clearEventPointsList() {
    this.#eventPointsPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPointsPresenters.clear();
  }

  #renderNoEvents() {
    if(this.#eventPoints.length === 0) {
      render(new NoEventPointsView(this.#filterModel), this.#container);
    }
  }

  #renderBoard() {
    for (let i = 0; i < this.#eventPoints.length; i++) {
      this.#renderEventPoint(
        this.#eventPoints[i],
        this.#eventPointsModel.getOffersByType(this.#eventPoints[i].type),
        this.#eventPointsModel.getOffersById(this.#eventPoints[i].type, this.#eventPoints[i].offers),
        this.#eventPointsModel.getDestinationById(this.#eventPoints[i].destination)
      );
    }
  }
}
