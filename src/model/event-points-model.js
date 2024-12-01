import Observable from '../framework/observable.js';
import { mockDestinations } from '../mock/destination-points.js';
import { mockEventPoints } from '../mock/event-points.js';
import { mockOffers } from '../mock/offers.js';

export default class EventPointsModel extends Observable {
  #points = mockEventPoints;
  #offers = mockOffers;
  #destinations = mockDestinations;

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  getOffersByType(type) {
    const allOffers = this.offers;
    return allOffers.find((offer) => offer.type === type);
  }

  getOffersById(type, offersId) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => offersId.find((id) => item.id === id));
  }

  getDestinationById(id) {
    const allDestinations = this.destinations;
    return allDestinations.find((destination) => destination.id === id);
  }

  // updatePoint(update) {
  //   this.#points.map((point) => point.id === update.id ? update : point);
  //   return this.#points;
  // }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }
    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((task) => task.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }
    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];
    this._notify(updateType);
  }
}
