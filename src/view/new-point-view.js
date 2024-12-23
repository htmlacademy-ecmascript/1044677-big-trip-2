import he from 'he';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {DATE_FORMAT, EVENT_POINTS_TYPE} from '../const.js';
import {humanizeEventDate, createUpperCase} from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createTypeTemplate(type) {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${createUpperCase(type)}</label>
    </div>`
  );
}

function createOfferTemplate(offer) {
  const {id, title, price} = offer;
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id=${id} type="checkbox" name=${id}>
      <label class="event__offer-label" for=${id}>
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`
  );
}

function createOffersListTemplate({offers}) {
  if (offers.length !== 0) {
    return (
      `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offers.map((offer) => createOfferTemplate(offer)).join('')}
        </div>
      </section>`
    );
  }

  return '';
}

function createPhotoTemplate(photo) {
  const {src, description} = photo;
  return (
    `<img class="event__photo" src=${src} alt=${description}>`);
}

function createPhotoContainerTemplate(pictures) {
  if (pictures.length > 0) {
    return (
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures.map((item) => createPhotoTemplate(item)).join('')}
        </div>
      </div>`
    );
  }
}

function createDestinationTemplate(destination) {
  const {description, pictures} = destination;

  if (description || (pictures && pictures.length > 0)) {
    return (
      `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${he.encode(description)}</p>
          ${createPhotoContainerTemplate(pictures)}
      </section>`
    );
  }
  return '';
}

function createNewEventTemplate(points, offers, destination, destinationsAll) {
  const {type, dateFrom, dateTo, basePrice} = points;
  const {name = ''} = destination || {};
  return (`
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${EVENT_POINTS_TYPE.map((item) => createTypeTemplate(item)).join('')}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${createUpperCase(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1" required>
          <datalist id="destination-list-1">
          ${destinationsAll.map((item) => `<option value="${item.name}"></option>`).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeEventDate(dateFrom, DATE_FORMAT.fullDate)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeEventDate(dateTo, DATE_FORMAT.fullDate)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price"
       id="event-price-1"
       type="number"
       name="event-price"
       value="${basePrice}"
       min="0"
       required>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        ${createOffersListTemplate(offers)}
        ${createDestinationTemplate(destination)}
      </section>
    </form>`
  );
}

export default class NewPointView extends AbstractStatefulView {
  #offers = null;
  #destination = null;
  #destinationsAll = null;
  #handleFormSubmit = null;
  #handleFormCancel = null;
  #eventPointsModel = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({offers, destinationsAll, onFormSubmit, onFormCancel, eventPointsModel}) {
    super();
    this.#offers = offers;
    this.#destination = {};
    this.#destinationsAll = destinationsAll;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormCancel = onFormCancel;
    this.#eventPointsModel = eventPointsModel;

    this._setState(NewPointView.parsePointToState());
    this.#setDatepickers();
    this._restoreHandlers();
  }

  get template() {
    return createNewEventTemplate(
      this._state,
      this.#offers,
      this.#destination,
      this.#destinationsAll
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(NewPointView.parseStateToPoint(this._state));
  };

  #formCancelHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormCancel();
  };

  _restoreHandlers = () => {
    this.element.querySelectorAll('.event__type-input').forEach((element) =>
      element.addEventListener('change', this.#changeTypeHandler)
    );
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceInputHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestinationHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formCancelHandler);
    this.element.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((element) =>
      element.addEventListener('change', this.#offerChangeHandler));
    this.#setDatepickers();
  };

  #priceInputHandler = (evt) => {
    evt.preventDefault();
    const value = evt.target.value;

    if (value === '' || isNaN(value)) {
      evt.target.value = '';
      return;
    }

    this._setState({
      ...this._state,
      basePrice: parseInt(value, 10)
    });
  };

  removeElement() {
    super.removeElement();

    if(this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if(this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  #changeTypeHandler = (evt) => {
    evt.preventDefault();
    const offers = this.#eventPointsModel.getOffersByType(evt.target.value);
    this.#offers = offers;
    this.updateElement({
      ...this._state,
      type: `${evt.target.value}`,
      offers: [],
    });
  };

  #changeDestinationHandler = (evt) => {
    evt.preventDefault();
    const selectedDestination = this.#destinationsAll.find((destination) => destination.name === `${evt.target.value}`);
    if (!selectedDestination) {
      evt.target.value = '';
      return;
    }
    const selectedDestinationId = selectedDestination ? selectedDestination.id : null;
    const newDestination = this.#eventPointsModel.getDestinationById(selectedDestinationId) || {};
    this.#destination = newDestination;
    this.updateElement({
      ...this._state,
      destination: selectedDestinationId
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({ ...this._state, dateFrom: userDate});
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({ ...this._state, dateTo: userDate});
    this.#datepickerFrom.set('maxDate', this._state.dateTo);
  };

  #setDatepickers = () => {
    const [ dateFromElement, dateToElement ] = this.element.querySelectorAll('.event__input--time');
    const dateFormatConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      Locale: {firstDay0fWeek: 1},
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...dateFormatConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromChangeHandler,
        maxDate: this._state.dateTo
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...dateFormatConfig,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToChangeHandler,
        minDate: this._state.dateFrom
      }
    );
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const clickedOfferId = evt.target.id;

    let updatedOffers;
    if (evt.target.checked) {
      updatedOffers = [...this._state.offers, clickedOfferId];
    } else {
      updatedOffers = this._state.offers.filter((id) => id !== clickedOfferId);
    }

    this._setState({
      ...this._state,
      offers: updatedOffers
    });
  };

  static parsePointToState = () => ({
    type: EVENT_POINTS_TYPE[0],
    dateFrom: new Date(),
    dateTo: dayjs(new Date()).add(1, 'hour').toDate(),
    basePrice: '',
    destination: {},
    offers: [],
    isFavorite: false
  });

  static parseStateToPoint = (state) => ({...state});
}
