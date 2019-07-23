import React from 'react';

export class AddFavFilmDropDown extends React.Component {
  state = {
    modalOpen: false
  };

  render() {
    return (
      <div className="add-film-drop-down">
        <input type="text" />
        <button> add</button>
      </div>
    );
  }
}
