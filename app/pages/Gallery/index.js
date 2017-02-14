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

  componentDidMount() {
    this.props.actions.gallery.loadShots(1);
  },

  loadPrevShots() {
    this.props.actions.gallery.loadShots(this.props.gallery.page - 1);
  },

  loadNextShots() {
    this.props.actions.gallery.loadShots(this.props.gallery.page + 1);
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
              <img src={shot.images.teaser} alt={shot.title} />
              <p>
                {shot.title}
              </p>
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

        <button onClick={this.loadPrevShots}>
          Load Prev Page
        </button>

        <button onClick={this.loadNextShots}>
          Load Next Page
        </button>

        {
          this.renderShots()
        }
      </div>
    );
  }
});

export default connectToStore(Gallery, { reducer, actions, sagas, stateKey: 'gallery' });
