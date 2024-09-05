import BoardPresenter from './presenter/board-presenter.js';
import EventPointsModel from './model/event-points-model.js';
import FilterModel from './model/filters-model.js';

const tripEventsElement = document.querySelector('.trip-events');
const eventPointsModel = new EventPointsModel();
const filterModel = new FilterModel();
const boardPresenter = new BoardPresenter({
  container: tripEventsElement, eventPointsModel, filterModel
});

boardPresenter.init();
