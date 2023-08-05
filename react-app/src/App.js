import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { getAllInterviewsThunk } from "./store/interview";
import { getAllLists, getAllListsThunk } from "./store/favoriteList";
import AllInterviews from "./components/AllInterviewContainer";
import GetProfile from "./components/ProfilePage";
import AddInterviewForm from "./components/InterviewForm";
import EditInterviewForm from "./components/EditInterviewForm";
import InterviewDetail from "./components/InterviewDetail";
import { getAllUsersThunk } from "./store/user";
import AllUsers from "./components/allUsers";
import SingleUser from "./components/SingleUser";
import FindJobs from "./components/FindJobs";
import AllFavriteLists from "./components/AllFavoriteList";
import Sidebar from "./components/SmallSideBar";
import './app.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getAllInterviewsThunk())
    dispatch(getAllListsThunk())
    dispatch(getAllUsersThunk())
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="app-container">
        <div className="sidebar">
          <Sidebar />

        </div>
        <div className="main-content">
          <Navigation isLoaded={isLoaded} />
          {isLoaded && (
            <Switch>
              <Route path="/login" >
                <LoginFormPage />
              </Route>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <Route path='/interviews'>
                <AllInterviews />
              </Route>
              <Route path='/user'>
                <GetProfile />
              </Route>
              <Route path='/newInterview'>
                <AddInterviewForm />
              </Route>
              <Route path='/interview/edit'>
                <EditInterviewForm />
              </Route>

              <Route path='/interview/:id/detail'>
                <InterviewDetail />
              </Route>

              <Route path='/allUsers'>
                <AllUsers />
              </Route>
              <Route path='/users/:id/profile'>
                <SingleUser />
              </Route>

              <Route path='/findjobs'>
                <FindJobs />
              </Route>
              <Route path='/favlists'>
                <AllFavriteLists />
              </Route>


            </Switch>
          )}
        </div>
      </div>


    </>
  );
}

export default App;
