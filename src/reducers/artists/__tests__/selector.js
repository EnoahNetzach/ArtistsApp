import { fromJS } from 'immutable'
import Artist from '../definition'
import selector, { sort } from '../selector'

const londonCoords = {
  lat: 51.5126064,
  lon: -0.1802461,
}

const getStore = () => fromJS({
  entities: {
    artists: new Array(10).fill().reduce((artists, _, key) => ({
      ...artists,
      [key]: new Artist({
        uuid: String(key),
        gender: key % 2 === 0 ? 'M' : 'F',
        age: key < 5 ? key * 2 : (key - 4.5) * 2,
        rate: key < 5 ? (4.5 - key) * 2 : (key - 5) * 2,
        longitude: String(londonCoords.lat + ((key < 5 ? 50 - key : key - 50) / 10000)),
        latitude: String(londonCoords.lat + (key / 10000)),
      }),
    }), {}),
  },
})

const getArtists = () => getStore().get('entities').get('artists').toArray()

describe('artists selector', () => {
  it('returns the whole array by default', () => {
    expect(selector(getStore())).toEqual(getArtists())
  })

  it('returns a single artist if an uuid is given', () => {
    expect(selector(getStore(), { filters: { uuid: '5' } }))
      .toEqual(getStore().get('entities').get('artists').get('5'))
  })

  it('filters by age', () => {
    expect(selector(getStore(), { filters: {
      ageFrom: 3,
    } })).toEqual([
      ...getArtists().slice(2, 5),
      ...getArtists().slice(6, 10),
    ])

    expect(selector(getStore(), { filters: {
      ageTo: 5,
    } })).toEqual([
      ...getArtists().slice(0, 3),
      ...getArtists().slice(5, 8),
    ])
  })

  it('filters by rate', () => {
    expect(selector(getStore(), { filters: {
      rateFrom: 6,
      rateTo: 9,
    } })).toEqual([
      ...getArtists().slice(0, 2),
      ...getArtists().slice(8, 10),
    ])
  })

  it('filters by gender', () => {
    expect(selector(getStore(), { filters: {
      gender: 'F',
    } })).toEqual(getArtists().filter(artist => artist.gender === 'F'))
  })

  it('sorts by age ASC', () => {
    expect(selector(getStore(true), { sort: sort.AGE_ASC }))
      .toEqual([
        getArtists()[0],
        getArtists()[5],
        getArtists()[1],
        getArtists()[6],
        getArtists()[2],
        getArtists()[7],
        getArtists()[3],
        getArtists()[8],
        getArtists()[4],
        getArtists()[9],
      ])
  })

  it('sorts by age DESC', () => {
    expect(selector(getStore(true), { sort: sort.AGE_DESC }))
      .toEqual([
        getArtists()[9],
        getArtists()[4],
        getArtists()[8],
        getArtists()[3],
        getArtists()[7],
        getArtists()[2],
        getArtists()[6],
        getArtists()[1],
        getArtists()[5],
        getArtists()[0],
      ])
  })

  it('sorts by rate', () => {
    expect(selector(getStore(true), { sort: sort.RATE }))
      .toEqual([
        getArtists()[0],
        getArtists()[9],
        getArtists()[1],
        getArtists()[8],
        getArtists()[2],
        getArtists()[7],
        getArtists()[3],
        getArtists()[6],
        getArtists()[4],
        getArtists()[5],
      ])
  })

  it('sorts by distance', () => {
    expect(selector(getStore(true), { sort: sort.DISTANCE }))
      .toEqual([
        ...getArtists().slice(5, 10),
        ...getArtists().slice(0, 5).reverse(),
      ])
  })

  it('sorts by distance from the mean age if a range is provided, by default', () => {
    expect(selector(getStore(true), { filters: {
      ageFrom: 3,
      ageTo: 8,
    } }))
      .toEqual([
        getArtists()[3],
        getArtists()[7],
        getArtists()[2],
        getArtists()[8],
        getArtists()[4],
        getArtists()[6],
      ])
  })
})
