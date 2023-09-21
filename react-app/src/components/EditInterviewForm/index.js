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
    
    function incomingDate(inputDate) {
        const dateObject = new Date(inputDate);
        
        const year = dateObject.getFullYear();
        dateObject.setHours(0);
        dateObject.setMinutes(0);
        dateObject.setSeconds(0);
        dateObject.setMilliseconds(0);

        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const timeZone = dateObject.getTimezoneOffset()
        const day = dateObject.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }
    const [date, setDate] = useState(incomingDate(interview.date.slice(5, 17)))

    


    const updatePosition = (e) => setPosition(e.target.value)
    const updateCompany = (e) => setCompany(e.target.value)
    const updateLocation = (e) => setLocation(e.target.value)
    const updateStatus = (e) => setStatus(e.target.value)
    const updateDate = (e) => setDate(e.target.value)
    
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
            if (!location || location =='wrong') {
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
            if (location.length > 15) {
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
            
            await dispatch(editInterviewThunk(id, editedInterview))
            afterSaving()

        }

    }


    return <>
        

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
                            <select id='location' onChange={updateLocation} value={location}>
                            <option key={'NA'} value={'wrong'}>Pick One</option>
  <option key="alabama" value="Alabama">Alabama</option>
  <option key="alaska" value="Alaska">Alaska</option>
  <option key="arizona" value="Arizona">Arizona</option>
  <option key="arkansas" value="Arkansas">Arkansas</option>
  <option key="california" value="California">California</option>
  <option key="colorado" value="Colorado">Colorado</option>
  <option key="connecticut" value="Connecticut">Connecticut</option>
  <option key="delaware" value="Delaware">Delaware</option>
  <option key="florida" value="Florida">Florida</option>
  <option key="georgia" value="Georgia">Georgia</option>
  <option key="hawaii" value="Hawaii">Hawaii</option>
  <option key="idaho" value="Idaho">Idaho</option>
  <option key="illinois" value="Illinois">Illinois</option>
  <option key="indiana" value="Indiana">Indiana</option>
  <option key="iowa" value="Iowa">Iowa</option>
  <option key="kansas" value="Kansas">Kansas</option>
  <option key="kentucky" value="Kentucky">Kentucky</option>
  <option key="louisiana" value="Louisiana">Louisiana</option>
  <option key="maine" value="Maine">Maine</option>
  <option key="maryland" value="Maryland">Maryland</option>
  <option key="massachusetts" value="Massachusetts">Massachusetts</option>
  <option key="michigan" value="Michigan">Michigan</option>
  <option key="minnesota" value="Minnesota">Minnesota</option>
  <option key="mississippi" value="Mississippi">Mississippi</option>
  <option key="missouri" value="Missouri">Missouri</option>
  <option key="montana" value="Montana">Montana</option>
  <option key="nebraska" value="Nebraska">Nebraska</option>
  <option key="nevada" value="Nevada">Nevada</option>
  <option key="new-hampshire" value="New Hampshire">New Hampshire</option>
  <option key="new-jersey" value="New Jersey">New Jersey</option>
  <option key="new-mexico" value="New Mexico">New Mexico</option>
  <option key="new-york" value="New York">New York</option>
  <option key="north-carolina" value="North Carolina">North Carolina</option>
  <option key="north-dakota" value="North Dakota">North Dakota</option>
  <option key="ohio" value="Ohio">Ohio</option>
  <option key="oklahoma" value="Oklahoma">Oklahoma</option>
  <option key="oregon" value="Oregon">Oregon</option>
  <option key="pennsylvania" value="Pennsylvania">Pennsylvania</option>
  <option key="rhode-island" value="Rhode Island">Rhode Island</option>
  <option key="south-carolina" value="South Carolina">South Carolina</option>
  <option key="south-dakota" value="South Dakota">South Dakota</option>
  <option key="tennessee" value="Tennessee">Tennessee</option>
  <option key="texas" value="Texas">Texas</option>
  <option key="utah" value="Utah">Utah</option>
  <option key="vermont" value="Vermont">Vermont</option>
  <option key="virginia" value="Virginia">Virginia</option>
  <option key="washington" value="Washington">Washington</option>
  <option key="west-virginia" value="West Virginia">West Virginia</option>
  <option key="wisconsin" value="Wisconsin">Wisconsin</option>
  <option key="wyoming" value="Wyoming">Wyoming</option>
</select>
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
                                <option key={'Offered'} value={'Offered'}>
                                    Offered
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