import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  Grid,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  posterContainer: {
    width: '30%',
    minWidth: 400,
  },
  infoContainer: {
    width: '70%',
    width: 'calc(100% - 400px)'
  },
  poster: {
    height: '100%',
    maxHeight: 600,
    width: '100%',
    maxWidth: 400,
  },
};

function MovieDialog(props) {
  const { classes, info, videos } = props;
  const videoElements = [];
  videos.forEach((elem) => {
    videoElements.push(
      <iframe
        key={elem.id.videoId}
        id="ytplayer"
        type="text/html"
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${elem.id.videoId}`}
        frameBorder="0"
      />
    );
  });
  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.onClose}
      scroll="paper"
    >
      <DialogContent>
      <Grid container spacing={24}>
        <Grid item className={classes.posterContainer}>
          <img src={info.Poster} alt={info.Title} className={classes.poster} />
        </Grid>
        <Grid item className={classes.infoContainer}>
          <Typography>{`Title: ${info.Title}`}</Typography>
          <Typography>{`Year: ${info.Year}`}</Typography>
          <Typography>{`Released: ${info.Released}`}</Typography>
          <Typography>{`Genre: ${info.Genre}`}</Typography>
          <Typography>{`Language: ${info.Language}`}</Typography>
          <Typography>{`Runtime: ${info.Runtime}`}</Typography>
          <Typography>{`Plot: ${info.Plot}`}</Typography>
          <Typography>{`IMDb Rating: ${info.imdbRating}`}</Typography>
          <Typography>{`IMDb Votes: ${info.imdbVotes}`}</Typography>
          <Typography>{`Metascore: ${info.Metascore}`}</Typography>
          <Typography>{`Rated: ${info.Rated}`}</Typography>
          <Typography>{`Country: ${info.Country}`}</Typography>
          <Typography>{`Writer: ${info.Writer}`}</Typography>
          <Typography>{`Director: ${info.Director}`}</Typography>
          <Typography>{`Production: ${info.Production}`}</Typography>
          <Typography>{`Cast: ${info.Actors}`}</Typography>
          <Typography>{`Website: ${info.Website}`}</Typography>
          <Typography>{`BoxOffice: ${info.BoxOffice}`}</Typography>
          <Typography>{`DVD: ${info.DVD}`}</Typography>
          <Typography>{`Awards: ${info.Awards}`}</Typography>
        </Grid>
      </Grid>
      <Typography>{`Videos related to ${info.Title}`}</Typography>
      {videoElements}
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
};

export default withStyles(styles)(MovieDialog);
