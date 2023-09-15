
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
// import { useState } from "react"
import './app.css'
import { useState } from "react"
import ReactJobs from "../ReactJobs"
import FullStack from "../FullstackJobs"
import ShowPythonJobs from "../PythonJobs"
import DataEngineerJobs from "../DataEngineer"
import { setDate } from "date-fns"



const FindJobs = () => {
    const history = useHistory()
    const [reactJobs, setReactJobs] = useState('')
    const [fullstackJobs, setFullstackJobs] = useState('')
    const [pythonJobs, setPythonJobs] = useState('')
    const [dataJobs, setDataJobs] = useState('')
    const [news, setNews] = useState(true)
    const [data, setData] = useState([])
    let user = useSelector((store) => store.session['user'])


    function handleReact() {
        setReactJobs(true)
        setFullstackJobs(false)
        setPythonJobs(false)
        setDataJobs(false)
        setNews(false)
    }


    function handleFullstack() {
        setReactJobs(false);
        setFullstackJobs(true);
        setPythonJobs(false)
        setDataJobs(false)
        setNews(false)

    }
    function handlePython() {
        setReactJobs(false);
        setFullstackJobs(false);
        setDataJobs(false)
        setPythonJobs(true)
        setNews(false)

    }
    function handleData() {
        setReactJobs(false);
        setFullstackJobs(false);
        setPythonJobs(false)
        setDataJobs(true)
        setNews(false)

    }
    useEffect(() => {
        const apiUrl = '/api/news/articles'
        fetch(apiUrl).then((response) => {
            return response.json()
        })
        .then((data) => {
            // setData(data)
            setData(Object.values(data.articles))
        })
    }, [])
console.log (data, '---------------this is data')

    if (!user) {
        history.push('/')
        return null
    }
    return (
        <>
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
                >FullStack Jobs</button>
                <button
                onClick={handlePython}
                className={pythonJobs ? "clicked" : "notClicked"}
                >Python Jobs</button>
                <button 
                onClick={handleData}
                className={dataJobs ? "clicked" : "notClicked"}
                >Data Engineer</button>
            </div>
            <div>
            {reactJobs && <ReactJobs />}
            {fullstackJobs && <FullStack />}
            {pythonJobs && <ShowPythonJobs /> }
            {dataJobs && <DataEngineerJobs />}

            </div>


        </div>
        {data.length>0 && news ? (
            data.map((article) => {
               return <div>{article.title}</div>
            })
        ):
        null}
        </>
    )
}

export default FindJobs