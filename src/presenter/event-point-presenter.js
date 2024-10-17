import EventPointView from '../view/event-point-view.js';
import EventEditView from '../view/form-edit-view.js';
import { remove, render, replace } from '../framework/render.js';

export default class EventPointPresenter {
  #container = null;
  #eventPointsModel = null;
  #eventPointComponent = null;
  #eventEditFormComponent = null;
  #handleDataChange = null;
  #point = null;

  constructor({container, eventPointsModel, onDataChange}) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;
    const replacePointToForm = () => {
      replace(this.#eventEditFormComponent, this.#eventPointComponent);
    };

    const replaceFormToPoint = () => {
      replace(this.#eventPointComponent, this.#eventEditFormComponent);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const prevEventPointComponent = this.#eventPointComponent;
    const prevEventEditFormComponent = this.#eventEditFormComponent;

    this.#eventPointComponent = new EventPointView({
      point: point,
      offers: this.#eventPointsModel.getOffersById(point.type, point.offers),
      destinations: this.#eventPointsModel.getDestinationById(point.destination),
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick
    });
    this.#eventEditFormComponent = new EventEditView({
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


    if (prevEventPointComponent === null || prevEventEditFormComponent === null) {
      render(this.#eventPointComponent, this.#container);
    }

    if (prevEventPointComponent && prevEventPointComponent.element && this.#container.contains(prevEventPointComponent.element)) {
      replace(this.#eventPointComponent, prevEventPointComponent);
    }

    if (prevEventEditFormComponent && prevEventEditFormComponent.element && this.#container.contains(prevEventEditFormComponent.element)) {
      replace(this.#eventEditFormComponent, prevEventEditFormComponent);
    }

    remove(prevEventPointComponent);
    remove(prevEventEditFormComponent);
  }

  destroy() {
    remove(this.#eventPointComponent);
    remove(this.#eventEditFormComponent);
  }

  #handleFavoriteClick = () => {
    const updatedPoint = {...this.#point, isFavorite: !this.#point.isFavorite};
    this.#handleDataChange(updatedPoint);
  };
}
