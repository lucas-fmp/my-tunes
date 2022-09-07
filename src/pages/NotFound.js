import React from 'react';

class NotFound extends React.Component {
  render() {
    return (
      <div
        data-testid="page-not-found"
        className="h1 text-black fw-bold h-100 d-flex
        justify-content-center align-items-center"
      >
        Not Found
      </div>
    );
  }
}

export default NotFound;
