import React from 'react'
import './style.css'
import { AddSmallFilmModal } from './AddSmallFilmModal'
import { TagGroup } from './TagGroup'
import Plus from './../../../assets/plus.svg'
import { AddTagModal } from './AddTagModal'

export class SmallTiles extends React.Component {
  state = {
    addFilmModalOpen: false,
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
    this.setState({ addFilmModalOpen: false })
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
  toggleAddFilmModal = tag => {
    this.setState(prevState => ({
      addFilmModalOpen: !prevState.addFilmModalOpen,
      tagToPopulateModal: tag
    }))
  }

  addFilm = selectedFilm => {
    const { addFilm } = this.props
    const { tagToPopulateModal } = this.state
    const filmInfo = {
      ...selectedFilm,
      tag: [
        { name: tagToPopulateModal.name, colour: tagToPopulateModal.colour }
      ]
    }
    addFilm(filmInfo)
    this.toggleAddFilmModal(null)
  }
  render() {
    const { editMode, deleteFilm, openSendRexModal } = this.props
    const { addFilmModalOpen, tags, films, addTagModalOpen } = this.state

    return (
      <div>
        {editMode && (
          <div
            className="add-film-dropdown-btn"
            ref={addFilmPanel => (this.addFilmPanel = addFilmPanel)}
          >
            {addFilmModalOpen && (
              <AddSmallFilmModal
                addFilm={this.addFilm}
                closeModal={() => this.setState({ addFilmModalOpen: false })}
              />
            )}
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
                  openAddFilmModal={this.toggleAddFilmModal}
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
