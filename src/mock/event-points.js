import { getRandomArrayElement } from './utils.js';

export const mockEventPoints = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    basePrice: 1100,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcac',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31',
      'b4c3e4e6-9053-42ce-b747-e281314baa30'
    ],
    type: 'taxi'
  },

  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808d',
    basePrice: 1500,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcad',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa33',
      'b4c3e4e6-9053-42ce-b747-e281314baa34',
      'b4c3e4e6-9053-42ce-b747-e281314baa35',
      'b4c3e4e6-9053-42ce-b747-e281314baa36',
      'b4c3e4e6-9053-42ce-b747-e281314baa37'
    ],
    type: 'flight'
  },

  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808e',
    basePrice: 1000,
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcae',
    isFavorite: true,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa30'
    ],
    type: 'ship'
  },

];

function getRandomEventPoint () {
  return getRandomArrayElement(mockEventPoints);
}

export {getRandomEventPoint};
