import React from 'react'
import './style.css'
import { AddFavFilm } from './AddFavFilm'
import { FilmTile } from './FilmTile'
export class SmallTiles extends React.Component {
  state = {
    addFilmPanelOpen: false,
    showMoreMenu: false,
    tags: null,
    films: null
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.films !== prevState.films) {
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
    const { addFilmPanelOpen, showMoreMenu, tags, films } = this.state
    const filmsWithNoTag = (films || []).filter(f => {
      return f.tag.length === 0
    })
    return (
      <div className="small-tile-section">
        <h2>SMALL TILES</h2>

        {editMode && (
          <div className="open-add-film-dropdown-btn button">
            <p onClick={this.toggleAddPanel}>Add</p>
            {addFilmPanelOpen && <AddFavFilm addFilm={this.addFilm} />}
          </div>
        )}

        <div className="small-tile-container">
          {tags &&
            tags.map((t, i) => {
              const filmWithThisTag = films.filter(f => {
                const tagNames = f.tag.map(t => t.name)
                return tagNames.includes(t.name)
              })
              return (
                <div className="tag-group" key={i}>
                  <h3
                    style={{
                      background: t.colour,
                      border: '2px solid grey'
                    }}
                  >
                    {t.name}
                  </h3>
                  {filmWithThisTag.map((f, i) => {
                    return (
                      <div key={i}>
                        <FilmTile
                          film={f}
                          editMode={editMode}
                          deleteFilm={deleteFilm}
                          openModal={openModal}
                          containerClass="cropped-to-square"
                        />
                      </div>
                    )
                  })}
                </div>
              )
            })}
          {filmsWithNoTag.length > 0 && (
            <div className="tag-group">
              <h3
                style={{
                  background: 'lightgrey',
                  border: '2px solid grey'
                }}
              >
                No Tag
              </h3>
              {filmsWithNoTag.map((f, i) => (
                <div key={i}>
                  <FilmTile
                    film={f}
                    editMode={editMode}
                    deleteFilm={deleteFilm}
                    openModal={openModal}
                    containerClass="cropped-to-square"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}
