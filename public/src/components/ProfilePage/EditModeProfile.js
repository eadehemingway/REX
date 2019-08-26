import React from 'react'
import { SendRexModal } from './SendRexModal'
import axios from 'axios'
import { connect } from 'react-redux'
import { RexTab } from './RexTab'
import { FilmTabConnected } from './FilmTab'

export class EditModeProfile extends React.Component {
  state = {
    tabOpen: 'films',
    rex: []
  }
  componentDidMount() {
    const { signedInUser } = this.props
    axios.get(`/api/user/${signedInUser}`).then(response => {
      const rex = response.data.doc.rex
      this.setState({ rex })
    })
  }

  deleteRexFromState = id => {
    const { rex } = this.state
    const newRex = [...rex].filter(r => r._id !== id)
    this.setState({ rex: newRex })
  }
  changeStatusInState = id => {
    const { rex } = this.state
    const newRex = rex.map(r => {
      if (r._id === id) {
        return {
          ...r,
          pending: !r.pending
        }
      } else {
        return r
      }
    })
    this.setState({ rex: newRex })
  }
  changeTab = tabOpen => this.setState({ tabOpen })

  render() {
    const {
      openModal,
      closeModal,
      filmToRecommend,
      favFilms,
      modalOpen
    } = this.props
    const { tabOpen } = this.state
    const onFilmTab = tabOpen === 'films'
    const onApprovedRexTab = tabOpen === 'approvedRex'
    const onNewRexTab = tabOpen === 'newRex'
    const { rex } = this.state

    return (
      <div>
        {modalOpen && (
          <SendRexModal
            openModal={openModal}
            closeModal={closeModal}
            film={filmToRecommend}
          />
        )}
        <button
          className={`tab-header ${onFilmTab ? 'selected-tab' : ''}`}
          onClick={() => this.changeTab('films')}
        >
          films
        </button>
        <button
          className={`tab-header ${onApprovedRexTab ? 'selected-tab' : ''}`}
          onClick={() => this.changeTab('approvedRex')}
        >
          approved rex
        </button>
        <button
          className={`tab-header ${onNewRexTab ? 'selected-tab' : ''}`}
          onClick={() => this.changeTab('newRex')}
        >
          {' '}
          new rex
        </button>

        {onFilmTab && favFilms.length > 0 && (
          <FilmTabConnected
            films={favFilms}
            editMode={true}
            openModal={this.openModal}
          />
        )}

        {onApprovedRexTab && (
          <RexTab
            rex={rex}
            inApprovedTab={true}
            changeStatusInState={this.changeStatusInState}
            deleteRex={this.deleteRexFromState}
          />
        )}
        {onNewRexTab && (
          <RexTab
            rex={rex}
            inApprovedTab={false}
            changeStatusInState={this.changeStatusInState}
            deleteRex={this.deleteRexFromState}
          />
        )}
      </div>
    )
  }
}

export const EditModeProfileConnected = connect(state => {
  return {
    signedInUser: state.signedInUser
  }
})(EditModeProfile)
