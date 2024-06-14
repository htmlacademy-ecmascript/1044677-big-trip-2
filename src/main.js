import BoardPresenter from './presenter/board-presenter.js';

const tripEventsElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({container: tripEventsElement});

boardPresenter.init();
