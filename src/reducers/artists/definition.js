// @flow
import { Record } from 'immutable'

export default new Record({
  uuid: (undefined: string),
  gender: (undefined: 'M' | 'F'),
  age: (NaN: number),
  rate: (NaN: number),
  longitude: ('': string),
  latitude: ('': string),
})
