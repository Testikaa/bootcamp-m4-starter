import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        movies: [
            
        ]
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
        .then(data => data.json())
        .then(data => {
            this.setState({movies: data.movies});
        })
    }
    render() { 
        return (
            <div className="list-page">
                <h1 className="list-page__title">Мой список</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.id}/`} target="_blank">{item.title} ({item.year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
 
export default ListPage;