import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  dialog: {
  },
  container: {
    justifyContent: 'left',
  },
  posterContainer: {
    width: '30%',
    minWidth: 400,
  },
  infoContainer: {
    width: 'calc(100% - 400px)'
  },
  poster: {
    height: '100%',
    maxHeight: 500,
    width: '100%',
    maxWidth: 350,
  },
  loading: {
    position: 'fixed',
    width: '5%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  divider: {
    marginBottom: 20,
  },
  socialButton: {
    height: 20,
    width: 120,
    padding: 5,
    color: '#fff',
    textDecoration: 'none',
    fontSize: 12,
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    marginRight: 8,
    padding: '5px 10px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  socialLogo: {
    height: 10,
    width: 10,
  }
};

function MovieDialog(props) {
  const { classes, info, videos, isLoading, onClose } = props;
  const videoElements = [];
  videos.forEach((elem) => {
    videoElements.push(
      <Grid item key={elem.id.videoId}>
        <iframe
          id="ytplayer"
          title={elem.snippet.title}
          type="text/html"
          width="360"
          height="200"
          src={`https://www.youtube.com/embed/${elem.id.videoId}`}
          frameBorder="0"
        />
        <br />
        <a
          className={classes.socialButton}
          href={`https://www.facebook.com/sharer/sharer.php?u=https://www.youtube.com/watch?v=${elem.id.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: '#3B5998' }}
        >
          <img className={classes.socialLogo} src={require('./icons/facebook.svg')} alt="facebook" />
          Share
        </a>
        <a
          className={classes.socialButton}
          href={`https://twitter.com/home?status=https%3A//www.youtube.com/watch?v=${elem.id.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: '#55ACEE' }}
        >
          <img className={classes.socialLogo} src={require('./icons/twitter.svg')} alt="twitter" />
          Tweet
        </a>
        <a
          className={classes.socialButton}
          href={`https://plus.google.com/share?url=https%3A//www.youtube.com/watch?v=${elem.id.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: '#DC4E41' }}
        >
          <img className={classes.socialLogo} src={require('./icons/googleplus.svg')} alt="googleplus" />
          Share
        </a>
      </Grid>
    );
  });
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.onClose}
      scroll="paper"
      className={classes.dialog}
    >
      <DialogContent>
        <Button onClick={onClose} color="primary" variant="outlined" style={{ float: 'right' }}>Close</Button>
        <br />
        {isLoading ?
          <img src={require('../loading.gif')} alt="loading" className={classes.loading} />
          :
          <Fragment>
            <Typography variant="h5">Movie Info</Typography>
            <Divider className={classes.divider} />
            <Grid container spacing={24}>
              <Grid item className={classes.posterContainer}>
                <img src={info.Poster} alt={info.Title} className={classes.poster} />
              </Grid>
              <Grid item className={classes.infoContainer}>
                <Typography><b>Title:</b> {`${info.Title}`}</Typography>
                <Typography><b>Year:</b> {`${info.Year}`}</Typography>
                <Typography><b>Released:</b> {`${info.Released}`}</Typography>
                <Typography><b>Genre:</b> {`${info.Genre}`}</Typography>
                <Typography><b>Language:</b> {`${info.Language}`}</Typography>
                <Typography><b>Runtime:</b> {`${info.Runtime}`}</Typography>
                <Typography><b>Plot:</b> {`${info.Plot}`}</Typography>
                <Typography><b>IMDb Rating:</b> {`${info.imdbRating}`}</Typography>
                <Typography><b>IMDb Votes:</b> {`${info.imdbVotes}`}</Typography>
                <Typography><b>Metascore:</b> {`${info.Metascore}`}</Typography>
                <Typography><b>Rated:</b> {`${info.Rated}`}</Typography>
                <Typography><b>Writer:</b> {`${info.Writer}`}</Typography>
                <Typography><b>Director:</b> {`${info.Director}`}</Typography>
                <Typography><b>Production:</b> {`${info.Production}`}</Typography>
                <Typography><b>Cast:</b> {`${info.Actors}`}</Typography>
                <Typography><b>Website:</b> {`${info.Website}`}</Typography>
                <Typography><b>Awards:</b> {`${info.Awards}`}</Typography>
              </Grid>
            </Grid>
            <Typography variant="h6" style={{ marginTop: 50 }}>Videos related to <b>{info.Title}</b></Typography>
            <Divider className={classes.divider} />
            <Grid container spacing={24} className={classes.container}>{videoElements}</Grid>
          </Fragment>
        }
      </DialogContent>
    </Dialog>
  );
}

MovieDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
  videos: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default withStyles(styles)(MovieDialog);
