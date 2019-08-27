import React from 'react'
import { LargeTiles } from './LargeTiles'
import { SmallTiles } from './SmallTiles'
import { connect } from 'react-redux'
import './style.css'
import axios from 'axios'
class FilmTab extends React.Component {
  state = {
    films: []
  }
  componentDidMount() {
    this.setState({ films: this.props.films })
  }

  addFilm = newFilm => {
    const newFilmArr = [...this.state.films, newFilm]
    this.setState({ films: newFilmArr })

    axios
      .patch('/api/film', {
        handle: this.props.signedInUser,
        filmInfo: newFilm
      })
      .catch(e => console.log('ERROR ADDING FILM', e))
  }
  deleteFilm = filmId => {
    const { films } = this.state
    const newFilmArr = [...films].filter(f => f._id !== filmId)
    this.setState({ films: newFilmArr })
    axios
      .delete(`/api/film/${filmId}`)
      .catch(e => console.log('ERROR DELETING FILM', e))
  }
  render() {
    const { editMode, signedInUser, openModal } = this.props
    const { films } = this.state
    // console.log('films in film tab', films)
    const topFilms = films.filter(f => {
      const tagNames = f.tag.map(t => t.name)
      return tagNames.includes('TOP')
    })
    return (
      <div>
        <LargeTiles
          topFilms={topFilms}
          signedInUser={signedInUser}
          addTopFilm={this.addFilm}
          editMode={editMode}
          deleteFilm={this.deleteFilm}
          openModal={openModal}
        />
        <SmallTiles
          films={films}
          signedInUser={signedInUser}
          addFilm={this.addFilm}
          editMode={editMode}
          deleteFilm={this.deleteFilm}
          openModal={openModal}
        />
      </div>
    )
  }
}

export const FilmTabConnected = connect(state => ({
  signedInUser: state.signedInUser
}))(FilmTab)
