import FilterView from '../view/filter-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventPointView from '../view/event-point-view.js';
import EventEditView from '../view/form-edit-view.js';
import TripInfoView from '../view/trip-info-view.js';
import {render, replace, RenderPosition} from '../framework/render.js';
// import EventCreateView from '../view/form-create-view.js';
import NoEventPointsView from '../view/no-event-points-view.js';
import { filterEventPoints } from '../utils.js';
// import FilterModel from '../model/filters-model.js';
// import NewEventButtonView from '../view/new-event-button-view.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');

export default class BoardPresenter {
  #container = null;
  #eventPointsModel = null;
  #filterModel = null;

  #sortComponent = new SortView();
  // #filterComponent = new FilterView();
  #tripInfoComponent = new TripInfoView();
  #eventListComponent = new EventListView();
  // #noEventsComponent = new NoEventPointsView();
  // #eventCreateComponent = new EventCreateView();
  // #newEventButtonComponent = new NewEventButtonView();

  #eventPoints = [];
  constructor({container, eventPointsModel, filterModel}) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    this.#eventPoints = [...this.#eventPointsModel.points];
    this.#renderBoard();
  }

  #renderEventPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventPointComponent = new EventPointView({
      point: point,
      offers: this.#eventPointsModel.getOffersById(point.type, point.offers),
      destinations: this.#eventPointsModel.getDestinationById(point.destination),
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const eventEditFormComponent = new EventEditView({
      point: point,
      offers: this.#eventPointsModel.getOffersByType(point.type),
      checkedOffers: this.#eventPointsModel.getOffersById(point.type, point.offers),
      destinations: this.#eventPointsModel.getDestinationById(point.destination),
      destinationsAll: this.#eventPointsModel.destinations,
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onEditClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(eventEditFormComponent, eventPointComponent);
    }

    function replaceFormToPoint() {
      replace(eventPointComponent, eventEditFormComponent);
    }

    render(eventPointComponent, this.#eventListComponent.element);
  }

  #renderBoard() {
    const filters = filterEventPoints(this.#eventPointsModel.points);
    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);
    render(this.#tripInfoComponent, tripMainElement, RenderPosition.AFTERBEGIN);
    // render(this.#eventCreateComponent, this.#container);
    // render(this.#newEventButtonComponent, tripMainElement);
    render(new FilterView(filters,this.#filterModel),tripMainElement);
    // console.log(this.#filterModel);

    if(this.#eventPoints.length === 0) {
      render(new NoEventPointsView(this.#filterModel), this.#container);
    }


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
