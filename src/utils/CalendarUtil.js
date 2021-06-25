export const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const date = new Date();

export const day = date.getDay();
export const month = date.getMonth();
export const year = date.getFullYear();

let startingDateOfMonth;
let daysInMonth;
let paddingDaysOfMonth;

const CalendarUtil = () => {
  startingDateOfMonth = new Date(year, month, 1);
  daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateInStringFormat = startingDateOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });

  paddingDaysOfMonth = weekdays.indexOf(dateInStringFormat.split(", ")[0]);
}