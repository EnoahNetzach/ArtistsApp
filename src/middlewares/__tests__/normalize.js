import normalize, { NORMALIZE_ENTITIES } from '../normalize'
import Schema from '../../schema'

jest.mock('../../schema', () => {
  // eslint-disable-next-line global-require
  const normalizr = require('normalizr')

  const mockedActions = {
    USERS_NORMALIZED: 'USERS_NORMALIZED',
    PRODUCTS_NORMALIZED: 'PRODUCTS_NORMALIZED',
  }

  const userSchema = new normalizr.Schema('artists', {
    idAttribute: 'id',
    meta: { actionType: mockedActions.USERS_NORMALIZED },
  })

  const productSchema = new normalizr.Schema('products', {
    idAttribute: 'id',
    meta: { actionType: mockedActions.PRODUCTS_NORMALIZED },
  })

  userSchema.define({
    products: normalizr.arrayOf(productSchema),
  })

  const exportObj = {
    USER: userSchema,
    USERS: normalizr.arrayOf(userSchema),
    PRODUCT: productSchema,
    PRODUCTS: normalizr.arrayOf(productSchema),
  }
  exportObj.mockedActions = mockedActions

  return exportObj
})

describe('normalize middleware', () => {
  it('is a proper middleware', () => {
    expect(typeof normalize).toBe('function')
    expect(normalize.length).toBe(1)
    expect(typeof normalize({})).toBe('function')
    expect(normalize({}).length).toBe(1)
    expect(typeof normalize({})(() => {})).toBe('function')
    expect(normalize({})(() => {}).length).toBe(1)
  })

  it('passes on unrecognized actions', () => {
    const func = { next: a => a }

    spyOn(func, 'next').and.callThrough()

    const mockAction = { type: 'MOCK_ACTION' }
    const action = normalize({})(func.next)(mockAction)

    expect(func.next.calls.count()).toEqual(1)
    expect(action).toEqual(mockAction)
  })

  it('throws if no data is provided', () => {
    const doNormalize = () => normalize({})(() => {})({
      [NORMALIZE_ENTITIES]: {},
    })

    expect(doNormalize).toThrowError('No data to normalize.')
  })

  it('throws if no meta data are defined', () => {
    const doNormalize = () => normalize({})(() => {})({
      [NORMALIZE_ENTITIES]: {
        type: 'MOCK_ACTION',
        payload: {},
      },
    })

    expect(doNormalize).toThrowError('No meta data attached to the action.')
  })

  it('throws if no schema is defined', () => {
    const doNormalize = () => normalize({})(() => {})({
      [NORMALIZE_ENTITIES]: {
        payload: {},
        meta: {},
      },
    })

    expect(doNormalize).toThrowError('Specify a valid SCHEMA.')
  })

  it('normalizes entities and calls the proper actions', () => {
    const users = [{
      id: 1,
      email: 'my@email.com',
      products: [{
        id: 42,
        item: 'box',
      }],
    }]

    const store = { dispatch: () => {} }
    spyOn(store, 'dispatch')

    normalize(store)(() => {})({
      [NORMALIZE_ENTITIES]: {
        payload: users,
        meta: Schema.USERS,
      },
    })

    expect(store.dispatch).toHaveBeenCalledWith({
      type: Schema.mockedActions.USERS_NORMALIZED,
      payload: {
        1: {
          id: 1,
          email: 'my@email.com',
          products: [42],
        },
      },
    })

    expect(store.dispatch).toHaveBeenCalledWith({
      type: Schema.mockedActions.PRODUCTS_NORMALIZED,
      payload: {
        42: {
          id: 42,
          item: 'box',
        },
      },
    })
  })
})
