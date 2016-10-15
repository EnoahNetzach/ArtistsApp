import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm, formValueSelector } from 'redux-form/immutable'
import { chunkSize, loadMore } from '../../actions/lists'
import artistsSelector, { sort } from '../../reducers/artists/selector'
import listSelector from '../../reducers/lists/selector'
import Search from './Search'

const formName = 'searchForm'
const artistListId = 'artists'

const mapStateToProps = (state, props) => ({
  artists: artistsSelector(state, {
    filters: {
      ageFrom: formValueSelector(formName)(state, 'ageFrom'),
      ageTo: formValueSelector(formName)(state, 'ageTo'),
      rateFrom: formValueSelector(formName)(state, 'rateFrom'),
      rateTo: formValueSelector(formName)(state, 'rateTo'),
      gender: formValueSelector(formName)(state, 'gender'),
    },
    sort: formValueSelector(formName)(state, 'sort'),
  }),
  currentArtist: props.currentArtistUuid && artistsSelector(state, {
    filters: { uuid: props.currentArtistUuid },
  }),
  artistListSize: listSelector(state, { id: artistListId }),
  distancesInKm: formValueSelector(formName)(state, 'distancesInKm'),
})

const mapDispatchToProps = dispatch => ({
  dispatch,
})

const mergeProps = ({ artists, artistListSize = chunkSize, ...stateProps }, { dispatch, ...dispatchProps }, props) => ({
  ...stateProps,
  ...dispatchProps,
  ...props,
  artists: artists.slice(0, artistListSize),
  loadMoreArtists: artists.length >= artistListSize ? () => dispatch(loadMore(artistListId)) : undefined,
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
  reduxForm({
    form: formName,
    initialValues: {
      sort: sort.RATE_DESC,
      distancesInKm: true,
    },
  }),
)(Search)
