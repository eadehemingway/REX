import React from 'react'
import { FilmDropDown } from '../FilmDropDown'
import { SketchPicker } from 'react-color'

export class AddFavFilm extends React.Component {
  state = {
    selectedFilm: null
  }

  selectFilm = filmInfo => {
    this.setState({ selectedFilm: filmInfo })
  }

  render() {
    const { selectedFilm } = this.state
    return (
      <div className="add-film-drop-down-container">
        <FilmDropDown
          selectFilm={this.selectFilm}
          selectedFilm={selectedFilm}
          deleteSelectedFilm={() => this.setState({ selectedFilm: null })}
        />
        <button
          className="button"
          onClick={() => this.props.addFilm(selectedFilm)}
        >
          submit
        </button>
      </div>
    )
  }
}
