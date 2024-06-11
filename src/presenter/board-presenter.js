import EventListView from '../view/event-list-view.js';
import SortView from '../view/sort-view.js';
import EventPointView from '../view/event-point-view.js';
import EventEditView from '../view/form-edit-view.js';
import {render} from '../render.js';
import EventsBoardView from '../view/events-board-view.js';

export default class BoardPresenter {
  boardComponent = new EventsBoardView();
  sortComponent = new SortView();
  eventListComponent = new EventListView();

  constructor({container}) {
    this.container = container;
  }

  init() {
    render(this.sortComponent, this.container);
    render(this.boardComponent, this.container);
    render(new EventEditView(),this.boardComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventPointView(), this.eventListComponent.getElement());
    }
  }
}
