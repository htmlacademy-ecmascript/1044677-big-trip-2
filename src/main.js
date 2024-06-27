import BoardPresenter from './presenter/board-presenter.js';
import EventPointsModel from './model/event-points-model.js';

const tripEventsElement = document.querySelector('.trip-events');
const eventPointsModel = new EventPointsModel();
const boardPresenter = new BoardPresenter({
  container: tripEventsElement,
  eventPointsModel
});

boardPresenter.init();
