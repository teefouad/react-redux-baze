import React from 'react';
import connectToStore from '../../connectToStore';
import reducer from './reducer';
import * as actions from './actions';

const About = React.createClass({
  propTypes: {
    actions: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      actions: {}
    };
  },

  render() {
    return (
      <div id="about">
        <h1>
          About
        </h1>

        <button onClick={() => this.props.actions.about.saySomething()}>
          Say Something!
        </button>
      </div>
    );
  }
});

export default connectToStore(About, { reducer, actions, stateKey: 'about' });
