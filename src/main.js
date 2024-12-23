import FilterModel from './model/filters-model.js';
import {AUTHORIZATION, END_POINT} from './const.js';
import BoardPresenter from './presenter/board-presenter.js';
import EventPointsModel from './model/event-points-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventPointsApiService from './event-points-api-service.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteHeaderTripControls = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const eventPointsModel = new EventPointsModel({
  eventPointsApiService: new EventPointsApiService(END_POINT, AUTHORIZATION),
});
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderTripControls,
  filterModel,
  eventPointsModel,
});
const boardPresenter = new BoardPresenter({
  container: tripEventsElement,
  eventPointsModel,
  filterModel
});

filterPresenter.init();
boardPresenter.init();
eventPointsModel.init();
