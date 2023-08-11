import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { addCommentThunk } from "../../store/interview";
import { getAllInterviewsThunk } from "../../store/interview";
import OpenModalButton from "../OpenModalButton";
import DeleteComment from "../DeleteCommentModal";
import EditCommentForm from "../EditCommentModal";
import { addUserCommentThunk } from "../../store/allinterviews";
import { FaLocationArrow } from 'react-icons/fa'
import { MdWork } from 'react-icons/md'
import { BsCalendar2Week } from 'react-icons/bs'
import './app.css'
import userImage from '../../utilities/user_image.jpg'
import { getAllUsersInterviewThunk } from "../../store/allinterviews";


function InterviewDetail({ }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const [comment, setComment] = useState('')
    let interview = useSelector((store) => store.allinterviews[id] )
    console.log (interview, '------------------this is interview id')
    // console.log 
    const [errors, setErrors] = useState({})
    console.log(interview)
    let user = useSelector((store) => store?.session['user'])
    console.log(user)
    console.log(comment, '---------this is the initial comment')
    useEffect(() => {
        dispatch(getAllInterviewsThunk())
        dispatch(getAllUsersInterviewThunk())
    }, [dispatch, id])
    if (!user) {
        history.push('/')
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        function checkErrors() {
            let allErrors = {}
            if (comment === '') {
                allErrors['minLength'] = "Comment can't be empty"
            }
            if (comment.length > 300) {
                allErrors['maxLength'] = "Comment can't be more then 300 Character Long"
            }
            if (Object.values(allErrors).length > 0) {
                setErrors(allErrors)
                console.log(errors, '---------------these are errors')
                return true
            } else {
                return false
            }

        }
        if (checkErrors() === false) {
            await dispatch(addUserCommentThunk(interview.id, {
                comment: comment
            }))
            await dispatch(getAllInterviewsThunk())
            await dispatch(getAllUsersInterviewThunk())
            await setComment('')
            await setErrors({})

        }



    }
    // console.log (interview[1],'---------testing state')
    if (interview) {
        return <main className="Int-det-container">

            <div className='int-det-inner-cont'>
                <div className='allInt-top-cont'>
                    <div className='allInt-com-letter'>
                        <p>{interview.company[0].toUpperCase()}</p>
                    </div>
                    <div>
                        <p className='allInt-com-pos'>{interview.position}</p>
                        <p className='allInt-com-name'>{interview.company}</p>
                    </div>
                </div>
                <div className='allInt-btm-container'>
                    <div className='allInt-btm-left-cont'>
                        <div className='allInt-loc-type-cont'>
                            <p className='allInt-loc-text'><FaLocationArrow className='allInt-loc-logo' />{interview.location}</p>
                            <p>
                                <MdWork className='allInt-type-logo' />type
                            </p>
                        </div>

                        <div className='allInt-btm-bttns'>
                        </div>


                    </div>
                    <div className='allInt-btm-right-container'>
                        {user.id === interview.userId && (

                            <p className='allInt-date'><BsCalendar2Week className='allInt-int-logo' />{interview['date'].slice(0, 17)}</p>
                        )}
                        {interview.status === 'Pending' && (
                            <p className='allInt-Pending'>{interview.status}</p>
                        )}
                        {interview.status === 'Scheduled' && (
                            <p className='allInt-Scheduled'>{interview.status}</p>
                        )}
                        {interview.status === 'Declined' && (
                            <p className='allInt-Declined'>{interview.status}</p>
                        )}
                    </div>
                </div>





            </div>


            <div className="int-det-comm-cont">
                <div>
                <div className="new-comm-err-cont">
                        {errors && errors.maxLength && <p>{errors.maxLength}</p>}
                        {errors && errors.minLength && <p>{errors.minLength}</p>}
                    </div>
                    <div className="comm-post-cont">
                        <form onSubmit={handleSubmit} className="comm-post-form">
                            <div>
                                <textarea placeholder="Write your comment here" onChange={(e) => setComment(e.target.value)} value={comment} />
                            </div>

                            <div className="comm-post-btn">
                                <button type="submit">Submit</button>
                            </div>

                        </form>
                    </div>
                    {interview.comments.reverse().map((comm) => {
                        return <>
                            <div key={comm.id} className="int-det-sin-comm">
                                <div className="comm-img">
                                    <img src={userImage} />
                                </div>
                                <div className="comm-user-name-comm">
                                    <p><span className="comm-user-text-name">{comm['user'].username}</span> <span id="comm-text">{comm.comment}</span></p>
                                    <div>
                                        {user.id === comm['user'].id && (
                                            <div className="comm-btns">

                                                <button>
                                                    <OpenModalButton
                                                        buttonText={'Remove'}
                                                        modalComponent={
                                                            <DeleteComment
                                                                interviewId={interview.id} commentId={comm.id}
                                                            />
                                                        }
                                                    />
                                                </button>
                                                <button>
                                                    <OpenModalButton
                                                        buttonText={'Edit'}
                                                        modalComponent={
                                                            <EditCommentForm
                                                                interviewId={interview.id} commentId={comm.id} comment={comm.comment}
                                                            />
                                                        }
                                                    />
                                                </button>

                                            </div>


                                        )}
                                    </div>
                                </div>
                                <div className="comm-time">
                                    <p>{comm.created_at.slice(4, 16)}</p>
                                </div>

                            </div>
                        </>
                    })}
                    {/* <div className="new-comm-err-cont">
                        {errors && errors.maxLength && <p>{errors.maxLength}</p>}
                        {errors && errors.minLength && <p>{errors.minLength}</p>}
                    </div>
                    <div className="comm-post-cont">
                        <form onSubmit={handleSubmit} className="comm-post-form">
                            <div>
                                <textarea placeholder="Write your comment here" onChange={(e) => setComment(e.target.value)} value={comment} />
                            </div>

                            <div className="comm-post-btn">
                                <button type="submit">Submit</button>
                            </div>

                        </form>
                    </div> */}

                </div>
            </div>
        </main>
    }
    return <>
        <p>Loading...</p>
    </>



}


export default InterviewDetail