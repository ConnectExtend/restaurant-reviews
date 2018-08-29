import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import TextTruncate from 'react-text-truncate';

import './Review.css'

export class Review extends React.Component {

  static getLongest(reviews) {
    let longest;
    for (let i = 0; i < reviews.length; i++) {
      if (longest === undefined || reviews[i].text.length > longest.text.length) {
        longest = reviews[i];
      }
    }
    return longest;
  }

  render() {
    const review = this.props.review;
    const getIndex = this.props.getIndex;
    return (
      <ul tabIndex={getIndex()} className="review">
        <li className="review-content">
          <div className="review-info">
            <strong className="review-author">{review['author_name']}</strong>
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