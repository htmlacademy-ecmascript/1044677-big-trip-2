import {getRandomArrayElement} from '../utils.js';

export const mockEventPoints = [
  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808c',
    basePrice: 1100,
    dateFrom: '2019-07-09T22:55:56.845Z',
    dateTo: '2019-07-10T11:22:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcab',
    isFavorite: false,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa30'],
    type: 'taxi'
  },

  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808d',
    basePrice: 1500,
    dateFrom: '2024-07-09T20:50:56.845Z',
    dateTo: '2024-07-11T10:32:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcad',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa33',
      'b4c3e4e6-9053-42ce-b747-e281314baa34',
      'b4c3e4e6-9053-42ce-b747-e281314baa35',
      'b4c3e4e6-9053-42ce-b747-e281314baa36'
    ],
    type: 'flight'
  },

  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808e',
    basePrice: 1000,
    dateFrom: '2025-07-11T02:05:56.845Z',
    dateTo: '2025-07-12T13:42:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcae',
    isFavorite: true,
    offers: ['b4c3e4e6-9053-42ce-b747-e281314baa30'],
    type: 'ship'
  },

  {
    id: 'f4b62099-293f-4c3d-a702-94eec4a2808f',
    basePrice: 500,
    dateFrom: '2024-08-20T23:40:56.845Z',
    dateTo: '2024-08-31T14:20:13.375Z',
    destination: 'cfe416cq-10xa-ye10-8077-2fs9a01edcac',
    isFavorite: true,
    offers: [],
    type: 'restaurant'
  }
];

function getRandomEventPoint () {
  return getRandomArrayElement(mockEventPoints);
}

export {getRandomEventPoint};
