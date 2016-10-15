import { createSelector } from 'reselect'
import getDistanceBetween from '../../utils/getDistanceBetween'

export const sort = {
  AGE_ASC: 'AGE_ASC',
  AGE_DESC: 'AGE_DESC',
  RATE: 'RATE',
  DISTANCE: 'DISTANCE',
  NONE: 'NONE',
}

const londonCoords = {
  lat: 51.5126064,
  lon: -0.1802461,
}

export default createSelector(
  (state, data = {}) => (data.filters && {
    artistId: data.filters.uuid && String(data.filters.uuid),
    ageFrom: data.filters.ageFrom && Number(data.filters.ageFrom),
    ageTo: data.filters.ageTo && Number(data.filters.ageTo),
    rateFrom: data.filters.rateFrom && Number(data.filters.rateFrom),
    rateTo: data.filters.rateTo && Number(data.filters.rateTo),
    gender: data.filters.gender,
  }),
  (state, data = {}) => data.sort || sort.RATE_ASC,
  state => state.get('entities').get('artists'),
  ({ artistId, ageFrom, ageTo, rateFrom, rateTo, gender }, sorting, artists) => {
    if (artistId) {
      return artists.get(artistId)
    }

    return artists
      .filter(artist => (ageFrom ? artist.age >= ageFrom : true))
      .filter(artist => (ageTo ? artist.age <= ageTo : true))
      .filter(artist => (rateFrom ? artist.rate >= rateFrom : true))
      .filter(artist => (rateTo ? artist.rate <= rateTo : true))
      .filter(artist => (gender ? artist.gender === gender : true))
      .sort((a1, a2) => {
        switch (sorting) {
          case sort.AGE_ASC: return a1.age - a2.age
          case sort.AGE_DESC: return a2.age - a1.age
          case sort.RATE: return a2.rate - a1.rate
          case sort.DISTANCE: {
            const d1 = getDistanceBetween(londonCoords, {
              lat: Number(a1.latitude),
              lon: Number(a1.longitude),
            })
            const d2 = getDistanceBetween(londonCoords, {
              lat: Number(a2.latitude),
              lon: Number(a2.longitude),
            })

            return d1 - d2
          }
          case sort.RATE_NONE:
          default: {
            if (ageFrom && ageTo) {
              // eslint-disable-next-line no-mixed-operators
              const meanAge = ageFrom + (ageTo - ageFrom) / 2
              const d1 = Math.abs(a1.age - meanAge)
              const d2 = Math.abs(a2.age - meanAge)

              return d1 - d2
            }
            return 0
          }
        }
      })
      .toArray()
  },
)
