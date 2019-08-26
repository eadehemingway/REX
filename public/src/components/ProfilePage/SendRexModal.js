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
          SEND RECOMMENDATION
          <div className="modal-content">
            <FilmDropDown
              selectFilm={this.selectFilm}
              selectedFilm={selectedFilm}
            />

            <input
              type="text"
              placeholder="rex handle"
              value={receiverHandle}
              onChange={event => this.handleChange(event, 'receiverHandle')}
            />
            <input
              type="text"
              placeholder="comment"
              value={comment}
              onChange={event => this.handleChange(event, 'comment')}
            />
            <button onClick={() => this.sendRex(selectedFilm, receiverHandle)}>
              send
            </button>
            <button onClick={this.props.closeModal}>close</button>
          </div>
        </div>
      </div>
    )
  }
}
