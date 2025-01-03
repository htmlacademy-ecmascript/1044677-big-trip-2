import { Mode } from '../const.js';
import NewPointView from '../view/new-point-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventPointView from '../view/event-point-view.js';
import { UserAction, UpdateType, BLANK_POINT } from '../const.js';
import { remove, render, RenderPosition, replace } from '../framework/render.js';

export default class EventPointPresenter {
  #point = null;
  #container = null;
  #mode = Mode.DEFAULT;
  #onToggleButton = null;
  #handleDataChange = null;
  #eventPointsModel = null;
  #handleModeChange = null;
  #escKeyDownHandler = null;
  #eventPointComponent = null;
  #eventEditFormComponent = null;
  #eventCreateFormComponent = null;

  constructor({container, eventPointsModel, onDataChange, onModeChange, onToggleButton}) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#onToggleButton = onToggleButton;
    this.#eventPointsModel = eventPointsModel;
  }

  init(point) {
    this.#point = point;
    const prevEventPointComponent = this.#eventPointComponent;
    const prevEventEditFormComponent = this.#eventEditFormComponent;

    this.#escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        if (this.#eventCreateFormComponent) {
          remove(this.#eventCreateFormComponent);
          this.#eventCreateFormComponent = null;
        } else {
          this.#eventEditFormComponent.reset(this.#point);
          this.#replaceFormToPoint();
        }
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    };

    this.#eventPointComponent = new EventPointView({
      point: point,
      offers: this.#eventPointsModel.getOffersById(point.type, point.offers),
      destinations: this.#eventPointsModel.getDestinationById(point.destination),
      onEditClick: () => {
        this.#replacePointToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick
    });


    this.#eventEditFormComponent = new EventEditView({
      point: point,
      offers: this.#eventPointsModel.getOffersByType(point.type),
      checkedOffers: this.#eventPointsModel.getOffersById(point.type, point.offers),
      destination: this.#eventPointsModel.getDestinationById(point.destination),
      destinationsAll: this.#eventPointsModel.destinations,
      eventPointsModel: this.#eventPointsModel,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteForm,

      onEditClick: () => {
        this.#replaceFormToPoint();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    if (prevEventPointComponent === null || prevEventEditFormComponent === null) {
      render(this.#eventPointComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT && prevEventPointComponent !== null && prevEventPointComponent.element) {
      replace(this.#eventPointComponent, prevEventPointComponent);
    }

    if (this.#mode === Mode.EDITING && prevEventEditFormComponent !== null && prevEventEditFormComponent.element) {
      replace(this.#eventPointComponent, prevEventEditFormComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventPointComponent);
    remove(prevEventEditFormComponent);
  }

  createPoint() {
    this.#mode = Mode.EDITING;
    this.#createPoint();
  }

  destroy() {
    remove(this.#eventPointComponent);
    remove(this.#eventEditFormComponent);
    if (this.#eventCreateFormComponent !== null) {
      remove(this.#eventCreateFormComponent);
    }
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#eventEditFormComponent.updateElement({
        isSaving: true,
        isDisabled: false,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#eventEditFormComponent.updateElement({
        isDeleting: true,
        isDisabled: false,
      });
    }
  }

  setAborting() {
    const resetFormState = () => {
      this.#eventEditFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    if (this.#mode === Mode.DEFAULT) {
      if (this.#eventPointComponent) {
        this.#eventPointComponent.shake();
      }
      return;
    }

    if (this.#mode === Mode.EDITING) {
      this.#eventEditFormComponent.shake(resetFormState);
    }

    if (this.#mode === Mode.NEW && this.#eventCreateFormComponent) {
      this.#eventCreateFormComponent.shake();
    }
  }

  #createPoint = () => {
    if (this.#eventEditFormComponent !== null) {
      return;
    }
    const point = BLANK_POINT;
    this.#point = point;

    this.#escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.#handleCancelCreate();
      }
    };

    this.#eventCreateFormComponent = new NewPointView({
      point,
      offers: this.#eventPointsModel.getOffersByType(point.type),
      destination: this.#eventPointsModel.getDestinationById(point.destination),
      destinationsAll: this.#eventPointsModel.destinations,
      eventPointsModel: this.#eventPointsModel,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteForm,
      onFormCancel: this.#handleCancelCreate
    });

    document.addEventListener('keydown', this.#escKeyDownHandler);

    render(this.#eventCreateFormComponent, this.#container, RenderPosition.AFTERBEGIN);
    this.#mode = Mode.NEW;
    return point;
  };

  #replacePointToForm = () => {
    replace(this.#eventEditFormComponent, this.#eventPointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    if (this.#eventCreateFormComponent) {
      remove(this.#eventCreateFormComponent);
      this.#eventCreateFormComponent = null;
    } else {
      this.#eventEditFormComponent.reset(this.#point);
      replace(this.#eventPointComponent, this.#eventEditFormComponent);
    }
    this.#mode = Mode.DEFAULT;
  };

  #handleFavoriteClick = () => {
    const updatedPoint = {...this.#point, isFavorite: !this.#point.isFavorite};
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      updatedPoint
    );
  };

  #handleFormSubmit = (update) => {
    if (this.#mode === Mode.NEW) {
      this.#handleDataChange(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        update,
      );
    } else {
      this.#handleDataChange(
        UserAction.UPDATE_POINT,
        UpdateType.MINOR,
        update,
      );
    }
  };

  #handleDeleteForm = (point) => {
    if (this.#mode === Mode.NEW) {
      this.#handleCancelCreate();
    } else {
      this.#handleDataChange(
        UserAction.DELETE_POINT,
        UpdateType.MINOR,
        point,
      );
    }
  };

  #handleCancelCreate = () => {
    if (this.#eventCreateFormComponent !== null) {
      remove(this.#eventCreateFormComponent);
      this.#eventCreateFormComponent = null;
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
    this.#mode = Mode.DEFAULT;
    this.#onToggleButton();
  };
}
