import React from 'react'
import { LargeTiles } from './LargeTiles'
import { SmallTiles } from './SmallTiles'
import { connect } from 'react-redux'
import './style.css'

class FilmTab extends React.Component {
  render() {
    const { films, deleteFilm, editMode, signedInUser } = this.props
    const topFilms = films.filter(f => {
      const tagNames = f.tag.map(t => t.name)
      return tagNames.includes('TOP')
    })
    return (
      <div>
        <LargeTiles topFilms={topFilms} signedInUser={signedInUser} />
        <SmallTiles films={films} signedInUser={signedInUser} />
      </div>
    )
  }
}

export const FilmTabConnected = connect(state => ({
  signedInUser: state.signedInUser
}))(FilmTab)
