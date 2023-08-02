import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { editInterviewThunk } from '../../store/interview'
import { useModal } from '../../context/Modal'


function EditInterviewForm({ id, interview }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [position, setPosition] = useState(interview.position)
    const [company, setCompany] = useState(interview.company)
    const [location, setLocation] = useState(interview.location)
    const [status, setStatus] = useState(interview.status)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()
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
    const [date, setDate] = useState(incomingDate(interview.date.slice(5,17)))

    // console.log (date, '----------this is the final date')


    const updatePosition = (e) => setPosition(e.target.value)
    const updateCompany = (e) => setCompany(e.target.value)
    const updateLocation = (e) => setLocation(e.target.value)
    const updateStatus = (e) => setStatus(e.target.value)
    const updateDate = (e) => setDate(e.target.value)
    console.log(date)

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
            if (!status) {
                allErrors['status'] = 'Interview status is required'
            }
            if (!date) {
                allErrors['date'] = 'Interview date is required'
            }

            function checkDate(date) {
                const currentDate = new Date()
                const formDate = new Date(date)
                if (formDate.getTime() < currentDate.getTime()) {
                    allErrors['pastDate'] = "Interview date can't be in the past"
                }

            }
            checkDate(date)
            if (Object.values(allErrors).length > 0) {

                setErrors(allErrors)
                console.log(allErrors)
                return
            }
        }
        checkErrors()

        const editedInterview = {
            position,
            company,
            location,
            status,
            date
        }
        console.log(editedInterview)
        let created = await dispatch(editInterviewThunk(id, editedInterview))
        if (created) {
            closeModal()
        }
    }


    return <>
        <main>

            <div>
                <p>Edit interview</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    {errors && errors.position &&
                        <p style={{ color: "red" }} className='cre-spt-err'>{errors.position}</p>}
                    <div>
                        <label for='position'>Position</label>
                        <input id='position' type='text' value={position} placeholder='enter city/state' onChange={updatePosition} />
                    </div>
                    {errors && errors.company &&
                        <p style={{ color: "red" }} className='cre-spt-err'>{errors.company}</p>}
                    <div>
                        <label for='company'>Company</label>
                        <input id='company' type='text' value={company} placeholder='enter city/state' onChange={updateCompany} />
                    </div>
                    {errors && errors.location &&
                        <p style={{ color: "red" }} className='cre-spt-err'>{errors.location}</p>}
                    <div>
                        <label for='location'>Location</label>
                        <input id='location' type='text' value={location} placeholder='enter city/state' onChange={updateLocation} />
                    </div>
                    {errors && errors.status &&
                        <p style={{ color: "red" }} className='cre-spt-err'>{errors.status}</p>}
                    <div>
                        <label for='status'>Status</label>
                        <input id='status' type='text' value={status} placeholder='interview Status' onChange={updateStatus} />
                    </div>
                    {errors && errors.date &&
                        <p style={{ color: "red" }} className='cre-spt-err'>{errors.date}</p>}
                    {errors && errors.pastDate &&
                        <p style={{ color: "red" }} className='cre-spt-err'>{errors.pastDate}</p>}
                    <div>
                        <label for='date'>Date</label>
                        <input id='date' type='date' value={date} onChange={updateDate} />
                    </div>
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                </div>
            </form>
        </main>
    </>


}

export default EditInterviewForm