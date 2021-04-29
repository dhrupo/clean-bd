import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";

const Feedback = () => {
  const [review, setReview] = useState([]);
  useEffect(() => {
    fetch(`https://whispering-coast-91544.herokuapp.com/reviews`)
      .then(res => res.json())
      .then(data => setReview(data))
  }, [])
  return (
    <div className="p-5">
      <h5 className="mb-4 title text-center text-light">Customer Feedback</h5>
      <div className="row row-cols-1 row-cols-md-3 g-4 text-center">
        {
          review.map(rv =>
            <div className="col text-center" key={rv._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{rv.user}</h5>
                  <p className="card-text d-flex justify-content-center">
                    <ReactStars
                      edit={false}
                      value={rv.rating}
                      size={24}
                    />
                  </p>
                  <p>{rv.reviewText}</p>
                </div>
              </div>
            </div>
          )
        }

      </div>
    </div>
  );
};

export default Feedback;