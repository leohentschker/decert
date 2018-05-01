import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'

TimeAgo.locale(en)

const timeManager = new TimeAgo('en-US')

const timeAgo = datetimeStr =>
  timeManager.format(new Date(datetimeStr))

export default timeAgo
