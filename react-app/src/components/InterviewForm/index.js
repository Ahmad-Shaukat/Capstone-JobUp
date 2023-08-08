import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createInterviewThunk } from '../../store/interview'
import './app.css'

function AddInterviewForm() {
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
            if (position === '') {
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
            if (position.length > 15) {
                allErrors['positionLength'] = 'Position can not be more then 15 letters'
            }
            if (company.length > 10) {
                allErrors['companyLength'] = 'Company name can not be more then 1o letters'
            }
            if (location.length > 10) {
                allErrors['locationLength'] = 'Location can not be more then 1o letters'
            }
            function checkDate(date) {
                const currentDate = new Date()
                const formDate = new Date(date)
                if (formDate.getTime() < currentDate.getTime()) {
                    allErrors['pastDate'] = "Interview date can't be in the past"
                }

            }

            checkDate(date)

            // console.log (allErrors)
            // console.log (Object.values(allErrors).length)
            if (Object.values(allErrors).length > 0) {

                setErrors(allErrors)
                console.log(allErrors)
                return true
            } else {
                return false
            }
        }
        console.log(checkErrors(), '------------------')
        if (checkErrors() === false) {
            const interview = {
                position,
                company,
                location,
                status,
                date
            }
            console.log(interview)
            await dispatch(createInterviewThunk(interview))
            history.push('/interviews')


        } else {
            return
        }



    }

    return <>
        <main className='cre-int-cont'>
            <div className='cre-int-heading'>
                <p>Add Interview</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='cre-int-form-cont'>


                    <div>
                        {errors && errors.position &&
                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.position}</p>}
                        {errors && errors.positionLength &&
                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.positionLength}</p>}
                        <div className='cre-int-pos-cont'>
                            <label for='position'>Position</label>
                            <input id='position' type='text' onChange={updatePosition} />
                        </div>


                    </div>
                    <div>
                        {errors && errors.company &&
                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.company}</p>}
                        {errors && errors.companyLength &&
                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.companyLength}</p>}
                        <div className='cre-int-pos-cont'>

                            <label for='company'>Company</label>
                            <input id='company' type='text' onChange={updateCompany} />
                        </div>
                    </div>
                    <div>
                        {errors && errors.location &&
                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.location}</p>}
                        {errors && errors.locationLength &&
                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.locationLength}</p>}

                        <div className='cre-int-pos-cont'>
                            <label for='location'>Location</label>
                            <input id='location' type='text' onChange={updateLocation} />
                        </div>

                    </div>
                    <div>
                        {errors && errors.status &&
                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.status}</p>}
                        <div className='cre-int-status-cont'>

                            <label id='status'>Status</label>
                            <select id='status'
                                className="status-select"
                                name="status"
                                onChange={updateStatus}
                            >
                                <option key={'NA'} value={'wrong'}>
                                    Pick One
                                </option>
                                <option key={'Pending'} value={'Pending'}>
                                    Pending
                                </option>
                                <option key={'Scheduled'} value={'Scheduled'}>
                                    Scheduled
                                </option>
                                <option key={'Declined'} value={'Declined'}>
                                    Declined
                                </option>
                            </select>
                        </div>

                    </div>

                    <div>
                        {errors && errors.date &&
                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.date}</p>}
                        {errors && errors.pastDate &&
                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.pastDate}</p>}
                            <div className='cre-int-date-cont'>
                                <label for='status'>Date</label>
                        <input id='status' type='date' onChange={updateDate} />
                            </div>
                        
                    </div>
                    <div className='cre-int-sub-btn'>
                        <button type='submit' id='cre-itn-sub-button'>Submit</button>
                    </div>
                </div>
            </form>
        </main>
    </>
}

export default AddInterviewForm 