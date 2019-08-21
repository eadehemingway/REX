import React from 'react'
import axios from 'axios'
import { AddFilmInput } from './AddFilmInput'

export class Modal extends React.Component {
  state = {
    film: null,
    receiverHandle: '',
    comment: ''
  }
  sendRex = () => {
    const { film, receiverHandle, comment } = this.state
    axios
      .patch('/api/rex', { film, receiverHandle, comment })
      .then(response => console.log(response))

    this.props.toggleModal()
  }
  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value })
  }
  updateSelectedFilm = filmInfo => {
    this.setState({ film: filmInfo })
  }

  render() {
    const { film, receiverHandle, comment } = this.state
    console.log('receiverHandle:', film)
    return (
      <div className="modal-overlay">
        <div className="modal-window">
          SEND RECOMMENDATION
          <div className="modal-content">
            <AddFilmInput updateSelectedFilm={this.updateSelectedFilm} />
            {film && (
              <div>
                <img
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
            <button onClick={this.props.toggleModal}>close</button>
          </div>
        </div>
      </div>
    )
  }
}
