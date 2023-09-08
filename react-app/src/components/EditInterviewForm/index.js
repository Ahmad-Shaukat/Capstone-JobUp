import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { editInterviewThunk } from '../../store/interview'
import { useModal } from '../../context/Modal'
import './app.css'


function EditInterviewForm({ id, interview, onCancel, afterSaving }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [position, setPosition] = useState(interview.position)
    const [company, setCompany] = useState(interview.company)
    const [location, setLocation] = useState(interview.location)
    const [status, setStatus] = useState(interview.status)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
    const [type, setType] = useState(interview.type)
    // console.log (interview['date'], '-----------this is the incomin fdate without modification')
    // console.log(interview['date'].slice(5,17), '----------this is incoming date slicied out')

    // console.log (interview['date'].getDate(), '----------interview date')
    function incomingDate(inputDate) {
        const dateObject = new Date(inputDate);
        // console.log(dateObject.getDate(), '----------date obj')
        const year = dateObject.getFullYear();
        dateObject.setHours(0);
        dateObject.setMinutes(0);
        dateObject.setSeconds(0);
        dateObject.setMilliseconds(0);

        // console.log(dateObject, '----------this is the date object')
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const timeZone = dateObject.getTimezoneOffset()
        const day = dateObject.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }
    const [date, setDate] = useState(incomingDate(interview.date.slice(5, 17)))

    // console.log (date, '----------this is the final date')


    const updatePosition = (e) => setPosition(e.target.value)
    const updateCompany = (e) => setCompany(e.target.value)
    const updateLocation = (e) => setLocation(e.target.value)
    const updateStatus = (e) => setStatus(e.target.value)
    const updateDate = (e) => setDate(e.target.value)
    console.log(date)
    const updateType = (e) => setType(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
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
            if (!status || status === 'wrong') {
                allErrors['status'] = 'Interview status is required'
            }
            if (!date) {
                allErrors['date'] = 'Interview date is required'
            }
            if (position.length > 50) {
                allErrors['positionLength'] = 'Position can not be more then 15 letters'
            }
            if (company.length > 20) {
                allErrors['companyLength'] = 'Company name can not be more then 1o letters'
            }
            if (location.length > 10) {
                allErrors['locationLength'] = 'Location can not be more then 1o letters'
            }
            if (!type || type === 'wrong') {
                allErrors['type'] = 'Interview type is required'
            }

            function checkDate(date) {
                const currentDate = new Date()
                const formDate = new Date(date)
                if (formDate.getTime() < currentDate.getTime()) {
                    allErrors['pastDate'] = "Interview date can't be in the past"
                }

            }
            // checkDate(date)
            if (Object.values(allErrors).length > 0) {

                setErrors(allErrors)
                console.log(allErrors, '------------these are errors')
                return true
            }
            else {
                return false
            }
        }
        // if ()
        checkErrors()
        if (checkErrors() === false) {

            const editedInterview = {
                position,
                company,
                location,
                status,
                date,
                type
            }
            console.log(editedInterview)
            await dispatch(editInterviewThunk(id, editedInterview))
            afterSaving()

        }

    }


    return <>
        {/* <main className='edit-int-cont'>

            <div className='edit-int-head'>
                <p>Edit interview</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className='cre-int-err-cont'>
                        {errors && errors.position &&
                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.position}</p>}
                        {errors && errors.positionLength &&
                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.positionLength}</p>}

                    </div>
                    <div className='edit-int-post'>
                        <label for='position'>Position</label>
                        <input id='position' type='text' value={position}  onChange={updatePosition} />
                    </div>
                    <div className='cre-int-err-cont'>
                        {errors && errors.company &&
                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.company}</p>}
                        {errors && errors.companyLength &&
                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.companyLength}</p>}
                    </div>

                    <div className='edit-int-post'>
                        <label for='company'>Company</label>
                        <input id='company' type='text' value={company}  onChange={updateCompany} />
                    </div>
                    <div className='cre-int-err-cont'>
                        {errors && errors.location &&
                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.location}</p>}
                        {errors && errors.locationLength &&
                            <p style={{ color: "red" }} className='cre-spt-err'>{errors.locationLength}</p>}
                    </div>

                    <div className='edit-int-post'>
                        <label for='location'>Location</label>
                        <input id='location' type='text' value={location}  onChange={updateLocation} />
                    </div>
                    <div>
                        <div className='cre-int-err-cont'>
                            {errors && errors.type &&
                                <p style={{ color: "red" }} className='cre-spt-err'>{errors.type}</p>}
                        </div>
                        <div className='edit-int-post edit-type-cont'>
                            <label>Type</label>
                            <select id='type' name='type' value={type} onChange={updateType}>
                                <option key={'NA'} value={'wrong'}>Pick One</option>
                                <option key={'Onsite'} value={'Onsite'}>Onsite</option>
                                <option key={'Remote'} value={'Remote'}>Remote</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div className='cre-int-err-cont'>
                            {errors && errors.status &&
                                <p style={{ color: "red" }} className='cre-spt-err'>{errors.status}</p>}
                        </div>

                        <div className='edit-int-post'>
                            <label for='status'>Status</label>

                            <select
                                className="status-select"
                                name="status"
                                onChange={updateStatus}
                                value={status}
                            >
                                <option key={'NA'} value={'wrong'}>
                                    Pick an Option
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
                    <div >
                        <div className='cre-int-err-cont'>
                            {errors && errors.date &&
                                <p style={{ color: "red" }} className='cre-spt-err'>{errors.date}</p>}
                            {errors && errors.pastDate &&
                                <p style={{ color: "red" }} className='cre-spt-err'>{errors.pastDate}</p>}
                        </div>
                        <div className='edit-int-post'>
                            <label for='date'>Date</label>
                            <input id='date' type='date' value={date} onChange={updateDate} />
                        </div>
                    </div>


                    <div className='edit-int-btn'>
                        <button type='submit' className='edit-int-sub-btn'>Submit</button>
                        <button className='edit-int-can-btn' onClick={() => closeModal()}>Cancel</button>
                    </div>
                </div>
            </form>
        </main> */}

        <main className='cre-int-cont'>
            <div className='cre-int-heading'>
                <p>Edit Interview</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='cre-int-form-cont'>


                    <div>
                        <div className='cre-int-err-cont'>
                            {errors && errors.position &&
                                <p style={{ color: "red" }} className='cre-spt-err'>{errors.position}</p>}
                            {errors && errors.positionLength &&
                                <p style={{ color: "red" }} className='cre-spt-err'>{errors.positionLength}</p>}

                        </div>
                        <div className='cre-int-pos-cont'>
                            <label for='position'>Position</label>
                            <input id='position' type='text' onChange={updatePosition} value={position}/>
                        </div>


                    </div>
                    <div>
                        <div className='cre-int-err-cont'>
                            {errors && errors.company &&
                                <p style={{ color: "red" }} className='cre-spt-err'>{errors.company}</p>}
                            {errors && errors.companyLength &&
                                <p style={{ color: "red" }} className='cre-spt-err'>{errors.companyLength}</p>}
                        </div>

                        <div className='cre-int-pos-cont'>

                            <label for='company'>Company</label>
                            <input id='company' type='text' onChange={updateCompany} value={company}/>
                        </div>
                    </div>
                    <div>
                        <div className='cre-int-err-cont'>
                            {errors && errors.location &&
                                <p style={{ color: "red" }} className='cre-spt-err'>{errors.location}</p>}
                            {errors && errors.locationLength &&
                                <p style={{ color: "red" }} className='cre-spt-err'>{errors.locationLength}</p>}
                        </div>


                        <div className='cre-int-pos-cont'>
                            <label for='location'>Location</label>
                            <input id='location' type='text' onChange={updateLocation} value={location}/>
                        </div>

                    </div>
                    <div>
                        <div className='cre-int-err-cont'>
                            {errors && errors.type &&
                                <p style={{ color: "red" }} className='cre-spt-err'>{errors.type}</p>}
                        </div>
                        <div className='cre-int-type-cont'>
                            <label>Type</label>
                            <select id='type' name='type' onChange={updateType} value={type}>
                                <option key={'NA'} value={'wrong'}>Pick One</option>
                                <option key={'Onsite'} value={'Onsite'}>Onsite</option>
                                <option key={'Remote'} value={'Remote'}>Remote</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div className='cre-int-err-cont'>
                            {errors && errors.status &&
                                <p style={{ color: "red" }} className='cre-spt-err'>{errors.status}</p>}
                        </div>

                        <div className='cre-int-status-cont'>

                            <label id='status'>Status</label>
                            <select id='status'
                                className="status-select"
                                name="status"
                                onChange={updateStatus}
                                value={status}
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
                        <div className='cre-int-err-cont'>
                            {errors && errors.date &&
                                <p style={{ color: "red" }} className='cre-spt-err'>{errors.date}</p>}
                            {errors && errors.pastDate &&
                                <p style={{ color: "red" }} className='cre-spt-err'>{errors.pastDate}</p>}
                        </div>

                        <div className='cre-int-date-cont'>
                            <label for='status'>Date</label>
                            <input id='status' type='date' onChange={updateDate} value={date}/>
                        </div>

                    </div>
                    <div className='edit-int-sub-btn'>
                        <button type='submit' id='cre-itn-sub-button'>Save changes</button>
                        <button onClick={onCancel} className='edit-int-form-can-btn'>Cancel</button>
                    </div>
                </div>
            </form>
        </main>
    </>


}

export default EditInterviewForm