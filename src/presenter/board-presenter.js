import FilterView from '../view/filter-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventPointView from '../view/event-point-view.js';
import EventEditView from '../view/form-edit-view.js';
import TripInfoView from '../view/trip-info-view.js';
import {render, replace, RenderPosition} from '../framework/render.js';
import EventCreateView from '../view/form-create-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');

export default class BoardPresenter {
  #container = null;
  #eventPointsModel = null;
  #newEventButtonComponent = null; //разобраться с отрисовкой кнопки

  #sortComponent = new SortView();
  #filterComponent = new FilterView();
  #tripInfoComponent = new TripInfoView();
  #eventListComponent = new EventListView();
  #eventCreateComponent = new EventCreateView();

  #eventPoints = [];
  constructor({container, eventPointsModel, newEventButtonComponent}) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#newEventButtonComponent = newEventButtonComponent;
  }

  init() {
    this.#eventPoints = [...this.#eventPointsModel.points];
    render(this.#filterComponent, tripMainElement);
    render(this.#sortComponent, this.#container);
    render(this.#eventListComponent, this.#container);
    render(this.#tripInfoComponent, tripMainElement, RenderPosition.AFTERBEGIN);


    for (let i = 1; i < this.#eventPoints.length; i++) {
      this.#renderEventPoint(
        this.#eventPoints[i],
        this.#eventPointsModel.getOffersByType(this.#eventPoints[i].type),
        this.#eventPointsModel.getOffersById(this.#eventPoints[i].type, this.#eventPoints[i].offers),
        this.#eventPointsModel.getDestinationById(this.#eventPoints[i].destination)
      );
    }

    this.#newEventButtonComponent = new NewEventButtonView({
      onClick: this.#handleNewEventButtonClick
    });
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
      points: point,
      offers: [...this.#eventPointsModel.getOffersById(point.type, point.offers)],
      destinations: this.#eventPointsModel.getDestinationById(point.destination),
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const eventEditFormComponent = new EventEditView({
      points: point,
      offers: this.#eventPointsModel.getOffersByType(point.type),
      checkedOffers: [...this.#eventPointsModel.getOffersById(point.type, point.offers)],
      destinations: this.#eventPointsModel.getDestinationById(point.destination),
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

  #handleNewEventButtonClick = () => {
    render(this.#eventCreateComponent, this.#eventListComponent.element);
  };
}
