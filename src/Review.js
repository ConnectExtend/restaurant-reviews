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
    return (
      <ul className="review">
        <li className="review-avatar">
          <a className="review-link" href={review['author_url']}>
            <img src={review['profile_photo_url'].replace('s128', 's40')} alt="Reviewer's avatar"/>
          </a>
        </li>
        <li className="review-content">
          <div className="review-info">
            <StarRatingComponent
              name="rating"
              editing={false}
              value={review.rating}
              starCount={5}
            />
            <p>{review.relative_time_description}</p>
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