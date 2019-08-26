import React from 'react'
import './style.css'
import { AddFavFilm } from './AddFavFilm'
import { FilmTile } from './FilmTile'
export class SmallTiles extends React.Component {
  state = {
    addFilmPanelOpen: false,
    showMoreMenu: false
  }
  toggleAddPanel = () => {
    this.setState(prevState => ({
      addFilmPanelOpen: !prevState.addFilmPanelOpen
    }))
  }

  toggleMoreMenu = () => {
    this.setState(prevState => ({ showMoreMenu: !prevState.showMoreMenu }))
  }
  addFilm = e => {
    this.setState({ addFilmPanelOpen: false })
    this.props.addFilm(e)
  }
  render() {
    const { films, editMode, deleteFilm, openModal } = this.props
    const { addFilmPanelOpen, showMoreMenu } = this.state
    return (
      <div className="small-tile-section">
        <h2>SMALL TILES</h2>
        {editMode && <button onClick={this.toggleAddPanel}> Add</button>}
        {addFilmPanelOpen && <AddFavFilm addFilm={this.addFilm} />}
        <div className="small-tile-container">
          {films.map((f, i) => (
            <FilmTile
              film={f}
              key={i}
              editMode={editMode}
              deleteFilm={deleteFilm}
              openModal={openModal}
              containerClass="cropped-to-square"
            />
          ))}
        </div>
      </div>
    )
  }
}
