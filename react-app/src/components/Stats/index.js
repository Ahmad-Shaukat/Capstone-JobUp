import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import interviewsReducer, { getAllInterviewsThunk } from "../../store/interview";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import "./app.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugins from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { MdAdd } from "react-icons/md";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";
// import calendar from "../Calander";

function Stats() {
  const dispatch = useDispatch();
  const history = useHistory();
  let state = useSelector((store) => store);
  let user = useSelector((store) => store.session["user"]);
//   const events = []

  // console.log (state, '--------------------this is state')
  let interviews = useSelector((store) => store.interview);
  interviews = Object.values(interviews);


//   using map to get all the events
  let events = interviews.map((interview) => ({
    title: `${interview.company}: ${interview.status}`,
    date: interview.date
  } ))

//   format the date for all the calander using the date object

const formatEventDates = (events) => {
    let monthObject = {}
    for (let i = 0; i<events.length; i++) {
        let initalDateString = events[i].date
        let initialDate = new Date (initalDateString.replace(/ GMT$/, ''))
        console.log (initialDate, '-----------------------')
    }
}
formatEventDates(events)
  console.log(interviews, "-----------these are all interviews");
  console.log (events, 'these are all the events')
  // let pendingInterviews = interviews.filter(())
  const pendingInterviews = Object.values(interviews).filter(
    (interview) => interview.status === "Pending"
  );
  const scheduledInterviews = Object.values(interviews).filter(
    (interview) => interview.status === "Scheduled"
  );
  const declinedInterviews = Object.values(interviews).filter(
    (interview) => interview.status === "Declined"
  );
  // console.log (pendingInterviews.length, 'these are pending interivew --------------')
  // console.log (scheduledInterviews.length, 'these are scheduled interviews')
  // console.log (declinedInterviews.length, 'these are declined interviews')

  // let pendingInterviews = interviews.filter(interview => interview['status'] = 'Pending')
  // console.log(pendingInterviews, '--------------these are pending ')
  // console.log (interviews, '--------------------')

  useEffect(async () => dispatch(getAllInterviewsThunk()), [dispatch]);

  if (!user) {
    history.push("/");
    return null;
  }
  if (interviews) {
    return (
      <main className="stats-main-container">
        <div className="stats-card-main-container">
          <div className="stats-pending-container stats-pending-border">
            <div className="left-card-container">
              <div className="stats-number stats-pending-colors">
                <p>{pendingInterviews.length}</p>
              </div>

              <p className="stats-text">Pending Interviews</p>
            </div>
            <div className="right-card-container">
              <div className="stats-icon-wrapper stats-icon-wrapper-pending">
                <FaSuitcaseRolling className="stats-pending-colors" />
              </div>
            </div>
          </div>
          <div className="stats-test stats-schduled-border">
            <div className="left-card-container">
              <div className="stats-number">
                <p id="stats-scheduled-text">{scheduledInterviews.length}</p>
              </div>

              <p className="stats-text">Scheduled Interviews</p>
            </div>
            <div className="right-card-container">
              <div className="stats-icon-wrapper stats-icon-wrapper-scheduled">
                <FaCalendarCheck id="stats-scheduled-text" />
              </div>
            </div>
          </div>
          <div className="stats-test stats-schduled-declined">
            <div className="left-card-container">
              <div className="stats-number">
                <p className="stats-declined-colors">
                  {declinedInterviews.length}
                </p>
              </div>

              <p className="stats-text">Declined Interviews</p>
            </div>
            <div className="right-card-container">
              <div className="stats-icon-wrapper stats-icon-wrapper-declined">
                <FaBug className="stats-declined-colors" />
              </div>
            </div>
          </div>
        </div>
        <div className="calander-container">
          <button className="add-event-btn" id="tests">
            <MdAdd />
          </button>
          <div className="calander">
            <FullCalendar
              id="calander2"
              className="my-calendar" // Add a className here
              plugins={[dayGridPlugin, timeGridPlugins, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "dayGridMonth,timeGridWeek",
              }}
              events={[
                { title: "event 1", date: "2019-04-01", backgroundColor:'red' },
                { title: "event 2", date: "2023-09-02" },
                { title: "event 3", date: "2023-09-02" },
              ]}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Stats;
