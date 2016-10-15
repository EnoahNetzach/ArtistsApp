import React, { PropTypes } from 'react'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import getDistanceBetween from '../../utils/getDistanceBetween'

const londonCoords = {
  lat: 51.5126064,
  lon: -0.1802461,
}

const getDistance = (artist, inKm = true) => Math.round(getDistanceBetween(londonCoords, {
  lat: Number(artist.latitude),
  lon: Number(artist.longitude),
}) * (inKm ? 1 : 0.621371) / 1000) // eslint-disable-line no-mixed-operators

const Item = ({ artist, distancesInKm }) => (
  <div>
    <ListItem
      primaryText={`Age: ${artist.age}, Rating: ${artist.rate}`}
      secondaryText={`Distance: ${getDistance(artist, distancesInKm)} ${distancesInKm ? 'Km' : 'Mi'}`}
      leftAvatar={<Avatar>{artist.gender}</Avatar>}
    />
  </div>
)

Item.propTypes = {
  artist: PropTypes.shape({
    gender: PropTypes.oneOf(['M', 'F']).isRequired,
    age: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
  }),
  distancesInKm: PropTypes.bool,
}

export default Item
