import FilterView from '../view/filter-view.js';
import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventPointView from '../view/event-point-view.js';
import EventEditView from '../view/form-edit-view.js';
import EventsBoardView from '../view/events-board-view.js';
import TripInfoView from '../view/trip-info-view.js';
import {render} from '../render.js';
import {RenderPosition} from '../render.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-body__page-main');

export default class BoardPresenter {
  boardComponent = new EventsBoardView();
  sortComponent = new SortView();
  eventListComponent = new EventListView();
  filterComponent = new FilterView();
  tripInfoComponent = new TripInfoView();
  formEditComponent = new EventEditView();
  eventPointComponent = new EventPointView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.filterComponent, tripMainElement);
    render(this.tripInfoComponent, tripMainElement, RenderPosition.AFTERBEGIN);
    render(this.sortComponent, this.container);
    render(this.boardComponent, this.container);
    render(this.eventListComponent, siteMainElement);
    render(this.formEditComponent,this.boardComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(this.eventPointComponent, this.boardComponent.getElement());
    }
  }
}
