import React from 'react'
import axios from 'axios'
import { FilmDropDown } from './FilmDropDown'
import { Modal } from './Modal'

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
    const { addRexToState, signedInUser, closeModal } = this.props

    axios
      .patch('/api/rex', { filmInfo: selectedFilm, receiverHandle, comment })
      .then(response => console.log(response))

    if (receiverHandle === signedInUser) {
      const rexObj = { filmInfo: selectedFilm, comment, pending: true }
      addRexToState(rexObj)
    }

    closeModal()
  }
  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value })
  }
  selectFilm = filmInfo => {
    this.setState({ selectedFilm: filmInfo })
  }
  render() {
    const { selectedFilm, receiverHandle, comment } = this.state
    const { closeModal } = this.props

    return (
      <Modal closeModal={closeModal}>
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
          className="send-rex-input text-input"
        />
        <label htmlFor="comment-input" className="send-rex-label">
          Comment
        </label>
        <input
          type="text"
          id="comment-input"
          placeholder="comment"
          value={comment}
          className="send-rex-input text-input"
          onChange={event => this.handleChange(event, 'comment')}
        />
        <div className="modal-btn-container">
          <button
            className="modal-btn button"
            onClick={() => this.sendRex(selectedFilm, receiverHandle)}
          >
            send
          </button>
          <button className="modal-btn button" onClick={this.props.closeModal}>
            close
          </button>
        </div>
      </Modal>
    )
  }
}
