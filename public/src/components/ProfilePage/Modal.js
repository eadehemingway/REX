import React from 'react'

export class Modal extends React.Component {
  handleClick = e => {
    if (this.modalWindow.contains(e.target)) return
    this.props.closeModal()
  }
  render() {
    const { children } = this.props

    return (
      <div className="modal-overlay" onClick={this.handleClick}>
        <div
          className="modal-window"
          ref={modalWindow => (this.modalWindow = modalWindow)}
        >
          <div className="modal-content">{children}</div>
        </div>
      </div>
    )
  }
}
