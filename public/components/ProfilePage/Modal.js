import React from 'react';

export class Modal extends React.Component {
  render() {
    return (
      <div className="modal-overlay">
        <div className="modal-window">
          {' '}
          SEND RECOMMENDATION
          <div className="modal-content">
            <input type="text" placeholder="film name" />
            <input type="text" placeholder="rex handle" />
            <button>send</button>
            <button onClick={this.props.toggleModal}>close</button>
          </div>
        </div>
      </div>
    );
  }
}
