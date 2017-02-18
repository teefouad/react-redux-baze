import React from 'react';
import connectToStore from '../../connectToStore';
import reducer from './reducer';
import * as actions from './actions';
import * as sagas from './sagas';
import styles from './styles.css';

const Gallery = React.createClass({
  propTypes: {
    about: React.PropTypes.object,
    actions: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      about: {},
      actions: {},
    };
  },

  componentDidMount() {
    this.props.actions.about.loadShots(1);
  },

  loadPrevShots() {
    this.props.actions.about.loadShots(this.props.about.page - 1);
  },

  loadNextShots() {
    this.props.actions.about.loadShots(this.props.about.page + 1);
  },

  renderShots() {
    if (this.props.about.loading) {
      return (
        <div>
          Loading...
        </div>
      );
    } else
    if (this.props.about.error) {
      return (
        <div>
          An error has occured.
        </div>
      );
    }

    return (
      <ul>
        {
          this.props.about.shots.map(shot => (
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
      <div id="about" className={styles.app}>
        <h1>
          About
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

export default connectToStore(Gallery, { reducer, actions, sagas, stateKey: 'about' });
