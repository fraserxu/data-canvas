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

  getPreviousDay(day, duration) {
    var d = moment.duration(duration, 'hours')
    var range = d.beforeMoment(day)
    var iterator = range.iterateInner('hours')
    return iterator.next().toDate()
  },

  toISO(date) {
    return moment(date).format("YYYY-MM-DDTHH:mm:ssZZ")
  }
};

export default dateUtils;
