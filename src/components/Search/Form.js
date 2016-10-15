import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import MenuItem from 'material-ui/MenuItem'
import { Field } from 'redux-form/immutable'
import { SelectField, TextField, Toggle } from 'redux-form-material-ui'
import { sort } from '../../reducers/artists/selector'

const styles = {
  container: {
    alignItems: 'flex-end',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '0 20px 20px',
  },
  distanceUOM: {
    width: '100px',
  },
}

const Form = ({ distancesInKm }) => (
  <Paper zDepth={2}>
    <div style={styles.container}>
      <div>
        <div>
          <Field
            component={TextField}
            name="ageFrom"
            type="number"
            floatingLabelText="Age from"
          />
        </div>

        <div>
          <Field
            component={TextField}
            name="ageTo"
            type="number"
            floatingLabelText="Age to"
          />
        </div>
      </div>

      <div>
        <div>
          <Field
            component={TextField}
            name="rateFrom"
            type="number"
            floatingLabelText="Rating from"
          />
        </div>

        <div>
          <Field
            component={TextField}
            name="rateTo"
            type="number"
            floatingLabelText="Rating to"
          />
        </div>
      </div>

      <div>
        <Field
          name="gender"
          component={SelectField}
          floatingLabelFixed
          floatingLabelText="Gender"
        >
          <MenuItem value="M" primaryText="Male" />
          <MenuItem value="F" primaryText="Female" />
          <MenuItem value="" primaryText="Both" />
        </Field>
      </div>

      <div>
        <Field
          name="sort"
          component={SelectField}
          floatingLabelFixed
          floatingLabelText="Order by"
        >
          <MenuItem value={sort.AGE_ASC} primaryText="Age ASC" />
          <MenuItem value={sort.AGE_DESC} primaryText="Age DESC" />
          <MenuItem value={sort.RATE} primaryText="Rating" />
          <MenuItem value={sort.DISTANCE} primaryText="Distance" />
          <MenuItem value={sort.NONE} primaryText="None" />
        </Field>
      </div>

      <div style={styles.distanceUOM}>
        <Field name="distancesInKm" component={Toggle} label={distancesInKm ? 'Km' : 'Mi'} labelPosition="right" />
      </div>
    </div>
  </Paper>
)

Form.propTypes = {
  distancesInKm: PropTypes.bool,
}

export default Form
