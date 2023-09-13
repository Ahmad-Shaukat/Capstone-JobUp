import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditInterviewForm from "../EditInterviewForm";
import { format, set } from "date-fns";
import DeleteInterview from "../DeleteInterviewModal";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./app.css";
import { FaLocationArrow } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { BsCalendar2Week } from "react-icons/bs";
import { getAllInterviews, getAllInterviewsThunk } from "../../store/interview";
import { useState } from "react";

const AllInterviews = ({}) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);
  const [editInterview, setEditInterview] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  let { interview } = useSelector((store) => store);
  const [showInt, setShowInt] = useState(true);
  const [searchPosition, setSearchPosition] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [searchCompany, setSearchCompany] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const history = useHistory();
  interview = Object.values(interview);
  console.log(interview);
  const StatusInterview = (status) => {
    return interview.filter((interview) => interview.status);
  };
  const positionInterview = (position) => {
    position = position.toString().toLowerCase(); // Convert to lowercase after ensuring it's a string
    return interview.filter((interview) =>
      interview.position.toLowerCase().includes(position)
    );
  };
  // console.log(StatusInterview("Pending"), "---------------these are pending");

  useEffect(async () => dispatch(getAllInterviewsThunk()), [dispatch]);

  if (!user) {
    history.push("/");
    return null;
  }

  // this opens up the edit form
  const showHandle = (interview) => {
    setEditInterview(interview);
    setShowEdit(true);
  };
  // handles the canceling of edit form
  const cancelEdit = () => {
    setEditInterview({});
    setShowEdit(false);
    history.push("/interviews");
  };

  const afterSaving = () => {
    setShowEdit(false);
    setEditInterview({});
    history.push("/interviews");
  };

  const handleSearch = (e) => {
    console.log(e.target.value.length);
    if (e.target.value.length == 0) {
      setShowInt(true);
      setShowSearch(false);
    } else {
      console.log("in the else statement");
      setSearchPosition(e.target.value);
      console.log(searchPosition, "---------------search Position");
      setSearchResult(positionInterview(searchPosition));

      // console.log (poistionInterview(searchPosition, '-----------------result from search Position'))
      setShowSearch(true);
      setShowInt(false);
      setSearchCompany(false);
      setSearchStatus(false);
    }
    console.log(searchResult, "--------------searchResult");
    console.log(showSearch);
    // console.log (e.target.value.length)
    // setShowInt(false)
    // return (<>
    // <h5>{e.target.vlaue}</h5>
    // </>
    // )
  };

  // condition that opens up the form
  if (showEdit) {
    return (
      <>
        <div>
          <EditInterviewForm
            id={editInterview.id}
            interview={editInterview}
            onCancel={cancelEdit}
            afterSaving={afterSaving}
          />
          {/* <button onClick={() => cancelEdit()}>Cancel</button> */}
        </div>
      </>
    );
  }
  if (interview.length < 1) {
    return (
      <>
        <div className="no-int-cont">
          <div className="no-int-text">
            <p>No Interview</p>
          </div>
          <div className="no-int-link">
            <NavLink exact to="/newinterview">
              <button>Add Interview</button>
            </NavLink>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <h5>Search</h5>
        <div>
          <label>Position </label>
          <input type="text" onChange={handleSearch}></input>
        </div>
        <div>
          <label>Status </label>
          <input type="text" onChange={handleSearch}></input>
        </div>
      </div>
      {searchResult.length > 0 ? <div className="allInt-container">

        {searchResult.map((interview) => (
          <div key={interview.id} className="">
            {showSearch ? (
              <div className="allInt-column">
                <div className="allInt-top-cont">
                  <div className="allInt-com-letter">
                    <p>{interview.company[0].toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="allInt-com-pos">{interview.position}</p>
                    <p className="allInt-com-name">{interview.company}</p>
                  </div>
                </div>
                <div className="allInt-btm-container">
                  <div className="allInt-btm-left-cont">
                    <div className="allInt-loc-type-cont">
                      <p className="allInt-loc-text">
                        <FaLocationArrow className="allInt-loc-logo" />
                        {interview.location}
                      </p>
                      <p>
                        <MdWork className="allInt-type-logo" />
                        {interview.type}
                      </p>
                    </div>

                    <div className="allInt-btm-bttns">
                      <button
                        className="allInt-edit-btn"
                        onClick={() => showHandle(interview)}
                      >
                        Edit
                      </button>

                      {/* <button className='allInt-edit-btn'>
                                <OpenModalButton
                                    buttonText={'Edit'}
                                    
                                    modalComponent={
                                        <EditInterviewForm
                                            interview={interview} id={interview.id}
                                        />
                                    }
                                />
                            </button> */}

                      <button className="allInt-del-btn">
                        <OpenModalButton
                          buttonText={"Delete"}
                          modalComponent={
                            <DeleteInterview interview={interview} />
                          }
                        />
                      </button>

                      <NavLink exact to={`/interview/${interview.id}/detail`}>
                        <button className="allInt-btns-more">More</button>
                      </NavLink>
                    </div>
                  </div>
                  <div className="allInt-btm-right-container">
                    <p className="allInt-date">
                      <BsCalendar2Week className="allInt-int-logo" />
                      {interview["date"].slice(0, 17)}
                    </p>
                    {interview.status === "Pending" && (
                      <p className="allInt-Pending">{interview.status}</p>
                    )}
                    {interview.status === "Scheduled" && (
                      <p className="allInt-Scheduled">{interview.status}</p>
                    )}
                    {interview.status === "Declined" && (
                      <p className="allInt-Declined">{interview.status}</p>
                    )}
                    {interview.status === "Offered" && (
                      <p className="allInt-Offered">{interview.status}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>: showSearch ? (
        <div>No results found</div>
      ) : null}
      {showInt ? (
        <div className="allInt-container">
          {interview.map((interview) => {
            // const interviewDate = new Date(interview.date)
            // const formattedDate = format(interviewDate, 'EEEE, MMMM d, yyyy', { timeZone: 'GMT' });

            return (
              <div className="allInt-column">
                <div className="allInt-top-cont">
                  <div className="allInt-com-letter">
                    <p>{interview.company[0].toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="allInt-com-pos">{interview.position}</p>
                    <p className="allInt-com-name">{interview.company}</p>
                  </div>
                </div>
                <div className="allInt-btm-container">
                  <div className="allInt-btm-left-cont">
                    <div className="allInt-loc-type-cont">
                      <p className="allInt-loc-text">
                        <FaLocationArrow className="allInt-loc-logo" />
                        {interview.location}
                      </p>
                      <p>
                        <MdWork className="allInt-type-logo" />
                        {interview.type}
                      </p>
                    </div>

                    <div className="allInt-btm-bttns">
                      <button
                        className="allInt-edit-btn"
                        onClick={() => showHandle(interview)}
                      >
                        Edit
                      </button>

                      {/* <button className='allInt-edit-btn'>
                                        <OpenModalButton
                                            buttonText={'Edit'}
                                            
                                            modalComponent={
                                                <EditInterviewForm
                                                    interview={interview} id={interview.id}
                                                />
                                            }
                                        />
                                    </button> */}

                      <button className="allInt-del-btn">
                        <OpenModalButton
                          buttonText={"Delete"}
                          modalComponent={
                            <DeleteInterview interview={interview} />
                          }
                        />
                      </button>

                      <NavLink exact to={`/interview/${interview.id}/detail`}>
                        <button className="allInt-btns-more">More</button>
                      </NavLink>
                    </div>
                  </div>
                  <div className="allInt-btm-right-container">
                    <p className="allInt-date">
                      <BsCalendar2Week className="allInt-int-logo" />
                      {interview["date"].slice(0, 17)}
                    </p>
                    {interview.status === "Pending" && (
                      <p className="allInt-Pending">{interview.status}</p>
                    )}
                    {interview.status === "Scheduled" && (
                      <p className="allInt-Scheduled">{interview.status}</p>
                    )}
                    {interview.status === "Declined" && (
                      <p className="allInt-Declined">{interview.status}</p>
                    )}
                    {interview.status === "Offered" && (
                      <p className="allInt-Offered">{interview.status}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {/* <div className="allInt-container">
        {interview.map((interview) => {
          // const interviewDate = new Date(interview.date)
          // const formattedDate = format(interviewDate, 'EEEE, MMMM d, yyyy', { timeZone: 'GMT' });

          return (
            <div className="allInt-column">
              <div className="allInt-top-cont">
                <div className="allInt-com-letter">
                  <p>{interview.company[0].toUpperCase()}</p>
                </div>
                <div>
                  <p className="allInt-com-pos">{interview.position}</p>
                  <p className="allInt-com-name">{interview.company}</p>
                </div>
              </div>
              <div className="allInt-btm-container">
                <div className="allInt-btm-left-cont">
                  <div className="allInt-loc-type-cont">
                    <p className="allInt-loc-text">
                      <FaLocationArrow className="allInt-loc-logo" />
                      {interview.location}
                    </p>
                    <p>
                      <MdWork className="allInt-type-logo" />
                      {interview.type}
                    </p>
                  </div>

                  <div className="allInt-btm-bttns">
                    <button
                      className="allInt-edit-btn"
                      onClick={() => showHandle(interview)}
                    >
                      Edit
                    </button>


                    <button className="allInt-del-btn">
                      <OpenModalButton
                        buttonText={"Delete"}
                        modalComponent={
                          <DeleteInterview interview={interview} />
                        }
                      />
                    </button>

                    <NavLink exact to={`/interview/${interview.id}/detail`}>
                      <button className="allInt-btns-more">More</button>
                    </NavLink>
                  </div>
                </div>
                <div className="allInt-btm-right-container">
                  <p className="allInt-date">
                    <BsCalendar2Week className="allInt-int-logo" />
                    {interview["date"].slice(0, 17)}
                  </p>
                  {interview.status === "Pending" && (
                    <p className="allInt-Pending">{interview.status}</p>
                  )}
                  {interview.status === "Scheduled" && (
                    <p className="allInt-Scheduled">{interview.status}</p>
                  )}
                  {interview.status === "Declined" && (
                    <p className="allInt-Declined">{interview.status}</p>
                  )}
                  {interview.status === "Offered" && (
                    <p className="allInt-Offered">{interview.status}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
    </>
  );
};
export default AllInterviews;
