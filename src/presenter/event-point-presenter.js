import EventPointView from '../view/event-point-view.js';
import EventEditView from '../view/form-edit-view.js';
import { render, replace } from '../framework/render.js';

export default class EventPointPresenter {
  #container = null;
  #eventPointsModel = null;

  constructor({container, eventPointsModel}) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
  }

  init(point) {
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
      },
      // onFavoriteClick: this.#handleFavoriteClick
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

    render(eventPointComponent, this.#container);
  }
}
