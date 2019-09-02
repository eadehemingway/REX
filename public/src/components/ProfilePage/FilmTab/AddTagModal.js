import React from 'react'
import { SketchPicker } from 'react-color'
import { Modal } from './../Modal'

export class AddTagModal extends React.Component {
  state = {
    tagName: null,
    tagColour: '#cd6b5c',
    displayColorPicker: false
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOut, false)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOut, false)
  }

  handleClickOut = e => {
    if (this.colorPicker && this.colorPicker.contains(e.target)) return
    this.setState({ displayColorPicker: false, showTagDropDown: false })
  }

  handleTagName = e => {
    this.setState({ tagName: e.target.value })
  }
  handleTagColour = e => {
    this.setState({ tagColour: e.hex })
  }

  addTag = () => {
    const { tagName, tagColour } = this.state
    const { addTag, closeModal } = this.props
    const newTag = { name: tagName, colour: tagColour }
    addTag(newTag)
    closeModal()
  }
  render() {
    const { tagColour, tagName, displayColorPicker } = this.state
    return (
      <Modal closeModal={this.props.closeModal}>
        <div>
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <div className="tag-input-container">
            <input
              id="tag"
              className="tag-input form-input"
              placeholder="tag name"
              value={tagName ? tagName : ''}
              onClick={() => this.setState({ showTagDropDown: true })}
              onChange={this.handleTagName}
            ></input>

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

          <button className="button" onClick={this.addTag}>
            submit
          </button>
        </div>
      </Modal>
    )
  }
}
