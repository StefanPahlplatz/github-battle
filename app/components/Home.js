import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export const Home = () =>
  <div className="home-container">
    <h1>Github Battle: Battle your friends</h1>
    <Link className="button" to="/battle">
      Battle
    </Link>
  </div>;
