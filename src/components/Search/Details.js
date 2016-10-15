import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import generateRoute from '../Router/generateRoute'
import getDistanceBetween from '../../utils/getDistanceBetween'

const londonCoords = {
  lat: 51.5126064,
  lon: -0.1802461,
}

const getDistance = (artist, inKm = true) => Math.round(getDistanceBetween(londonCoords, {
  lat: Number(artist.latitude),
  lon: Number(artist.longitude),
}) * (inKm ? 1 : 0.621371) / 1000) // eslint-disable-line no-mixed-operators

const styles = {
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  map: {
    height: '250px',
    width: '250px',
  },
}

const onClose = (event) => {
  event.preventDefault()
  browserHistory.push(generateRoute())
}

const Item = ({ artist, distancesInKm, isOpen = false }) => (
  <Dialog
    title={`Artist #${artist.uuid}`}
    actions={(
      <FlatButton
        label="Dismiss"
        primary
        keyboardFocused
        onTouchTap={onClose}
      />
    )}
    modal={false}
    open={isOpen}
    autoScrollBodyContent
  >
    <div style={styles.content}>
      <div>
        <p>Age: {artist.age}</p>
        <p>Rating: {artist.rate}</p>
        <p>Gender: {artist.gender}</p>
        <p>Distance: {getDistance(artist, distancesInKm)} {distancesInKm ? 'Km' : 'Mi'}</p>
      </div>

      <GoogleMapLoader
        containerElement={
          <div style={styles.map} />
        }
        googleMapElement={
          <GoogleMap
            defaultZoom={9}
            defaultCenter={{ lat: Number(artist.latitude), lng: Number(artist.longitude) }}
          >
            <Marker
              position={{ lat: Number(artist.latitude), lng: Number(artist.longitude) }}
            />
          </GoogleMap>
        }
      />
    </div>
  </Dialog>
)

Item.propTypes = {
  artist: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    gender: PropTypes.oneOf(['M', 'F']).isRequired,
    age: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
  }),
  distancesInKm: PropTypes.bool,
  isOpen: PropTypes.bool,
}

export default Item
