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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getAllInterviewsThunk())
  dispatch(getAllListsThunk())
  dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path = '/interviews'>
            <AllInterviews />
          </Route>
          <Route path = '/user'>
            <GetProfile />
          </Route>
          <Route path = '/newInterview'>
            <AddInterviewForm />
          </Route>
          <Route path = '/interview/edit'>
            <EditInterviewForm />
          </Route>

          <Route path='/interview/:id/detail'>
            <InterviewDetail />
          </Route>


        </Switch>
      )}
    </>
  );
}

export default App;
