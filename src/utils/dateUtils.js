import moment from 'moment';
require('twix');

const dateUtils = {
  getNextDay(day, duration) {
    var d = moment.duration(duration, 'days')
    var range = d.afterMoment(day)
    var iterator = range.iterateInner('days')
    // skip current day
    iterator.next()
    return iterator.next().toDate()
  },

  getPreviousDay(day) {
    var d = moment.duration(24, 'hours')
    var range = d.beforeMoment(day)
    var iterator = range.iterateInner('hours')
    return iterator.next().toDate()
  },

  getPreviousWeek(day) {
    let i = 0, _day = day;
    while ( i < 7) {
      _day = dateUtils.getPreviousDay(_day)
      i++;
    }
    return _day
  },

  getPreviousMonth(day) {
    let i = 0, _day = day;
    while ( i < 30) {
      _day = dateUtils.getPreviousDay(_day)
      i++;
    }
    return _day
  },

  toISO(date) {
    return moment(date).format("YYYY-MM-DDTHH:mm:ssZZ")
  }
};

export default dateUtils;
