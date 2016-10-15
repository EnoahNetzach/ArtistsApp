import React, { PropTypes } from 'react'
import map from 'lodash/map'
import size from 'lodash/size'
import { List as MaterialList, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Item from './Item'

const List = ({ artists, distancesInKm, loadMoreArtists }) => (
  <MaterialList>
    {size(artists) === 0 ? (
      <ListItem disabled primaryText="No artist matches your search criteria." />
    ) : null}
    {map(artists, artist => (
      <div key={artist.uuid}>
        <Item artist={artist} distancesInKm={distancesInKm} />
        <Divider />
      </div>
    ))}
    {loadMoreArtists ? (
      <ListItem onClick={loadMoreArtists} primaryText="Load more artists." />
    ) : null}
  </MaterialList>
)

List.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string.isRequired,
  })),
  distancesInKm: PropTypes.bool,
  loadMoreArtists: PropTypes.func,
}

export default List
