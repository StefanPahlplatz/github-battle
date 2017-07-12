import React, { Component } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import * as api from '../utils/api';
import PropTypes from 'prop-types';
import { PlayerPreview } from './PlayerPreview';
import Loading from './Loading';

const Profile = props => {
  const info = props.info;

  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className="space-list-items">
        {info.name &&
          <li>
            {info.name}
          </li>}
        {info.location &&
          <li>
            {info.location}
          </li>}
        {info.company &&
          <li>
            {info.company}
          </li>}
        <li>
          Followers: {info.followers}
        </li>
        <li>
          Following: {info.following}
        </li>
        <li>
          Public Repos: {info.public_repos}
        </li>
        {info.blog &&
          <li>
            <a href={info.blog}>
              {info.blog}
            </a>
          </li>}
      </ul>
    </PlayerPreview>
  );
};

Profile.propTypes = {
  info: PropTypes.object.isRequired
};

const Player = props =>
  <div>
    <h1 className="header">
      {props.label}
    </h1>
    <h3 style={{ textAlign: 'center' }}>
      Score: {props.score}
    </h3>
    <Profile info={props.profile} />
  </div>;

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
};

export class Results extends Component {
  constructor() {
    super();

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }

  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
    api.battle([players.playerOneName, players.playerTwoName]).then(results => {
      if (results === null) {
        this.setState(() => {
          return {
            error: 'There was an error. Make sure both users exist.',
            loading: false
          };
        });
      }

      this.setState(() => {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        };
      });
    });
  }

  render() {
    const { winner, loser, error, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset</Link>>
        </div>
      );
    }

    return (
      <div className="row">
        <Player label="Winner" score={winner.score} profile={winner.profile} />
        <Player label="Loser" score={loser.score} profile={loser.profile} />
      </div>
    );
  }
}
