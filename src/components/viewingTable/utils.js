export const addZeroInTime = (time) => {
  const parts = time.split(':');

  if (parts[0].length === 1) {
    parts[0] = '0' + parts[0];
  }
  return parts.join(':');
};

const compareNumbers = (a, b, direction) => {
  const valueA = isNaN(a) ? 0 : a;
  const valueB = isNaN(b) ? 0 : b;
  return direction === 'ascending' ? valueA - valueB : valueB - valueA;
};

const compareStrings = (a, b, direction) =>
  direction === 'ascending' ? a - b : b - 1;

const compareDaysOfWeek = (dayA, dayB, direction) => {
  const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const diff = daysOfWeek.indexOf(dayA) - daysOfWeek.indexOf(dayB);
  return direction === 'ascending' ? diff : -diff;
};

const compareTimes = (timeA, timeB, direction) => {
  const dateA = new Date(`1970-01-01T${addZeroInTime(timeA)}Z`);
  const dateB = new Date(`1970-01-01T${addZeroInTime(timeB)}Z`);
  return direction === 'ascending' ? dateA - dateB : dateB - dateA;
};

const compareDates = (dateA, dateB, direction) => {
  const parsedDateA = new Date(dateA);
  const parsedDateB = new Date(dateB);
  return direction === 'ascending'
    ? parsedDateA - parsedDateB
    : parsedDateB - parsedDateA;
};

export const sortData = (data, sortConfig) => {
  const sortableData = [...data];

  sortableData.sort((a, b) => {
    let valueA = a[sortConfig.key];
    let valueB = b[sortConfig.key];
    const direction = sortConfig.direction;

    switch (sortConfig.key) {
      case 'category':
      case 'cid':
      case 'tid':
      case 'trans_id':
      case 'trans_sum':
        return compareNumbers(+valueA, +valueB, direction);

      case 'country': {
        const numberInValueA = +valueA.replace(/[^\d.-]/g, '');
        const numberInValueB = +valueB.replace(/[^\d.-]/g, '');
        return compareNumbers(numberInValueA, numberInValueB, direction);
      }

      case 'day_of_week':
        return compareDaysOfWeek(valueA, valueB, direction);

      case 'trans_time':
        return compareTimes(valueA, valueB, direction);

      case 'trans_dt':
        return compareDates(valueA, valueB, direction);

      default:
        return compareStrings(valueA, valueB, direction);
      
        
    }
  });

  return sortableData;
};
