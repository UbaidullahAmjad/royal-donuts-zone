export const StoreMinutes_Not_CurrentDay = (
  dateVal,
  hourVal,
  currentHour,
  open_time_hours,
  close_time_hours,
  currentMinute,
  open_time_minuts,
  close_time_minuts,
  minute
) => {
  if (dateVal == false) {
    if (hourVal == close_time_hours) {
      if (close_time_minuts >= minute) {
        return "minutesValue";
      } else {
        return "disabled_time";
      }
    } else if (hourVal >= open_time_hours) {
      if (hourVal == open_time_hours) {
        if (open_time_minuts <= minute) {
          return "minutesValue";
        } else {
          return "disabled_time";
        }
      } else {
        return "minutesValue";
      }
    }
  }
};

export const StoreMinutes_GT_OPEN_HOURS = (
  dateVal,
  hourVal,
  currentHour,
  open_time_hours,
  close_time_hours
) => {
  if (
    dateVal == true &&
    hourVal > currentHour &&
    hourVal > open_time_hours &&
    hourVal < close_time_hours
  ) {
    return "minutesValue";
  }
};
export const StoreMinutes_EQ_OPEN_HOURS = (
  dateVal,
  hourVal,
  currentHour,
  open_time_hours,
  close_time_hours,
  currentMinute,
  open_time_minuts,
  minute
) => {
  if (
    dateVal == true &&
    hourVal > currentHour &&
    hourVal == open_time_hours &&
    hourVal < close_time_hours &&
    currentMinute >= open_time_minuts
  ) {
    if (hourVal > currentHour) {
      return "minutesValue";
    }
    if (currentMinute <= minute) {
      return "minutesValue";
    } else {
      return "disabled_time";
    }
  }
};

export const StoreMinutes_EQ_CLOSE_HOURS = (
  dateVal,
  hourVal,
  currentHour,
  open_time_hours,
  close_time_hours,
  currentMinute,
  open_time_minuts,
  close_time_minuts,
  minute
) => {
  if (
    dateVal == true &&
    hourVal > currentHour &&
    hourVal > open_time_hours &&
    hourVal == close_time_hours
  ) {
    // if (currentMinute <= minute) {
    if (hourVal < close_time_hours) {
      return "minutesValue";
    }
    if (close_time_minuts >= minute) {
      return "minutesValue";
    } else {
      return "disabled_time";
    }
  }
};

export const StoreMinutes_Hours_EQ_CURRENT_HOURS = (
  dateVal,
  hourVal,
  currentHour,
  open_time_hours,
  close_time_hours,
  currentMinute,
  open_time_minuts,
  close_time_minuts,
  minute
) => {
  if (dateVal == true && hourVal == currentHour) {
    if (minute >= currentMinute) {
      if (hourVal == close_time_hours) {
        if (minute <= close_time_minuts) {
          return "minutesValue";
        } else {
          return "disabled_time";
        }
      } else {
        return "minutesValue";
      }
    } else {
      return "disabled_time";
    }
  }
};
