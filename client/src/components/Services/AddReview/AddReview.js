import React, { useContext, useState } from 'react';
import { UserContext } from '../../../App';
import ReactStars from "react-rating-stars-component";

const AddReview = () => {
  const [review, setReview] = useState();
  const [rating, setRating] = useState(1);
  const [user, setUser] = useContext(UserContext);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewText = e.target.reviewText.value;
    const reviewData = {
      user: user.displayName || user.email,
      rating: rating,
      reviewText: reviewText
    }

    fetch("https://whispering-coast-91544.herokuapp.com/addReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reviewData)
    })
      .then(res => {
        alert("Review successfully added");
      })
  }

  return (
    <form onSubmit={handleSubmit} className="p-5">
      <div className="mb-3">
        <label className="form-label">
          Your Rating
        </label>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Write a message:
        </label>
        <textarea name="reviewText" class="form-control" placeholder="Leave a comment here"></textarea>
      </div>
      <button className="btn btn-outline-light">Submit</button>
    </form>
  );
};

export default AddReview;