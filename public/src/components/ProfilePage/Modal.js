import React from 'react'
import axios from 'axios'
import { AddFilmInput } from './AddFilmInput'

export class Modal extends React.Component {
  state = {
    film: {},
    receiverHandle: ''
  }
  sendRex = () => {
    const { film, receiverHandle } = this.state
    axios
      .patch('/api/rex', { film, receiverHandle })
      .then(response => console.log(response))
  }
  handleChange = event => {
    this.setState({ receiverHandle: event.target.value })
  }
  updateSelectedFilm = filmInfo => {
    this.setState({ film: filmInfo })
  }

  render() {
    const { film, receiverHandle } = this.state
    console.log('receiverHandle:', receiverHandle)
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
              onChange={event => this.handleChange(event)}
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
