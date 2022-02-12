import React, { Component } from 'react';
import './SearchBox.css';
import store from '../../store/store';

class SearchBox extends Component {
    state = {
        searchLine: '',
        listOfMovies: []
    }
    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
       
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        fetch(`http://www.omdbapi.com/?s=${this.state.searchLine}&apikey=cdc41011`)
            .then((data)=> data.json())
            .then((data)=> {
                store.dispatch({
                            type:'ADD_MOVIE_ON_PAGE' ,
                            payload: {
                                movies: data.Search
                            }
                        })
            })
    }
    render() {
        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={this.state.searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!this.state.searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}
 
export default SearchBox;