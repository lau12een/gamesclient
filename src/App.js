import React, { Component } from 'react';
import './App.css';
import Games from './games/games';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      games: [],
      search: '',
      sort: '',
      error: null
    }
  }

  setSearch(search) {
    this.setState({
      search
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8000/games';
    const params = [];
    if(this.state.search) {
      params.push(`search=${this.state.search}`);
    }
    if(this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          games: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get games at this time.'
        });
      })

  }

  render() {
    const games = this.state.games.map((games, i) => {
      return <Games {...games} key={i}/>
    })
    return (
      <main className="App">
        <h1>Google Play</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="search">Search: </label>
            <input 
              type="text" 
              id="search" 
              name="search" 
              value={this.state.search}
              onChange={e => this.setSearch(e.target.value)}/>

            <label htmlFor="sort">Sort: </label>
            <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="title">Rating</option>
              <option value="rank">App</option>
            </select>  
            <button type="submit">Search</button>  
          </form>
          <div className="App_error">{ this.state.error }</div>
        </div>
        {games}
      </main>
    );
  }
}

export default App;