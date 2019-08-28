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
  handleChange = (value, name) => {
    this.setState({ [name]: value })
  }
  selectFilm = filmInfo => {
    this.setState({ selectedFilm: filmInfo })
  }
  selectUser = user => {
    this.setState({ receiverHandle: user })
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
          deleteSelectedFilm={() => this.setState({ selectedFilm: null })}
        />
        <label htmlFor="rex-input" className="form-label">
          Rex
        </label>
        <UserDropDown
          selectUser={val => this.selectUser(val)}
          selectedUser={receiverHandle}
          updateUser={val => this.handleChange(val, 'receiverHandle')}
        />
        <label htmlFor="comment-input" className="form-label">
          Comment
        </label>
        <input
          type="text"
          id="comment-input"
          placeholder="comment"
          value={comment}
          className="form-inputtext-input"
          onChange={event => this.handleChange(event.target.value, 'comment')}
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
