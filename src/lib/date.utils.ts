import moment from 'moment'

/**
 * Return Date to ISO String format
 * @param {any} date:Date
 * @returns {any}
 */
export const toISOString = (date:Date):string|null => {
  if (!date) return null
  let formattedDate = date

  if (typeof date === 'string') {
    formattedDate = new Date(date)
  }
  return formattedDate.toISOString()
}

/**
 * Default Date Format
 * @param {any} date:Date
 * @returns {string}
 */
export const defaultDateFormat = (date:Date):string => moment(date).format('L')

/**
 * Get only date from date time
 * @param {any} date:Date
 * @returns {string}
 */
export const onlyDate = (date:Date):string => moment(date).format('YYYY-MM-DD')

/**
 * Get only time from date
 * @param {any} date:Date
 * @returns {string}
 */
export const onlyTime = (date:Date):string => moment(date).format('hh:mm A')

/**
 * Get Time in 24 hr
 * @param {any} date:Date
 * @returns {string}
 */
export const time24hr = (date:Date):string => moment(date).format('HH:MM')

/**
 * Returns Date in Date time format
 * @param {any} date:Date
 * @returns {string}
 */
export const dateTime = (date:Date):string => moment(date).format('MM/DD/YYYY hh:mm A')

/**
 * Calculate Age from date of birth
 * @param {any} fullBirthDate:Date
 * @returns {number}
 */
export const ageCalculator = (fullBirthDate:Date):number => {
  const currDate :Date= new Date()
  const birthDate :Date= new Date(onlyDate(fullBirthDate))
  const currYear:number = currDate.getUTCFullYear()
  const birthYear:number = birthDate.getUTCFullYear()

  const age:number = currYear - birthYear
  return age
}

export const daysDifference=(date1: string, date2: string): number=> {
    const date1Obj: Date = new Date(date1);
    const date2Obj: Date = new Date(date2);
    
    const differenceInMilliseconds: number = Math.abs(date2Obj.getTime() - date1Obj.getTime());
    const millisecondsPerDay: number = 1000 * 60 * 60 * 24;
    
    const differenceInDays: number = Math.floor(differenceInMilliseconds / millisecondsPerDay);
    return differenceInDays;
}

export const  formatDateToYYYYMMDD=(inputDate: string): string=> {
  const parts = inputDate.split('/');
  const year = parts[2];
  const month = parts[0].padStart(2, '0');
  const day = parts[1].padStart(2, '0');
  return `${year}-${month}-${day}`;
}