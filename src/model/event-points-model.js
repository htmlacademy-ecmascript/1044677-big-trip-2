import { EVENT_POINTS_COUNT } from '../const.js';
import { mockDestinations } from '../mock/destination-points.js';
import { mockOffers } from '../mock/offers.js';
import { getRandomEventPoint } from '../mock/event-points';

export default class EventPointsModel {
  points = Array.from({length: EVENT_POINTS_COUNT}, getRandomEventPoint);
  offers = mockOffers;
  destinations = mockDestinations;

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getDestinations() {
    return this.destinations;
  }

}
