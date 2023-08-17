import { useEffect } from "react"
import { useState } from "react"
import { useReviewContext } from "../hooks/useReviewContext"

// components
import ReviewDetails from '../components/ReviewDetails'
import ReviewForm from "../components/ReviewForm"
import Podium from "../components/Podium"

const Home = () => {

    const {reviews, dispatch} = useReviewContext()
    const [query, setQuery] = useState('All')

    const shops = [
        {name: 'All'},
        {name: 'JJ Bean'},
        {name: 'Great Dane Coffee'},
        {name: 'Loafe Cafe'},
        {name: 'Bean Around The World'},
        {name: 'Boulevard'}
    ]

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch('/api/reviews')
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_REVIEWS', payload: json })
            }
        }

        fetchReviews()
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleSelect = (event) => {
        setQuery(event.target.value)
    }

    const filteredReviews = reviews && reviews.filter(review => {
        if (query === 'All') {
            return true
        } else {
            return review.shop === query
        }
    })

    return (
        <div className="container">
            <Podium reviews={reviews}/>
            <div className="home">
                <ReviewForm/>
                <div className="reviews">
                    <h4 className="reviews-header">Reviews</h4>  
                    <form className="filter-shops" onSubmit={handleSubmit}>
                        <label>Filter: </label>
                        <select value={query} onChange={handleSelect}>
                            {shops.map((shop) => (
                                <option>{shop.name}</option>
                            ))}
                        </select>
                        <label className="total-results">
                            {filteredReviews && filteredReviews.length}
                            {filteredReviews && (filteredReviews.length === 1)?' review':' reviews'}
                        </label>
                    </form>   
                    {filteredReviews && filteredReviews.map((review) => (
                        <ReviewDetails key={review._id} review={review}/>
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export default Home