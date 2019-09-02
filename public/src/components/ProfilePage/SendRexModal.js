import React from 'react'
import axios from 'axios'
import { FilmDropDown } from './FilmDropDown'
import { Modal } from './Modal'
import { UserDropDown } from './UserDropDown'

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

  handleChange = (name, value) => {
    this.setState({ [name]: value })
  }

  render() {
    const { selectedFilm, receiverHandle, comment } = this.state
    const { closeModal } = this.props

    return (
      <Modal closeModal={closeModal}>
        <h2>Send Recommendation</h2>
        <FilmDropDown
          selectFilm={val => this.handleChange('selectedFilm', val)}
          selectedFilm={selectedFilm}
          deleteSelectedFilm={() => this.handleChange('selectedFilm', null)}
        />
        <label htmlFor="rex-input" className="form-label">
          User
        </label>
        <UserDropDown
          selectUser={val => this.handleChange('receiverHandle', val)}
          selectedUser={receiverHandle}
          updateUser={val => this.handleChange('receiverHandle', val)}
          containerClass="send-rex-user-dropdown-container"
          inputClass="form-input"
        />
        <label htmlFor="comment-input" className="form-label">
          Comment
        </label>
        <input
          type="text"
          id="comment-input"
          placeholder="comment"
          value={comment}
          className="form-input"
          onChange={event => this.handleChange('comment', event.target.value)}
        />
        <div className="send-rex-btn-container">
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
