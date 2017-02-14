import React from 'react';
import { Link } from 'react-router';

const Main = React.createClass({
  propTypes: {
    children: React.PropTypes.object.isRequired,
  },

  render() {
    return (
      <div id="main">
        <Link to="/">Homepage</Link>
        <Link to="/gallery">Gallery</Link>
        {
          this.props.children && React.cloneElement(this.props.children, { ...this.props })
        }
      </div>
    );
  }
});

export default Main;
