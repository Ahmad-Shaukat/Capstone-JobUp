import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { useState } from "react"
import "./app.css";
import { useState } from "react";
import ReactJobs from "../ReactJobs";
import FullStack from "../FullstackJobs";
import newsImage from "../../utilities/news-logo.png";
import ShowPythonJobs from "../PythonJobs";
import DataEngineerJobs from "../DataEngineer";
import { MdAirlineSeatIndividualSuite } from "react-icons/md";
// import { setDate } from "date-fns"

const FindJobs = () => {
  const history = useHistory();
  const [reactJobs, setReactJobs] = useState("");
  const [fullstackJobs, setFullstackJobs] = useState("");
  const [pythonJobs, setPythonJobs] = useState("");
  const [dataJobs, setDataJobs] = useState("");
  const [news, setNews] = useState(true);
  const [newsData, setNewsData] = useState([]);
  let user = useSelector((store) => store.session["user"]);

  function handleReact() {
    setReactJobs(true);
    setFullstackJobs(false);
    setPythonJobs(false);
    setDataJobs(false);
    setNews(false);
  }

  function handleFullstack() {
    setReactJobs(false);
    setFullstackJobs(true);
    setPythonJobs(false);
    setDataJobs(false);
    setNews(false);
  }
  function handlePython() {
    setReactJobs(false);
    setFullstackJobs(false);
    setDataJobs(false);
    setPythonJobs(true);
    setNews(false);
  }
  function handleData() {
    setReactJobs(false);
    setFullstackJobs(false);
    setPythonJobs(false);
    setDataJobs(true);
    setNews(false);
  }
  useEffect(() => {
    const apiUrl = "/api/news/articles";
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // setData(data)
        setNewsData(Object.values(data.articles));
      });
  }, []);
  for (let items of newsData) {
    // console.log (items)
    let dateString = items.publishedAt;
    // console.log (dateString)
    let date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    let newDate = date.toLocaleDateString(undefined, options);

    items.publishedAt = newDate;
  }
  console.log(newsData, "---------------this is data");

  if (!user) {
    history.push("/");
    return null;
  }
  return (
    <>
      <div className="find-job-main-cont">
        <h1 className="find-job-heading">Explore Career Oppertunites</h1>

        <div className="all-jobs-cont">
          <div className="jobs-btns">
            <button
              onClick={handleReact}
              className={reactJobs ? "clicked" : "notClicked"}
            >
              React Jobs
            </button>
            <button
              onClick={handleFullstack}
              className={fullstackJobs ? "clicked" : "notClicked"}
            >
              FullStack Jobs
            </button>
            <button
              onClick={handlePython}
              className={pythonJobs ? "clicked" : "notClicked"}
            >
              Python Jobs
            </button>
            <button
              onClick={handleData}
              className={dataJobs ? "clicked" : "notClicked"}
            >
              Data Engineer
            </button>
          </div>
          <div>
            {reactJobs && <ReactJobs />}
            {fullstackJobs && <FullStack />}
            {pythonJobs && <ShowPythonJobs />}
            {dataJobs && <DataEngineerJobs />}
          </div>
        </div>
        <div className="news-container">
          {newsData.length > 0 && news
            ? newsData.map((article) => {
                return (
                  <a href={article.url} target="_blank">
                    <div className="single-news-article">
                      <div className="news-left-cont">
                        <img
                          src={
                            article.urlToImage ? article.urlToImage : newsImage
                          }
                          onError={(e) => {
                            e.target.src = newsImage; // Replace with your fallback image URL
                          }}
                          className="article-image"
                        ></img>
                      </div>
                      <div className="news-right-cont">
                        <div className="news-title">
                          <p className="news-title-heading">{article.title}</p>
                          <p className="news-source">{article.source.name}</p>
                        </div>
                        <div className="news-source">
                          <p>{article.publishedAt}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default FindJobs;
