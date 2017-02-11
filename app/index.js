import React from 'react';
import { render } from 'react-dom';

if (module.hot) {
  module.hot.accept();
}

const Main = React.createClass({
  render() {
    return (
      <h1>
        Hello React!
      </h1>
    );
  }
});

// render everything
render(<Main />, document.getElementById('root'));
