import React from 'react'
import './style.css'
import { AddFavFilm } from './AddFavFilm'
import { TagGroup } from './TagGroup'
import Plus from './../../../assets/plus.svg'
import { AddTagModal } from './AddTagModal'

export class SmallTiles extends React.Component {
  state = {
    addFilmPanelOpen: false,
    showMoreMenu: false,
    tags: null,
    films: null,
    addTagModalOpen: false
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOut, false)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOut, false)
  }

  handleClickOut = e => {
    if (this.addFilmPanel && this.addFilmPanel.contains(e.target)) {
      return
    }
    this.setState({ addFilmPanelOpen: false })
  }

  addTag = newTag => {
    const { tags } = this.state
    const newTags = [...tags, newTag]
    this.setState({ tags: newTags })
  }
  componentDidUpdate(prevProps) {
    if (prevProps.films !== this.props.films) {
      const { films } = this.props
      const tags = films.reduce((acc, el) => {
        const tagNames = acc.map(t => t.name)
        el.tag.forEach(t => {
          if (!tagNames.includes(t.name)) {
            acc.push(t)
          }
        })
        return acc
      }, [])

      this.setState({ tags, films })
    }
  }
  toggleAddPanel = tag => {
    this.setState(prevState => ({
      addFilmPanelOpen: !prevState.addFilmPanelOpen,
      tagToPopulateModal: tag
    }))
  }

  toggleMoreMenu = () => {
    this.setState(prevState => ({ showMoreMenu: !prevState.showMoreMenu }))
  }
  addFilm = selectedFilm => {
    this.setState({ addFilmPanelOpen: false })
    const { tagToPopulateModal } = this.state
    const tag = [
      { name: tagToPopulateModal.name, colour: tagToPopulateModal.colour }
    ]
    const filmInfo = {
      ...selectedFilm,
      tag
    }

    this.props.addFilm(filmInfo)
  }
  render() {
    const { editMode, deleteFilm, openSendRexModal } = this.props
    const { addFilmPanelOpen, tags, films, addTagModalOpen } = this.state

    return (
      <div className="small-tile-section">
        {editMode && (
          <div
            className="add-film-dropdown-btn"
            ref={addFilmPanel => (this.addFilmPanel = addFilmPanel)}
          >
            {addFilmPanelOpen && <AddFavFilm addFilm={this.addFilm} />}
          </div>
        )}

        <div className="small-tile-container">
          {tags &&
            tags.map((t, i) => {
              const filmsWithThisTag = films.filter(f => {
                const tagNames = f.tag.map(t => t.name)
                return tagNames.includes(t.name)
              })
              return (
                <TagGroup
                  key={i}
                  tag={t}
                  filmsWithThisTag={filmsWithThisTag}
                  editMode={editMode}
                  deleteFilm={deleteFilm}
                  openSendRexModal={openSendRexModal}
                  openAddFilmModal={this.toggleAddPanel}
                />
              )
            })}
        </div>
        <div className="add-tag-container">
          {editMode && (
            <button
              onClick={() => this.setState({ addTagModalOpen: true })}
              className="add-tag"
            >
              <img src={Plus} className="plus-icon" />
              <p>Add tag</p>
            </button>
          )}
          {addTagModalOpen && (
            <AddTagModal
              addTag={this.addTag}
              closeModal={() => this.setState({ addTagModalOpen: false })}
            />
          )}
        </div>
      </div>
    )
  }
}
