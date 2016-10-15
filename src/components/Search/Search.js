import React, { PropTypes } from 'react'
import Form from './Form'
import List from './List'
import Details from './Details'

const Search = ({ artists, currentArtist, distancesInKm, loadMoreArtists }) => (
  <div>
    <Form distancesInKm={distancesInKm} />

    <List artists={artists} distancesInKm={distancesInKm} loadMoreArtists={loadMoreArtists} />

    {currentArtist ? (
      <Details artist={currentArtist} distancesInKm={distancesInKm} isOpen />
    ) : null}
  </div>
)

Search.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.shape({})),
  currentArtist: PropTypes.shape({}),
  distancesInKm: PropTypes.bool,
  loadMoreArtists: PropTypes.func,
}

export default Search
