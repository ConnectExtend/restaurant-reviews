import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import TextTruncate from 'react-text-truncate';

import './Review.css'

class Review extends React.Component {

  render() {
    const review = this.props.review;
    return (
      <ul tabIndex={this.props.getIndex()} className="review">
        <li className="review-content">
          <div className="review-info">
            <strong className="review-author">{review.author_name}</strong>
            <span>&nbsp;- {review.relative_time_description}</span>
          </div>
          <div aria-label={`${review.rating} out of 5 stars`}>
            <StarRatingComponent
              editing={false}
              name="review-star"
              value={review.rating}
            />            
          </div>
          <TextTruncate
            text={review.text}
            line={3}
            className="review-text"
            truncateText="..."
          />
        </li>
      </ul>
    )
  }

}

export default Review;
