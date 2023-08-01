import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createInterviewThunk } from '../../store/interview'

function AddInterviewForm () {
    const dispatch = useDispatch()
    const history = useHistory()
    const [position, setPosition] = useState('')
    const [company, setCompany] = useState('')
    const [location, setLocation] = useState('')
    const [status, setStatus] = useState('')
    const [date, setDate] = useState('')
    const [errors, setErrors] = useState({})

    const updatePosition = (e) => setPosition(e.target.value)
    const updateCompany = (e) => setCompany(e.target.value)
    const updateLocation = (e) => setLocation(e.target.value)
    const updateStatus = (e) => setStatus(e.target.value)
    const updateDate = (e) => setDate(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log (position, company, location, status, date)
        function checkErrors() {
            let allErrors = {}
            if (position === '')  {
                allErrors['position'] = 'Position is required'
            }
            if (!company) {
                allErrors['company'] = 'Company name is requried'
            }
            if (!location) {
                allErrors['location'] = 'Job location is required'
            }
            if (!status) {
                allErrors['status'] = 'Interview status is required'
            }
            if (!date) {
                allErrors['date'] = 'Interview date is required'
            }
            // console.log (allErrors)
            // console.log (Object.values(allErrors).length)
            if (Object.values(allErrors).length > 0) {
                
                setErrors(allErrors)
                console.log (allErrors)
                return 
            }
        }
        checkErrors()
    
        const interview = {
            position, 
            company, 
            location, 
            status,
            date
        }
        console.log (interview)
        await dispatch(createInterviewThunk(interview))
        // let createdInterview  = await dispatch(createInterviewThunk(interview).catch(async (res) => {
        //     const data = await res.json()
        // })) 
        // if (createdInterview) {
        //     history.push('/allInterviews')
        // }
    }

    return <>
    <main>
        <div>
            <p>Add a new Interview</p>
        </div>
        <form onSubmit={handleSubmit}>
            <div>
            {errors && errors.position &&
                                        <p style={{ color: "red" }} className='cre-spt-err'>{errors.position}</p>}
                <div>
                    <label for = 'position'>Position</label>
                    <input id='position' type='text' placeholder='enter city/state' onChange={updatePosition}/>
                </div>
                {errors && errors.company &&
                                        <p style={{ color: "red" }} className='cre-spt-err'>{errors.company}</p>}
                <div>
                    <label for = 'company'>Company</label>
                    <input id='company' type='text' placeholder='enter city/state' onChange={updateCompany}/>
                </div>
                {errors && errors.location &&
                                        <p style={{ color: "red" }} className='cre-spt-err'>{errors.location}</p>}
                <div>
                    <label for = 'location'>Location</label>
                    <input id='location' type='text' placeholder='enter city/state' onChange={updateLocation}/>
                </div>
                {errors && errors.status &&
                                        <p style={{ color: "red" }} className='cre-spt-err'>{errors.status}</p>}
                <div>
                    <label for = 'status'>Status</label>
                    <input id='status' type='text' placeholder='enter city/state' onChange={updateStatus}/>
                </div>
                {errors && errors.date &&
                                        <p style={{ color: "red" }} className='cre-spt-err'>{errors.date}</p>}
                <div>
                    <label for = 'status'>Date</label>
                    <input id='status' type='date'  onChange={updateDate}/>
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </div>
        </form>
    </main>
    </>
}

export default AddInterviewForm 