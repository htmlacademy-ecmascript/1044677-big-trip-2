import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view.js';
import EventListView from '../view/event-list-view.js';
import EventPointPresenter from './event-point-presenter.js';
import NoEventPointsView from '../view/no-event-points-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { sortByDate, sortByTime, sortByPrice } from '../utils.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { filterEventPoints } from '../utils.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');

export default class BoardPresenter {
  #container = null;
  #filterModel = null;
  #sortComponent = null;
  #eventPointsModel = null;
  #newEventButtonComponent = null;
  #currentSortType = SortType.DAY;
  #tripInfoComponent = new TripInfoView();
  #eventListComponent = new EventListView();
  #noEventPointsComponent = null;
  #eventPointsPresenters = new Map();

  constructor({container, eventPointsModel, filterModel}) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#filterModel = filterModel;

    this.#eventPointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const currentFilter = this.#filterModel.filter;
    const filteredFilters = filterEventPoints(this.#eventPointsModel.points);
    const currentFilterPoints = filteredFilters.find((filter) => filter.type === currentFilter);
    const filteredPoints = currentFilterPoints ? currentFilterPoints.points : [];

    switch(this.#currentSortType) {
      case SortType.DAY:
        return [...filteredPoints].sort(sortByDate);
      case SortType.PRICE:
        return [...filteredPoints].sort(sortByPrice);
      case SortType.TIME:
        return [...filteredPoints].sort(sortByTime);
    }
    return filteredPoints;
  }

  init() {
    this.#renderTripInfo();
    this.#renderSort();
    this.#renderBoard();
    this.#attachNewEventButton();
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
    this.#sortComponent.element.remove();
    this.#renderSort();
    this.#renderBoard();
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
    remove(this.#sortComponent);
    remove(this.#noEventPointsComponent);
    remove(this.#eventListComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleModeChange = () => {
    this.#eventPointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, updatedPoint) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#eventPointsModel.updatePoint(updateType, updatedPoint);
        break;
      case UserAction.ADD_POINT:
        this.#eventPointsModel.addPoint(updateType, updatedPoint);
        break;
      case UserAction.DELETE_POINT:
        this.#eventPointsModel.deletePoint(updateType, updatedPoint);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this.#eventPointsPresenters.has(data.id)) {
          this.#eventPointsPresenters.get(data.id).init(data);
        } else {
          this.#clearEventPointsList();
          this.#renderBoard();
        }
        break;
      case UpdateType.MINOR:
        this.#clearEventPointsList();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderSort();
        this.#renderBoard();
        break;
    }
  };

  #clearEventPointsList() {
    this.#eventPointsPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPointsPresenters.clear();
  }

  #renderNoEvents() {
    if(this.points.length === 0) {
      this.#noEventPointsComponent = new NoEventPointsView(this.#filterModel);
      render(this.#noEventPointsComponent, this.#container);
    }
  }

  #renderBoard() {
    remove(this.#noEventPointsComponent);
    this.#noEventPointsComponent = null;

    if (this.points.length === 0) {
      this.#renderNoEvents();
      return;
    }

    render(this.#eventListComponent, this.#container);

    for (let i = 0; i < this.points.length; i++) {
      this.#renderEventPoint(this.points[i]);
    }
  }

  #attachNewEventButton() {
    this.#newEventButtonComponent = document.querySelector('.trip-main__event-add-btn');
    this.#newEventButtonComponent.addEventListener('click', this.#handleNewEventButtonClick);
  }

  #handleNewEventButtonClick = () => {
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#handleModeChange();
    this.#currentSortType = SortType.DAY;
    this.#clearBoard({resetSortType: true});
    this.#renderSort();
    this.#renderBoard();

    const eventPointPresenter = new EventPointPresenter({
      container: this.#eventListComponent.element,
      eventPointsModel: this.#eventPointsModel,
      filterModel: this.#filterModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    const newPoint = eventPointPresenter.createPoint();
    this.#eventPointsPresenters.set(newPoint, eventPointPresenter);
  };
}
