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

  addFilm = (newFilm, tag = {}) => {
    const newFilmWithTag = { ...newFilm, tag: [tag] }
    const newFilmArr = [...this.state.films, newFilmWithTag]
    this.setState({ films: newFilmArr })

    axios
      .patch('/api/film', {
        handle: this.props.signedInUser,
        filmInfo: newFilmWithTag
      })
      .catch(e => console.log('ERROR ADDING FILM', e))
  }

  render() {
    const { deleteFilm, editMode, signedInUser } = this.props
    const { films } = this.state
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
        />
        <SmallTiles films={films} signedInUser={signedInUser} />
      </div>
    )
  }
}

export const FilmTabConnected = connect(state => ({
  signedInUser: state.signedInUser
}))(FilmTab)
