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
  formEditComponent = new EventEditView();
  eventListComponent = new EventListView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.filterComponent, tripMainElement);
    render(this.sortComponent, this.container);
    render(this.eventListComponent, this.container);
    render(this.formEditComponent,this.eventListComponent.getElement());
    render(this.tripInfoComponent, tripMainElement, RenderPosition.AFTERBEGIN);

    for (let i = 0; i < 3; i++) {
      render(new EventPointView(), this.eventListComponent.getElement());
    }
  }
}
