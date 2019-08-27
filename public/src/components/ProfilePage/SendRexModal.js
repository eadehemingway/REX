import React from 'react'
import axios from 'axios'
import { FilmDropDown } from './FilmDropDown'

export class SendRexModal extends React.Component {
  state = {
    selectedFilm: null,
    receiverHandle: '',
    comment: ''
  }
  componentDidMount() {
    this.setState({ selectedFilm: this.props.film })
  }
  sendRex = () => {
    const { selectedFilm, receiverHandle, comment } = this.state
    axios
      .patch('/api/rex', { filmInfo: selectedFilm, receiverHandle, comment })
      .then(response => console.log(response))

    this.props.closeModal()
  }
  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value })
  }
  selectFilm = filmInfo => {
    this.setState({ selectedFilm: filmInfo })
  }
  handleClick = e => {
    if (this.modalWindow.contains(e.target)) return
    this.props.closeModal()
  }
  render() {
    const { selectedFilm, receiverHandle, comment } = this.state

    return (
      <div className="modal-overlay" onClick={this.handleClick}>
        <div
          className="modal-window"
          ref={modalWindow => (this.modalWindow = modalWindow)}
        >
          <div className="modal-content">
            <h2>Send Recommendation</h2>
            <FilmDropDown
              selectFilm={this.selectFilm}
              selectedFilm={selectedFilm}
            />
            <label htmlFor="rex-input" className="send-rex-label">
              Rex
            </label>
            <input
              type="text"
              id="rex-input"
              placeholder="rex handle"
              value={receiverHandle}
              onChange={event => this.handleChange(event, 'receiverHandle')}
              className="send-rex-input"
            />
            <label htmlFor="comment-input" className="send-rex-label">
              Comment
            </label>
            <input
              type="text"
              id="comment-input"
              placeholder="comment"
              value={comment}
              className="send-rex-input"
              onChange={event => this.handleChange(event, 'comment')}
            />
            <div className="modal-btn-container">
              <button
                className="send-rex-btn"
                onClick={() => this.sendRex(selectedFilm, receiverHandle)}
              >
                send
              </button>
              <button className="send-rex-btn" onClick={this.props.closeModal}>
                close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
