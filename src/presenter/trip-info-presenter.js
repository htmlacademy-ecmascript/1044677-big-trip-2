import TripInfoView from '../view/trip-info-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';

export default class TripInfoPresenter {
  #offers = null;
  #container = null;
  #destinations = null;
  #eventPointsModel = null;
  #tripInfoComponent = null;

  constructor({ container, eventPointsModel }) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;

    this.#eventPointsModel.addObserver(this.#handleModelEvent);
  }

  #tripTitleData(points) {
    const sortedPoints = [...points].sort((a, b) => a.dateFrom - b.dateFrom);
    const firstPoint = sortedPoints[0];
    const lastPoint = sortedPoints[sortedPoints.length - 1];

    let routeTitle = '';
    if (sortedPoints.length > 3) {
      const firstName = this.#eventPointsModel.getDestinationById(firstPoint.destination);
      const lastName = this.#eventPointsModel.getDestinationById(lastPoint.destination);
      routeTitle = `${firstName.name} — ... — ${lastName.name}`;
    } else {
      routeTitle = sortedPoints.map((point) => {
        const destination = this.#eventPointsModel.getDestinationById(point.destination);
        return destination ? destination.name : '';
      }).join(' — ');
    }

    return {
      title: routeTitle,
    };
  }

  #tripDates(points) {
    if (points.length === 0) {
      return {
        startDate: null,
        endDate: null
      };
    }

    return {
      startDate: points[0].dateFrom,
      endDate: points[points.length - 1].dateTo
    };
  }

  #getTotalPrice(points) {
    return points.reduce((sum, point) => {
      sum += point.basePrice + this.#getOffersPrice(point.offers, point.type);
      return sum;
    }, 0);
  }

  #getOffersPrice(selectedOffers, type) {
    const offers = this.#offers.find((item) => item.type === type)?.offers || [];
    return offers.reduce((sum, item) => {
      if (selectedOffers.includes(item.id)) {
        sum += item.price;
      }
      return sum;
    }, 0);
  }

  init(points) {
    this.#destinations = this.#eventPointsModel.destinations;
    this.#offers = this.#eventPointsModel.offers;

    this.#tripInfoComponent = new TripInfoView({
      title: this.#tripTitleData(points).title,
      tripDates: this.#tripDates(points),
      totalCost: this.#getTotalPrice(points)
    });
    render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    remove(this.#tripInfoComponent);
    this.#eventPointsModel.removeObserver(this.#handleModelEvent);
  }

  #handleModelEvent = () => {
    if (this.#tripInfoComponent) {
      const points = this.#eventPointsModel.points;
      this.#tripInfoComponent.updateData({
        title: this.#tripTitleData(points).title,
        tripDates: this.#tripDates(points),
        totalCost: this.#getTotalPrice(points)
      });
    }
  };
}
