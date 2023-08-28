import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import { getAllInterviewsThunk } from "./store/interview";
import { getAllLists, getAllListsThunk } from "./store/favoriteList";
import AllInterviews from "./components/AllInterviewContainer";
import UserProfile from "./components/UserProfile";
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
import Stats from "./components/Stats";
import LandingPage from "./components/LandingPage";
import  { getAllUsersInterviewThunk } from "./store/allinterviews";
import { getFullStackJobsThunk } from "./store/fullstack";
import { getReactJobsThunk } from "./store/reactJobs";
import { getPythonJobsThunk } from "./store/python";
import { getDataEngineerJobsThunk } from "./store/dataEngineer";
import { getProfileThunk } from "./store/profile";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(getAllInterviewsThunk())
    dispatch(getAllListsThunk())
    dispatch(getAllUsersThunk())
    dispatch(getAllUsersInterviewThunk())
    dispatch(getFullStackJobsThunk())
    dispatch(getReactJobsThunk())
    dispatch(getPythonJobsThunk())
    dispatch(getDataEngineerJobsThunk())
    dispatch(getProfileThunk())
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    {/* {sessionUser && (
      <div className="app-container">
      {sessionUser && (
        <div className="sidebar">
        <Sidebar isLoaded={isLoaded}/>

      </div>
      )}
      
      <div className="main-content">
        <div className="navigation">
          {sessionUser && isLoaded &&(
            <Navigation isLoaded={isLoaded} />
          )}
          
        </div>
    
        
        {isLoaded && (
          <Switch>
            <Route exact path = '/'>
              {sessionUser?<Stats /> : <LandingPage />}
              
            </Route>
            <Route exact path="/login" >
              <LoginFormPage />
            </Route>
            <Route exact path="/signup">
              <SignupFormPage />
            </Route>
            <Route exact path='/interviews'>
              <AllInterviews />
            </Route>
            <Route exact path='/user'>
              <GetProfile />
            </Route>
            <Route exact path='/newInterview'>
              <AddInterviewForm />
            </Route>
            <Route exact path='/interview/edit'>
              <EditInterviewForm />
            </Route>

            <Route exact path='/interview/:id/detail'>
              <InterviewDetail />
            </Route>
            <Route exact path='/allUsers'>
              <AllUsers />
            </Route>
            <Route exact path='/users/:id/profile'>
              <SingleUser />
            </Route>

            <Route exact path='/findjobs'>
              <FindJobs />
            </Route>
            <Route exact path='/favlists'>
              <AllFavriteLists />
            </Route>
            <Route exact path='/hello'>
              <Stats />
            </Route>


          </Switch>
        )}
      </div>
    </div>
    )} */}
      <div className="app-container">
        {sessionUser && (
          <div className="sidebar" id="main-sidebar">
          <Sidebar isLoaded={isLoaded} id='man-sidebar'/>

        </div>
        )}
        
        <div className="main-content">
          <div className="navigation">
            {sessionUser && isLoaded &&(
              <Navigation isLoaded={isLoaded} />
            )}
            
          </div>
          
          {isLoaded && (
            <Switch>
              <Route exact path = '/'>
                {sessionUser?<Stats /> : <LandingPage />}
                
              </Route>
              <Route exact path="/login" >
                <LoginFormPage />
              </Route>
              <Route exact path="/signup">
                <SignupFormPage />
              </Route>
              <Route exact path='/interviews'>
                <AllInterviews />
              </Route>
              <Route exact path='/user'>
                <UserProfile />
              </Route>
              <Route exact path='/newInterview'>
                <AddInterviewForm />
              </Route>
              <Route exact path='/interview/edit'>
                <EditInterviewForm />
              </Route>

              <Route exact path='/interview/:id/detail'>
                <InterviewDetail />
              </Route>
              <Route exact path='/allUsers'>
                <AllUsers />
              </Route>
              <Route exact path='/users/:id/profile'>
                <SingleUser />
              </Route>

              <Route exact path='/findjobs'>
                <FindJobs />
              </Route>
              <Route exact path='/favlists'>
                <AllFavriteLists />
              </Route>
              <Route exact path='/hello'>
                <Stats />
              </Route>


            </Switch>
          )}
        </div>
      </div>


    </>
  );
}

export default App;
