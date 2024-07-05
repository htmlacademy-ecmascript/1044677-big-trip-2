import dayjs from 'dayjs';


function humanizeEventDate(date, format) {
  return (date) ? dayjs(date).format(format) : '';
}

function getTimeGap(dateFrom, dateTo) {
  const durationInMinutes = dayjs(dateTo).diff(dateFrom, 'minute');

  if (durationInMinutes < 60) {
    return `${durationInMinutes}M`;
  }

  const durationInHours = dayjs(dateTo).diff(dateFrom, 'hour');

  if (durationInHours < 24) {
    const durationMinutes = durationInMinutes % 60;
    return `${durationInHours}H ${durationMinutes}M`;
  }

  const durationInDays = dayjs(dateTo).diff(dateFrom, 'day');
  const hours = durationInHours % 24;
  const minutes = durationInMinutes % 60;

  return `${durationInDays}D ${hours}H ${minutes}M`;
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function createUpperCase(word) {
  return (`${word[0].toUpperCase()}${word.slice(1)}`);
}

export {getRandomArrayElement, humanizeEventDate, getTimeGap, createUpperCase};
