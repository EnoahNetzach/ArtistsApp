import React, { PropTypes } from 'react'
import Form from './Form'
import List from './List'

const Search = ({ artists, distancesInKm, loadMoreArtists }) => (
  <div>
    <Form distancesInKm={distancesInKm} />

    <List artists={artists} distancesInKm={distancesInKm} loadMoreArtists={loadMoreArtists} />
  </div>
)

Search.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.shape({})),
  distancesInKm: PropTypes.bool,
  loadMoreArtists: PropTypes.func,
}

export default Search
