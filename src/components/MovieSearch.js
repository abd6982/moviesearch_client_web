import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  Icon,
  InputAdornment,
  TextField,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MovieDialog from './MovieDialog';
import InfoDialog from './InfoDialog';

const styles = {
  root: {
    textAlign: 'center',
  },
  container: {
    justifyContent: 'center',
  },
  header: {
    backgroundImage: 'linear-gradient(to top, #00ffff, #00d6ff, #00a9ff, #0077f7, #4537c6)',
    paddingTop: 100,
    marginBottom: 50,
  },
  headerTitle: {
    marginBottom: 50,
    color: '#fff'
  },
  input: {
    width: '50%',
    marginBottom: 100,
  },
  movieCard: {
    height: 'auto',
    width: 200,
    cursor: 'pointer',
    boxShadow: '0px 1px 34px -1px rgba(0,0,0,0.75)',
    transition: 'transform .1s',
    '&:hover': {
      boxShadow: '0 0 11px rgba(33,33,33,.2)',
      transform: 'scale(1.05)',
    },
  },
  poster: {
    height: 300,
    width: 200,
  },
};

class MovieSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      results: [],
      movieInfo: {},
      videos: [],
      showMovieInfo: false,
      isLoading: false,
      showInfoDialog: false,
      infoVariant: 'info',
      infoMessage: '',
    };
  }

  handleInputSearchQuery = e => {
    this.setState({ searchQuery: e.target.value });
  }

  getResults = (e) => {
    if (!e.keyCode || e.keyCode === 13) {
      this.setState({ results: [] });
      const postData = {
        query: this.state.searchQuery,
      };
      axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/movie/search`, postData)
      .then(res => {
        if (res.status === 200 && res.data.result === 'ok') {
          this.setState({
            results: res.data.data,
          });
        } else if (res.status === 200 && res.data.result !== 'ok') {
          this.showInfoDialog('info', res.data.result);
        } else {
          console.log('error occurred, res: ', res);
          this.showInfoDialog('error', 'Unexpected Error');
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          console.log('error occurred, res: ', err);
          this.showInfoDialog('error', 'Unexpected Error');
        } else if (err.response && err.response.status === 500) {
          console.log('error occurred, res: ', err);
          this.showInfoDialog('error', 'Server Error');
        } else {
          console.log('error occurred, res: ', err);
          this.showInfoDialog('error', 'Unexpected Error');
        }
      });
    }
    else return;
  }

  getMovieInfo = (id, title, year) => {
    this.setState({ showMovieInfo: true, isLoading: true });
    const postData = {
      id,
      title,
      year,
    };
    axios.post(`${process.env.REACT_APP_SERVER_HOST}/api/movie/get`, postData)
    .then(res => {
      if (res.status === 200 && res.data.result === 'ok') {
        this.setState({
          movieInfo: res.data.data.info,
          videos: res.data.data.videos.items,
          isLoading: false,
        });
      } else if (res.status === 200 && res.data.result !== 'ok') {
        this.showInfoDialog('info', res.data.result);
      } else {
        console.log('error occurred, res: ', res);
        this.showInfoDialog('error', 'Unexpected Error');
      }
    })
    .catch(err => {
      if (err.response && err.response.status === 400) {
        console.log('error occurred, res: ', err);
        this.showInfoDialog('error', 'Unexpected Error');
      } else if (err.response && err.response.status === 500) {
        console.log('error occurred, res: ', err);
        this.showInfoDialog('error', 'Server Error');
      } else {
        console.log('error occurred, res: ', err);
        this.showInfoDialog('error', 'Unexpected Error');
      }
    });
  }

  closeDialog = () => {
    this.setState({ showMovieInfo: false });
  }

  showInfoDialog = (variant, message) => {
    this.setState({
      showInfoDialog: true,
      infoVariant: variant,
      infoMessage: message,
    });
  }

  closeInfoDialog = () => {
    this.setState({
      showInfoDialog: false,
    });
  }

  render() {
    const { classes } = this.props;

    const movieCards = [];
    this.state.results.forEach((elem) => {
      movieCards.push(
        <Grid item key={elem.imdbID}>
          <div className={classes.movieCard} onClick={() => this.getMovieInfo(elem.imdbID, elem.Title, elem.Year)}>
            <img src={elem.Poster} alt={elem.Title} className={classes.poster} />
            <Typography><b>{elem.Title}</b></Typography>
            <Typography><b>{`Year: ${elem.Year}`}</b></Typography>
          </div>
        </Grid>
      );
    });
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h2" className={classes.headerTitle}>MovieSearch</Typography>
          <TextField
            autoFocus
            fullWidth
            name="search"
            onChange={this.handleInputSearchQuery}
            onKeyDown={this.getResults}
            placeholder="Enter the name of a movie"
            value={this.state.searchQuery}
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start"><Icon color="action">search</Icon></InputAdornment>,
              endAdornment: <InputAdornment position="end"><Button size="small" onClick={this.getResults}>Search</Button></InputAdornment>
            }}
            className={classes.input}
          />
        </div>
        <Grid container spacing={24} className={classes.container}>{movieCards}</Grid>
        <MovieDialog
          open={this.state.showMovieInfo}
          onClose={this.closeDialog}
          info={this.state.movieInfo}
          videos={this.state.videos}
          isLoading={this.state.isLoading}
        />
        <InfoDialog
          open={this.state.showInfoDialog}
          onClose={this.closeInfoDialog}
          variant={this.state.infoVariant}
          message={this.state.infoMessage}
        />
      </div>
    );
  }
}

MovieSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MovieSearch);
