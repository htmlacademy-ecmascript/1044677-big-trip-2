import FilterView from '../view/filter-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import NoEventPointsView from '../view/no-event-points-view.js';
import { render, RenderPosition } from '../framework/render.js';
import { filterEventPoints } from '../utils.js';
import { updatePoint } from '../utils.js';
import EventPointPresenter from './event-point-presenter.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');

export default class BoardPresenter {
  #container = null;
  #eventPointsModel = null;
  #filterModel = null;

  #sortComponent = new SortView();
  #tripInfoComponent = new TripInfoView();
  #eventListComponent = new EventListView();
  #eventPointsPresenters = new Map();
  #eventPoints = [];
  constructor({container, eventPointsModel, filterModel}) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#filterModel = filterModel;
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
      onDataChange: this.#handleEventPointChange
    });

    eventPointPresenter.init(point);
    this.#eventPointsPresenters.set(point.id, eventPointPresenter);
  }

  #renderTripInfo() {
    render(this.#tripInfoComponent, tripMainElement, RenderPosition.AFTERBEGIN);
  }

  #renderSort() {
    render(this.#sortComponent, this.#container);
  }

  #handleEventPointChange = (updatedPoint) => {
    this.#eventPoints = updatePoint(this.#eventPoints, updatedPoint);
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
    for (let i = 1; i < this.#eventPoints.length; i++) {
      this.#renderEventPoint(
        this.#eventPoints[i],
        this.#eventPointsModel.getOffersByType(this.#eventPoints[i].type),
        this.#eventPointsModel.getOffersById(this.#eventPoints[i].type, this.#eventPoints[i].offers),
        this.#eventPointsModel.getDestinationById(this.#eventPoints[i].destination)
      );
    }
  }
}
