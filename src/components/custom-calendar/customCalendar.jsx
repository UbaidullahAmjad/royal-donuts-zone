import React, { Fragment, useEffect } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import {
  firstVisibleDay,
  visibleDays,
} from "react-big-calendar/lib/utils/dates";
import moment from "moment";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { BasicCalendars } from "../../constant";
import axios from "axios";
import { useState } from "react";

import { URL } from "../../env";
import { translate } from "react-switch-lang";
import { toast } from "react-toastify";

const localizer = momentLocalizer(moment);
let allViews = Object.keys(Views).map((k) => Views[k]);

const CustomCalendar = (props) => {
  const trans = props.t;
  const [days, setDays] = useState([]);
  const [events, setEvents] = useState([]);
  const [SelectedDates, setSelectedDates] = useState(null);
  //   console.log("HOLIDAYSSSSSSSSSSSSSSSSSSSSSSSS", holidays);
  let allEvents = [];
  var all_days = [];

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  useEffect(() => {
    const getCalendar = async () => {
      const response = await axios.get(`${URL}/calendar`).then((res) => {
        // console.log("calendar ", response);
        if (res.data.check1 != undefined) {
          setDays(JSON.parse(res.data.datecheck));
          const testDate = res.data.check1;
          console.log("RESSS", res.data.check1);
          setSelectedDates(res.data.check1);
          //   console.log("Holidayyyyyyyy33333333333", holidays);
          if (res.data.check1.length > 0) {
            var date = new Date();
            var month = date.getMonth();
            console.log("MONTH", month);
            date.setDate(1);

            while (date.getMonth() == month) {
              var d =
                date.getFullYear() +
                "-" +
                String(date.getMonth() + 1).padStart(2, "0") +
                "-" +
                date.getDate().toString().padStart(2, "0");
              all_days.push(d);
              date.setDate(date.getDate() + 1);
            }
            // console.log("ALL DAYSSS", all_days);

            all_days.map((singleDay) => {
              let getDate = singleDay;
              let dayName = getDayName(new Date(singleDay));
              if (dayName === "Sunday" || dayName === "Saturday") {
                allEvents.push({
                  id: getDate,
                  title: trans("holiday"),
                  allDay: true,
                  start: new Date(JSON.stringify(singleDay)),
                  end: new Date(JSON.stringify(singleDay)),
                });
              } else {
                allEvents.push({
                  id: getDate,
                  title: trans("working day"),
                  allDay: true,
                  start: new Date(JSON.stringify(singleDay)),
                  end: new Date(JSON.stringify(singleDay)),
                });
              }
            });

            all_days.map((single_date) => {
              let getDate = single_date;
              let dayName = getDayName(new Date(single_date));
              res.data.check1.map((dayz) => {
                let dayKey = Object.keys(dayz);
                let dayValue = Object.values(dayz);
                if (getDate == dayKey[0]) {
                  console.log("DATEEEE", getDate.toString);
                  console.log("DATEEEE SELECTED", dayKey[0]);
                  const event_index = allEvents.findIndex(
                    (item) => item.id == dayKey[0]
                  );
                  allEvents[event_index].id = dayKey[0];
                  if (dayValue[0] == 1) {
                    allEvents[event_index].title = trans("working day");
                  } else {
                    allEvents[event_index].title = trans("holiday");
                  }
                  allEvents[event_index].allDay = true;
                  allEvents[event_index].start = new Date(
                    JSON.stringify(dayKey[0])
                  );
                  allEvents[event_index].end = new Date(
                    JSON.stringify(dayKey[0])
                  );
                }
              });
            });
          }

          setEvents(allEvents);
        }
      });
    };

    getCalendar();
  }, []);

  function getDayName(date = new Date(), locale = "en-US") {
    return date.toLocaleDateString(locale, { weekday: "long" });
  }

  const NavigateMonth = (date) => {
    // console.log("VISIBLE", visibleDays(date, localizer));
    var visible_days = visibleDays(date, localizer);
    visible_days.map((item, index) => {
      var date_format = new Date(item);
      var dd = String(date_format.getDate()).padStart(2, "0");
      var mm = String(date_format.getMonth() + 1).padStart(2, "0");
      var yyyy = date_format.getFullYear();
      date_format = yyyy + "-" + mm + "-" + dd;
      let dayName = getDayName(new Date(date_format));
      //   console.log("DATE FORMATTTT", date_format);
      const all_event_found_date = allEvents.some(
        (item) => item.id == date_format
      );
      //   console.log("ALL EVENT FIND", all_event_found_date);
      if (all_event_found_date == false) {
        if (dayName === "Sunday" || dayName === "Saturday") {
          allEvents.push({
            id: date_format,
            title: trans("holiday"),
            allDay: true,
            start: new Date(JSON.stringify(date_format)),
            end: new Date(JSON.stringify(date_format)),
          });
        } else {
          allEvents.push({
            id: date_format,
            title: trans("working day"),
            allDay: true,
            start: new Date(JSON.stringify(date_format)),
            end: new Date(JSON.stringify(date_format)),
          });
        }
      }
      SelectedDates.map((date) => {
        let dayKey = Object.keys(date);
        let dayValue = Object.values(date);
        let dayName = getDayName(new Date(dayKey[0]));
        // console.log(
        //   "DATEEE",
        //   dayKey[0],
        //   "---- date format ---",
        //   date_format,
        //   dayKey[0] == date_format ? "TRUE" : "NOTTTT"
        // );
        if (dayKey[0] == date_format) {
          //   console.log("MATCHEED");
          const all_event_found_date = allEvents.some(
            (item) => item.id == dayKey[0]
          );
          if (all_event_found_date == true) {
            //   allEvents.push({
            //     id: dayKey[0],
            //     title: dayValue[0] == 1 ? "working day" : "holiday",
            //     allDay: true,
            //     start: new Date(JSON.stringify(dayKey[0])),
            //     end: new Date(JSON.stringify(dayKey[0])),
            //   });
            const event_index = allEvents.findIndex(
              (item) => item.id == dayKey[0]
            );
            allEvents[event_index].id = dayKey[0];
            if (dayValue[0] == 1) {
              allEvents[event_index].title = trans("working day");
            } else {
              allEvents[event_index].title = trans("holiday");
            }
            allEvents[event_index].allDay = true;
            allEvents[event_index].start = new Date(JSON.stringify(dayKey[0]));
            allEvents[event_index].end = new Date(JSON.stringify(dayKey[0]));
          }
        }
        //   else {
        //     allEvents.push({
        //       id: dayKey[0],
        //       title: dayValue[0] == 1 ? "working day" : "holiday",
        //       allDay: true,
        //       start: new Date(JSON.stringify(dayKey[0])),
        //       end: new Date(JSON.stringify(dayKey[0])),
        //     });
        //   }
        // }
      });
    });
    setEvents(allEvents);
    // console.log("STARTT", start_date, " --- end --- ", end_date);
  };

  const EventClickStatusChange = async (clicked_date) => {
    const date = clicked_date.id;
    console.log("DATEEEEEE", date, "_____ ALL EVENTS ---", allEvents);
    axios
      .get(`${URL}/savedate`, {
        params: { date: date },
      })
      .then((response) => {
        console.log("RESSS", response, " ---- DATEEE ---", response.data.date);
        var title = null;
        const event_index = events.findIndex(
          (item) => item.id == response.data.date
        );
        events[event_index].id = response.data.date;
        if (response.data.status == 1) {
          events[event_index].title = trans("working day");
          title = trans("working day");
        } else {
          events[event_index].title = trans("holiday");
          title = trans("holiday");
        }
        events[event_index].allDay = true;
        events[event_index].start = new Date(
          JSON.stringify(response.data.date)
        );
        events[event_index].end = new Date(JSON.stringify(response.data.date));

        console.log("DATE _____  EVENTSSSSSS", events);

        const date_event_changed = [...events];

        var message =
          trans("successfull") +
          " " +
          "Date" +
          " " +
          response.data.date +
          " " +
          trans("is") +
          " " +
          trans("changed to") +
          " " +
          title;
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        setEvents(date_event_changed);
      });
  };

  console.log("DATE EVENTSSSSSS", events);

  const DateClickStatusChange = async (clicked_date) => {
    var date_format = new Date(clicked_date);
    var dd = String(date_format.getDate()).padStart(2, "0");
    var mm = String(date_format.getMonth() + 1).padStart(2, "0");
    var yyyy = date_format.getFullYear();
    date_format = yyyy + "-" + mm + "-" + dd;
    axios
      .get(`${URL}/savedate`, {
        params: { date: date_format },
      })
      .then((response) => {
        console.log("RESSS", response);
        var title = null;
        const event_index = events.findIndex(
          (item) => item.id == response.data.date
        );
        events[event_index].id = response.data.date;
        if (response.data.status == 1) {
          events[event_index].title = trans("working day");
          title = trans("working day");
        } else {
          events[event_index].title = trans("holiday");
          title = trans("holiday");
        }
        events[event_index].allDay = true;
        events[event_index].start = new Date(
          JSON.stringify(response.data.date)
        );
        events[event_index].end = new Date(JSON.stringify(response.data.date));

        console.log("DATE _____  EVENTSSSSSS", events);

        const date_event_changed = [...events];
        var message =
          trans("successfull") +
          " " +
          "Date" +
          " " +
          response.data.date +
          " " +
          trans("is") +
          " " +
          trans("changed to") +
          " " +
          title;
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });

        setEvents(date_event_changed);
      });
  };

  //   console.log("all events ", events);

  return (
    <Fragment>
      <Breadcrumb parent="Supplier" title={trans("Calendar")} />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>{trans("Calendar")}</h5>
              </CardHeader>
              <CardBody>
                <Calendar
                  localizer={localizer}
                  scrollToTime={new Date(1970, 1, 1, 6)}
                  defaultDate={today}
                  views={allViews}
                  events={events}
                  // eventOverlap
                  dragRevertDuration={500}
                  // dragScroll
                  // droppable={true}
                  // showMultiDayTimes
                  step={30}
                  startAccessor="start"
                  endAccessor="end"
                  onNavigate={(date) => NavigateMonth(date)}
                  onSelectEvent={(event) => EventClickStatusChange(event)}
                  onDrillDown={(event) => DateClickStatusChange(event)}
                  //   onRangeChange={(date) => console.log("KYYYYY", date)}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default translate(CustomCalendar);
