import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../utils/api';
import Loading from './Loading';

const SelectLanguage = props => {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="languages">
      {languages.map(lang => {
        return (
          <li
            style={lang === props.selectedLang ? { color: '#d0021b' } : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}
          >
            {lang}
          </li>
        );
      })}
    </ul>
  );
};

SelectLanguage.propTypes = {
  selectedLang: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

const RepoGrid = props =>
  <ul className="popular-list">
    {props.repos.map((repo, index) => {
      return (
        <li key={repo.name} className="popular-item">
          <div className="popular-rank">
            #{index + 1}
          </div>
          <ul className="space-list-items">
            <li>
              <img
                className="avatar"
                src={repo.owner.avatar_url}
                alt={'Avatar for ' + repo.owner.login}
              />
            </li>
            <li>
              <a href={repo.html_url}>
                {repo.name}
              </a>
            </li>
            <li>
              @{repo.owner.login}
            </li>
            <li>
              {repo.stargazers_count} stars
            </li>
          </ul>
        </li>
      );
    })}
  </ul>;

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

export class Popular extends Component {
  constructor() {
    super();
    this.state = {
      selectedLang: 'All',
      repos: null
    };

    this.updateLang = this.updateLang.bind(this);
  }

  componentDidMount() {
    this.updateLang(this.state.selectedLang);
  }

  updateLang(lang) {
    this.setState(() => {
      return {
        selectedLang: lang,
        repos: null
      };
    });

    api.fetchPopularRepos(lang).then(repos => {
      this.setState(() => {
        return {
          repos: repos
        };
      });
    });
  }

  render() {
    return (
      <div>
        <SelectLanguage selectedLang={this.state.selectedLang} onSelect={this.updateLang} />
        {!this.state.repos ? <Loading /> : <RepoGrid repos={this.state.repos} />}
      </div>
    );
  }
}
