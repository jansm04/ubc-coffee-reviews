import { useState } from "react";

import { useReviewContext } from "../hooks/useReviewContext";

const ReviewForm = () => {

    const {dispatch} = useReviewContext()

    const [username, setUsername] = useState('')
    const [shop, setShop] = useState('')
    const [rating, setRating] = useState('')
    const [review, setReview] = useState('')
    const [error, setError] = useState(null)

    const shops = [
        {name: '< Choose a coffee shop to review >'},
        {name: 'JJ Bean'},
        {name: 'Great Dane Coffee'},
        {name: 'Loafe Cafe'},
        {name: 'Bean Around The World'},
        {name: 'Boulevard'}
    ]

    const ratings = [
        {rating: '< Choose a rating >'},
        {rating: 'Fresh ✅'},
        {rating: 'Mud 🗑'}
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newReview = {username, shop, rating, review}

        const response = await fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify(newReview),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setUsername('')
            setShop('')
            setRating('')
            setReview('')
            setError(null)
            console.log('New review added:', json)
            dispatch({ type: 'CREATE_REVIEW', payload: json })
        }
    }

    function handleShopSelect(event) {
        if (event.target.value !== shops[0].name) {
            setShop(event.target.value)
        }
    }

    function handleRatingSelect(event) {
        if (event.target.value !== ratings[0].rating) {
            setRating(event.target.value)
        }
    }

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <h2 className="post-review-header">Post A Review</h2>
            <label>Username: </label>
            <input 
                type="text" 
                value={username}
                onChange={event => setUsername(event.target.value)}
                placeholder="Ex: john_smith04"
            />
            <label>Shop: </label>
            <select value={shop} className="shop-select" onChange={handleShopSelect}>
                {shops.map(shop => (
                    <option>{shop.name}</option>
                ))}
            </select>

            <label>Rating: </label>
            <select value={rating} className="rating-select" onChange={handleRatingSelect}>
                {ratings.map(r => (
                    <option>{r.rating}</option>
                ))}
            </select>
            <label>Review: </label>
            <textarea 
                type="text" 
                value={review}
                onChange={event => setReview(event.target.value)}
                className="review-input"
                placeholder="Enter review..."
            />
            <button>Post</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ReviewForm