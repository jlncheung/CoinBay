import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import './postingSingle.css'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class SinglePosting extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.root}>
        <Grid container spacing={24}>
  
          <Grid item xs={12} md={6}>
            <img id="postingPicture"src="https://i.kinja-img.com/gawker-media/image/upload/s--zIoxCmxH--/c_scale,f_auto,fl_progressive,q_80,w_800/e83aktlptf1pybjfkcex.jpg"></img>
          </Grid>
          <Grid item xs={12} md={6}>
              <div className="postingInfo">
                  <h1>Lambourghini Huracan Performante</h1>
                  <h2>$100,000</h2>
                  <p>The Huracán Performante has reworked the concept of super sports cars and taken the notion of performance to levels never seen before. The vehicle has been re-engineered in its entirety, as regards its weight, engine power, chassis and above all by introducing an innovative system of active aerodynamics: ALA. The use of the awarded Forged Composites®, a shapable forged carbon fiber material patented by Automobili Lamborghini, is a real nice touch and it contributes to make the vehicle even lighter in weight. Besides its extraordinary technological properties, it also conveys a new idea of beauty.</p>
                  <h3>Seller: Vinson Ly</h3>
                  <div className="sellerRating">
                    <h3>Rating</h3>
                    <i className="material-icons">
                      star_rate
                    </i>
                    <i className="material-icons">
                      star_rate
                    </i>
                    <i className="material-icons">
                      star_rate
                    </i>
                    <i className="material-icons">
                      star_rate
                    </i>
                    <i className="material-icons">
                      star_rate
                    </i>
                  </div>
                  <Button variant="contained" color="primary" className={this.props.button}>
                    Buy Now
                  </Button>
              </div>
          </Grid>
  
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SinglePosting);