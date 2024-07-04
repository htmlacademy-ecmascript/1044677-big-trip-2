import dayjs from 'dayjs';
import { DATE_FORMAT } from './const';


function humanizeEventDate(date) {
  return (date) ? dayjs(date).format(DATE_FORMAT.monthDay) : '';
}

function humanizeEventFullDate(date) {
  return (date) ? dayjs(date).format(DATE_FORMAT.fullDate) : '';
}

function humanizeEventTime(date) {
  return (date) ? dayjs(date).format(DATE_FORMAT.hours) : '';
}

function getTimeGap(dateFrom, dateTo) {
  return `${dayjs(dateTo).diff(dateFrom, 'hour')}H`;
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function createUpperCase(word) {
  return (`${word[0].toUpperCase()}${word.slice(1)}`);
}

export {getRandomArrayElement, humanizeEventDate, humanizeEventFullDate, humanizeEventTime, getTimeGap, createUpperCase};
