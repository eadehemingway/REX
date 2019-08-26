import React from 'react'
import axios from 'axios'
import { FilmDropDown } from './FilmDropDown'
import { SketchPicker } from 'react-color'

export class AddFavFilm extends React.Component {
  state = {
    tagName: '',
    tagColour: 'white',
    displayColorPicker: false,
    selectedFilm: null
  }

  handleTagName = e => {
    this.setState({ tagName: e.target.value })
  }
  handleTagColour = e => {
    this.setState({ tagColour: e.hex, displayColorPicker: false })
  }
  selectFilm = filmInfo => {
    this.setState({ selectedFilm: filmInfo })
  }

  addFilm = filmInfo => {
    const { tagName, tagColour } = this.state

    this.props.addFilm(filmInfo, {
      name: tagName,
      colour: tagColour
    })

    this.setState({
      tagName: '',
      tagColour: 'white',
      displayColorPicker: false,
      selectedFilm: null
    })
  }
  render() {
    const { tagColour, displayColorPicker, selectedFilm } = this.state

    return (
      <div className="add-film-drop-down">
        <input placeholder="tag name" onChange={this.handleTagName}></input>
        <p
          style={{ background: tagColour, width: 70 }}
          onClick={() =>
            this.setState({ displayColorPicker: !displayColorPicker })
          }
        >
          {tagColour}
        </p>
        {displayColorPicker && (
          <SketchPicker
            color={this.state.tagColour}
            onChangeComplete={this.handleTagColour}
          />
        )}
        <FilmDropDown
          selectFilm={this.selectFilm}
          selectedFilm={selectedFilm}
        />

        <button onClick={() => this.addFilm(selectedFilm)}>submit</button>
      </div>
    )
  }
}
