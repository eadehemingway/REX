import React from 'react'

import { AddFavFilmDropDownConnected } from './AddFavFilmDropDown'

export class FavouriteFilms extends React.Component {
  state = {
    showAddFilmDropDown: false
  }

  toggleDropDown = () => {
    this.setState({ showAddFilmDropDown: !this.state.showAddFilmDropDown })
  }

  render() {
    const { showAddFilmDropDown } = this.state
    const {films} = this.props

    return (
      <div>
        <h2> my films</h2>
        {this.props.films.map(f=> (<p key={f.title}>{f.title}</p>))}
        <button onClick={this.toggleDropDown}> add new</button>
        {showAddFilmDropDown && <AddFavFilmDropDownConnected />}
      </div>
    )
  }
}
