import FilterView from '../view/filter-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventPointView from '../view/event-point-view.js';
import EventEditView from '../view/form-edit-view.js';
import TripInfoView from '../view/trip-info-view.js';
import {render, replace} from '../framework/render.js';
import {RenderPosition} from '../framework/render.js';
import EventCreateView from '../view/form-create-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');

export default class BoardPresenter {
  #container = null;
  #eventPointsModel = null;
  #newEventButtonComponent = null;

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

    // this.#renderEventEditForm(
    //   this.#eventPoints[0],
    //   this.#eventPointsModel.getOffersById(this.#eventPoints[0].type, this.#eventPoints[0].offers),
    //   this.#eventPointsModel.getOffersByType(this.#eventPoints[0].type),
    //   this.#eventPointsModel.getDestinationById(this.#eventPoints[0].destination)
    // );

    for (let i = 1; i < this.#eventPoints.length; i++) {
      this.#renderEventPoint(
        this.#eventPoints[i],
        this.#eventPointsModel.getOffersById(this.#eventPoints[i].type, this.#eventPoints[i].offers),
        this.#eventPointsModel.getDestinationById(this.#eventPoints[i].destination)
      );
    }

    this.#newEventButtonComponent = new NewEventButtonView({
      onClick: this.#handleNewEventButtonClick
    });
  }

  #renderEventPoint(points, offers, destinations) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventPointComponent = new EventPointView({
      points, offers, destinations,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const eventEditFormComponent = new EventEditView({
      points, checkedOffers, offers, destinations,
      onFormSubmit: () => {
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

  // #renderEventEditForm(points, checkedOffers, offers, destinations) {
  //   const eventEditFormComponent = new EventEditView({points, checkedOffers, offers, destinations});

  //   render(eventEditFormComponent, this.#eventListComponent.element);
  // }

  #handleNewEventButtonClick = () => {
    render(this.#eventCreateComponent, this.#eventListComponent.element);
  };
}
