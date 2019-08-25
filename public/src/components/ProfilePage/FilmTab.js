import React from 'react'
import axios from 'axios'
import { FavouriteFilms } from './FavouriteFilms'
import { AddFavFilm } from './AddFavFilm'

export class FilmTab extends React.Component {
  state = {
    showAddFilmPanel: false
  }
  toggleAddFilmPanel = () => {
    this.setState({ showAddFilmPanel: !this.state.showAddFilmPanel })
  }
  render() {
    const { addFilm, favFilms, deleteFilm, openModal } = this.props
    const { showAddFilmPanel } = this.state
    const films = favFilms || []
    return (
      <div>
        <button onClick={this.toggleAddFilmPanel}> +</button>
        {showAddFilmPanel && <AddFavFilm addFilm={addFilm} />}
        <FavouriteFilms
          films={films}
          deleteFilm={deleteFilm}
          editMode={true}
          openModal={openModal}
        />
      </div>
    )
  }
}
