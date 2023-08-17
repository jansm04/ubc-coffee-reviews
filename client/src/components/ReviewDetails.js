import formatDistanceToNow from "date-fns/formatDistanceToNow"

import { useReviewContext } from "../hooks/useReviewContext"

const ReviewDetails = ({ review }) => {

    const {dispatch} = useReviewContext()

    const handleClick = async () => {
        const response = await fetch('/api/reviews/' + review._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_REVIEW', payload: json})
        }
    }
    
    return (
        <div className="review-details">
            <div className="review-header">
                <p>Shop: {review.shop}</p>
                <p>Rating: {review.rating}</p>
            </div>
            <p className="review">{review.review}</p>
            <p className="date">{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })} by @{review.username}</p>
            <button onClick={handleClick}>Delete</button>
        </div>
    )
}

export default ReviewDetails