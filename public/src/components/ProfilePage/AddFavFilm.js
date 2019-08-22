import React from 'react'
import axios from 'axios'
import { FilmDropDown } from './FilmDropDown'
import { SketchPicker } from 'react-color'

export class AddFavFilm extends React.Component {
  state = {
    tagName: '',
    tagColour: 'white',
    displayColorPicker: false
  }

  handleTagName = e => {
    this.setState({ tagName: e.target.value })
  }
  handleTagColour = e => {
    this.setState({ tagColour: e.hex, displayColorPicker: false })
  }

  render() {
    console.log(this.state.tagColour)
    const { tagName, tagColour, displayColorPicker } = this.state
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
          selectFilm={filmInfo =>
            this.props.selectFilm(filmInfo, {
              name: tagName,
              colour: tagColour
            })
          }
        />
      </div>
    )
  }
}
