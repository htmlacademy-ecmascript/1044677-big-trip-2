import { mockDestinations } from '../mock/destination-points.js';
import { mockEventPoints } from '../mock/event-points.js';
import { mockOffers } from '../mock/offers.js';

export default class EventPointsModel {
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

  updatePoint(points, update) {
    return points.map((point) => point.id === update.id ? update : point);
  }
}
