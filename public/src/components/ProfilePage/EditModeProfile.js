import React from 'react'
import { SendRexModal } from './SendRexModal'
import axios from 'axios'
import { connect } from 'react-redux'
import { RexTab } from './RexTab/RexTab'
import { FilmTabConnected } from './FilmTab/FilmTab'

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
  addRexToState = newRex => {
    const { rex } = this.state
    const newRexArr = [...rex, newRex]
    this.setState({ rex: newRexArr })
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
      openSendRexModal,
      closeModal,
      filmToRecommend,
      favFilms,
      modalOpen,
      signedInUser
    } = this.props

    const { tabOpen, rex } = this.state
    const onFilmTab = tabOpen === 'films'
    const onApprovedRexTab = tabOpen === 'approvedRex'
    const onNewRexTab = tabOpen === 'newRex'

    return (
      <div>
        {modalOpen && (
          <SendRexModal
            openSendRexModal={openSendRexModal}
            closeModal={closeModal}
            film={filmToRecommend}
            addRexToState={this.addRexToState}
            signedInUser={signedInUser}
          />
        )}
        <div className="tab-header-container">
          <button
            className={`interactive tab-header ${
              onFilmTab ? 'selected-tab' : ''
            }`}
            onClick={() => this.changeTab('films')}
          >
            films
          </button>
          <button
            className={`interactive tab-header ${
              onApprovedRexTab ? 'selected-tab' : ''
            }`}
            onClick={() => this.changeTab('approvedRex')}
          >
            approved rex
          </button>
          <button
            className={`interactive tab-header ${
              onNewRexTab ? 'selected-tab' : ''
            }`}
            onClick={() => this.changeTab('newRex')}
          >
            new rex
          </button>
        </div>
        <div className="tab-content-background">
          <div className="tab-content">
            {onFilmTab && (
              <FilmTabConnected
                films={favFilms}
                editMode={true}
                openSendRexModal={openSendRexModal}
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
        </div>
      </div>
    )
  }
}

export const EditModeProfileConnected = connect(state => {
  return {
    signedInUser: state.signedInUser
  }
})(EditModeProfile)
