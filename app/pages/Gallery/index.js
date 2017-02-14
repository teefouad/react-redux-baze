import React from 'react';
import connectToStore from '../../connectToStore';
import reducer from './reducer';
import * as actions from './actions';
import * as sagas from './sagas';

const Gallery = React.createClass({
  propTypes: {
    gallery: React.PropTypes.object,
    actions: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      gallery: {},
      actions: {},
    };
  },

  loadShots() {
    this.props.actions.gallery.loadShots();
  },

  renderShots() {
    if (this.props.gallery.loading) {
      return (
        <div>
          Loading...
        </div>
      );
    } else
    if (this.props.gallery.error) {
      return (
        <div>
          An error has occured.
        </div>
      );
    }

    return (
      <ul>
        {
          this.props.gallery.shots.map(shot => (
            <li key={shot.id}>
              {shot.title}
            </li>
          ))
        }
      </ul>
    );
  },

  render() {
    return (
      <div id="gallery">
        <h1>
          Gallery
        </h1>

        <button onClick={this.loadShots}>
          Load Shots
        </button>

        {
          this.renderShots()
        }
      </div>
    );
  }
});

export default connectToStore(Gallery, { reducer, actions, sagas, stateKey: 'gallery' });
