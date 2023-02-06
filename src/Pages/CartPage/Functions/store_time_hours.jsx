

export const StoreHours_EQ_CurrentHour = (
  dateVal,
  hour,
  open_time_hours,
  close_time_hours,
  open_time_minuts,
  close_time_minuts,
  currentHour,
  currentMinute
) => {
  if (dateVal == true && hour >= open_time_hours && hour == currentHour) {
    if (currentMinute > 45) {
      return "disabled_time";
    } else {
      return "hoursValue";
    }
  } else {
    if (hour < currentHour) {
      return "disabled_time";
    }
  }
};

export const StoreHours_GT_EQ_OPEN_HOURS_LT_EQ_CLOSE_HOURS = (
  dateVal,
  hour,
  open_time_hours,
  close_time_hours,
  open_time_minuts,
  close_time_minuts,
  currentHour,
  currentMinute
) => {
  if (dateVal == true) {
    if (hour < open_time_hours) {
      return "disabled_time";
    } else if (hour >= open_time_hours && hour < close_time_hours) {

      return "hoursValue";

    } else {
      if (hour == close_time_hours) {
        if (hour > currentHour) {
          return "hoursValue";
        }
        if (currentMinute <= close_time_minuts) {
          return "hoursValue";
        } else {
          return "disabled_time";
        }
      } else {
        return "disabled_time";
      }
    }
  }
};

export const StoreHours_NOT_CurrentDay = (
  dateVal,
  hour,
  open_time_hours,
  close_time_hours,
  open_time_minuts,
  close_time_minuts,
  currentHour,
  currentMinute
) => {
  if (dateVal == false && hour >= open_time_hours && hour <= close_time_hours) {
    if (hour == open_time_hours) {
      if (open_time_minuts >= 45) {
        return "disabled_time";
      } else {
        return "hoursValue";
      }
    } else {
      return "hoursValue";
    }
  } else {
    return "disabled_time";
  }
};
