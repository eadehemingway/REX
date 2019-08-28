import React from 'react'
import './style.css'
import { AddFavFilm } from './AddFavFilm'
import { TagGroup } from './TagGroup'

export class SmallTiles extends React.Component {
  state = {
    addFilmPanelOpen: false,
    showMoreMenu: false,
    tags: null,
    films: null
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
  toggleAddPanel = () => {
    this.setState(prevState => ({
      addFilmPanelOpen: !prevState.addFilmPanelOpen
    }))
  }

  toggleMoreMenu = () => {
    this.setState(prevState => ({ showMoreMenu: !prevState.showMoreMenu }))
  }
  addFilm = e => {
    this.setState({ addFilmPanelOpen: false })
    this.props.addFilm(e)
  }
  render() {
    const { editMode, deleteFilm, openModal } = this.props
    const { addFilmPanelOpen, tags, films } = this.state
    const filmsWithNoTag = (films || []).filter(f => {
      return f.tag.length === 0
    })

    return (
      <div className="small-tile-section">
        <h2>SMALL TILES</h2>

        {editMode && (
          <div
            className="add-film-dropdown-btn"
            ref={addFilmPanel => (this.addFilmPanel = addFilmPanel)}
          >
            <button className="button" onClick={this.toggleAddPanel}>
              Add
            </button>
            {addFilmPanelOpen && (
              <AddFavFilm addFilm={this.addFilm} tags={tags} />
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
                  openModal={openModal}
                />
              )
            })}

          {filmsWithNoTag.length > 0 && (
            <TagGroup
              tag={null}
              filmsWithThisTag={filmsWithNoTag}
              editMode={editMode}
              deleteFilm={deleteFilm}
              openModal={openModal}
            />
          )}
        </div>
      </div>
    )
  }
}
