import React, { Component } from 'react';
import store from '../../store/store';
import './MovieItem.css';

class MovieItem extends Component {
    addToList(id, title, year){
        store.dispatch({
            type:'ADD_TO_LIST' ,
            payload: {
                id: id,
                title: title,
                year: year

            }
        })
    }
    render() {
        const { Title, Year, Poster,imdbID } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button onClick={()=> this.addToList(imdbID, Title, Year)} type="button" className="movie-item__add-button">Добавить в список</button>
                </div>
            </article>
        );
    }
}
 
export default MovieItem;