import { createSelector } from 'reselect'

export const sort = {
  AGE_ASC: 'AGE_ASC',
  AGE_DESC: 'AGE_DESC',
  RATE_ASC: 'RATE_ASC',
  RATE_DESC: 'RATE_DESC',
  RATE_NONE: 'RATE_NONE',
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
          case sort.RATE_ASC: return a1.rate - a2.rate
          case sort.RATE_DESC: return a2.rate - a1.rate
          case sort.RATE_NONE: default: return 0
        }
      })
      .toArray()
  },
)
