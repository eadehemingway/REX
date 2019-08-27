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
  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOut, false)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOut, false)
  }

  handleClickOut = e => {
    if (this.tagDropDown && this.tagDropDown.contains(e.target)) return
    if (this.colorPicker && this.colorPicker.contains(e.target)) return
    this.setState({ displayColorPicker: false, showTagDropDown: false })
  }

  handleTagName = e => {
    this.setState({ tagName: e.target.value })
  }
  handleTagColour = e => {
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
        <label htmlFor="tag" className="add-tag-label">
          Tag
        </label>
        <div className="tag-input-container">
          <input
            id="tag"
            className="text-input tag-input"
            placeholder="tag name"
            value={tagName ? tagName : ''}
            onClick={() => this.setState({ showTagDropDown: true })}
            onChange={this.handleTagName}
          ></input>
          {showTagDropDown && (
            <div
              className="tag-dropdown"
              ref={tagDropDown => (this.tagDropDown = tagDropDown)}
            >
              {tags.map((t, i) => (
                <button
                  className="interactive tag-dropdown-btn"
                  key={i}
                  onClick={() => this.useExistingTag(t)}
                >
                  <div
                    className="tag-dropdown-color"
                    style={{ background: t.colour }}
                  >
                    {t.name}
                  </div>
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
              <div ref={colorPicker => (this.colorPicker = colorPicker)}>
                <SketchPicker
                  color={this.state.tagColour}
                  onChangeComplete={this.handleTagColour}
                  className="interactive color-picker"
                />
              </div>
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
