import React from 'react'
import axios from 'axios'
import { FilmDropDown } from './FilmDropDown'
import { SketchPicker } from 'react-color'

export class AddFavFilm extends React.Component {
  state = {
    tagName: null,
    tagColour: 'white',
    displayColorPicker: false,
    selectedFilm: null,
    showTagDropDown: false
  }

  handleTagName = e => {
    this.setState({ tagName: e.target.value })
  }
  handleTagColour = e => {
    console.log('handleTagColour:')
    this.setState({ tagColour: e.hex })
  }
  selectFilm = filmInfo => {
    this.setState({ selectedFilm: filmInfo })
  }
  useExistingTag = tag => {
    this.setState({
      tagColour: tag.colour,
      tagName: tag.name,
      showTagDropDown: false
    })
  }
  addFilm = () => {
    const { tagName, tagColour, selectedFilm } = this.state
    const tag = tagName ? [{ name: tagName, colour: tagColour }] : []

    const filmInfo = {
      ...selectedFilm,
      tag
    }

    this.props.addFilm(filmInfo)
  }
  render() {
    const {
      tagColour,
      tagName,
      displayColorPicker,
      selectedFilm,
      showTagDropDown
    } = this.state
    const { tags } = this.props

    return (
      <div className="add-film-drop-down">
        <FilmDropDown
          selectFilm={this.selectFilm}
          selectedFilm={selectedFilm}
        />
        <div className="tag-input-container">
          <input
            className="text-input"
            placeholder="tag name"
            value={tagName ? tagName : ''}
            onClick={() => this.setState({ showTagDropDown: true })}
            onChange={this.handleTagName}
          ></input>
          {showTagDropDown && (
            <div className="tag-dropdown">
              {tags.map((t, i) => (
                <button
                  key={i}
                  style={{ background: t.colour }}
                  onClick={() => this.useExistingTag(t)}
                >
                  {t.name}
                </button>
              ))}
            </div>
          )}

          <div className="color-picker-container">
            <div
              className="interactive color-square"
              style={{ background: tagColour }}
              onClick={() =>
                this.setState({ displayColorPicker: !displayColorPicker })
              }
            ></div>
            {displayColorPicker && (
              <SketchPicker
                color={this.state.tagColour}
                onChangeComplete={this.handleTagColour}
                className="interactive color-picker"
              />
            )}
          </div>
        </div>

        <button className="button" onClick={this.addFilm}>
          submit
        </button>
      </div>
    )
  }
}
