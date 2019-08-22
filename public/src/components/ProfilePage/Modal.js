import React from 'react'
import axios from 'axios'
import { FilmDropDown } from './FilmDropDown'

export class Modal extends React.Component {
  state = {
    film: null,
    receiverHandle: '',
    comment: ''
  }
  componentDidMount() {
    this.setState({ film: this.props.film })
  }
  sendRex = () => {
    const { film, receiverHandle, comment } = this.state
    axios
      .patch('/api/rex', { film, receiverHandle, comment })
      .then(response => console.log(response))

    this.props.closeModal()
  }
  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value })
  }
  selectFilm = filmInfo => {
    this.setState({ film: filmInfo })
  }
  handleClick = e => {
    if (this.modalWindow.contains(e.target)) return
    this.props.closeModal()
  }
  render() {
    const { film, receiverHandle, comment } = this.state

    return (
      <div className="modal-overlay" onClick={this.handleClick}>
        <div
          className="modal-window"
          ref={modalWindow => (this.modalWindow = modalWindow)}
        >
          SEND RECOMMENDATION
          <div className="modal-content">
            <FilmDropDown selectFilm={this.selectFilm} />
            {film && (
              <div>
                <img
                  className="drop-down-image"
                  src={`https://image.tmdb.org/t/p/w185/${film.poster_path}`}
                />
                <li className="auto-complete-list">{film.title}</li>
              </div>
            )}
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
            <button onClick={() => this.sendRex(film, receiverHandle)}>
              send
            </button>
            <button onClick={this.props.closeModal}>close</button>
          </div>
        </div>
      </div>
    )
  }
}
