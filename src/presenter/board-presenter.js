import FilterView from '../view/filter-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventPointView from '../view/event-point-view.js';
import EventEditView from '../view/form-edit-view.js';
import TripInfoView from '../view/trip-info-view.js';
import {render} from '../render.js';
import {RenderPosition} from '../render.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');

export default class BoardPresenter {
  sortComponent = new SortView();
  filterComponent = new FilterView();
  tripInfoComponent = new TripInfoView();
  eventListComponent = new EventListView();

  constructor({container, eventPointsModel}) {
    this.container = container;
    this.eventPointsModel = eventPointsModel;
  }

  init() {
    this.eventPoints = [...this.eventPointsModel.getPoints()];
    render(this.filterComponent, tripMainElement);
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);
    render(this.tripInfoComponent, tripMainElement, RenderPosition.AFTERBEGIN);

    render(new EventEditView({
      points: this.eventPoints[0],
      checkedOffers: this.eventPointsModel.getOffersById(this.eventPoints[0].type, this.eventPoints[0].offers),
      offers: this.eventPointsModel.getOffersByType(this.eventPoints[0].type),
      destinations: this.eventPointsModel.getDestinationById(this.eventPoints[0].destination)
    }), this.eventListComponent.getElement()
    );

    for (let i = 1; i < this.eventPoints.length; i++) {
      render(new EventPointView({
        points: this.eventPoints[i],
        offers: this.eventPointsModel.getOffersById(this.eventPoints[i].type, this.eventPoints[i].offers),
        destinations: this.eventPointsModel.getDestinationById(this.eventPoints[i].destination)
      }),
      this.eventListComponent.getElement());
    }
  }
}
