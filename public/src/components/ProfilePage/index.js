import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal } from './Modal'
import { FavouriteFilms } from './FavouriteFilms'
import axios from 'axios';

class ProfilePage extends React.Component {
  state = {
    modalOpen: false,
    userObj:null
  }

componentWillMount(){
     axios
      .get(`/api/user/${this.props.userInfo}`)
      .then(res => {
        const userObj = {
          userName: this.props.userInfo,
        data: res.data.doc
        }
      this.setState({userObj})
      })
}

  toggleModal = () => {
    const { modalOpen } = this.state
    this.setState({ modalOpen: !modalOpen })
  }

  render() {
    const { modalOpen } = this.state

    return (
      <div className="page-content">

        {/* <h1> user page for {this.state.userObj.userName}</h1> */}
        <div className="link-container">
          <Link to="/recommendations"> RECOMMENDATIONS </Link>
        </div>

        <button type="button" onClick={this.toggleModal}>
          SEND REX
        </button>
        {modalOpen && <Modal toggleModal={this.toggleModal} />}
        { this.state.userObj && <FavouriteFilms films={this.state.userObj.data.films}/>
        }
      </div>
    )
  }
}

export const ProfilePageConnected = connect(state => ({
  userInfo: state.UserPage
}))(ProfilePage)
