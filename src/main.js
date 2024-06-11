import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import {render} from './render.js';
import {RenderPosition} from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = siteHeaderElement.querySelector('.page-body__page-main');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const boardPresenter = new BoardPresenter({container: siteMainElement});

render(new FilterView(), tripMainElement);
render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);


boardPresenter.init();
