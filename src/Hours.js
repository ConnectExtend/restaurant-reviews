import React from 'react';

import './Hours.css';

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

class Hours extends React.Component {

  // eslint-disable-next-line
  _formatTime(militaryTime) {
    militaryTime = `${militaryTime.substring(0, 2)}:${militaryTime.substring(2)}`;
    const date = new Date(`August 27, 2018 ${militaryTime}`);
    const options = {hour: '2-digit', minute:'2-digit'};
    return date.toLocaleTimeString(undefined, options);
  }

  _formatRawHours(hours) {
    const elements = [];
    for (let i = 0; i < DAYS.length; i += 1) {
      const matching = hours.filter(hourObj => hourObj.day === i);
      elements.push((
        <li key={i} className="hours-day" tabIndex="0">
          {DAYS[i]}:
          <ul className="hours-hours">
            {matching.length === 0 ? <li>Closed</li>
              : matching.map((m, k) => <li key={k}>{`${this._formatTime(m.start)} until ${this._formatTime(m.end)}`}</li>
            )}
          </ul>
        </li>
      ));
    } 
    return elements;
  }

  render() {
    return (
      <ul className="hours-container">
        {this._formatRawHours(this.props.hours)}
      </ul>
    );
  }

}

export default Hours;
