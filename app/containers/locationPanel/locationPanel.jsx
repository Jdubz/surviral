import {
  React,
  observer,
} from 'globalImports';

import { locationStore, timeStore } from '../../stores';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

@observer
class LocationPanel extends React.Component {
  render() {
    if (locationStore.location === null) { return null; }
    const { name, description } = locationStore.location;
    return (
      <Grid item xs={12}>
        <Paper className="homepage-paper">
          <Typography>{`Day: ${timeStore.day}`}</Typography>
          <Typography>{`Hour: ${timeStore.hour}`}</Typography>
          <Typography>{name}</Typography>
          <Typography>{description}</Typography>
        </Paper>
      </Grid>
    )
  }
}

export default LocationPanel;
