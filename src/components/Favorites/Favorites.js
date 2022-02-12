import React, { Component } from 'react';
import './Favorites.css';
import store from '../../store/store';
import { Link } from "react-router-dom";

class Favorites extends Component {
    state = {
        title: '',
        movies: [],
        id: ''
    }
    setTitle = (event) =>{
        this.setState({title: event.target.value});
    }
    componentDidMount(){
        store.subscribe(()=>{
            const current = store.getState();
            this.setState({movies: current.favorites})
        })
    }
    removeMovie(id){
        store.dispatch({
            type:'REMOVE_FROM_LIST' ,
            payload: {
                id: id
            }
        })
    }
    postAndGet = () =>{
        const info = {
             title: this.state.title,
              movies: this.state.movies
         };
        fetch('https://acb-api.algoritmika.org/api/movies/list',
        {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then(data => {
            this.setState({id: data.id});
    })
    }
    render() {
        return (
            <div className="favorites">
                <input value={this.state.title} placeholder="Введите название списка" className="favorites__name" onChange={this.setTitle} disabled={this.state.id}/>
                <ul className="favorites__list">
                    {this.state.movies && this.state.movies.map((item) => {
                       return(
                       <li key={item.imdbID}>
                           {item.title} ({item.year})
                            <button onClick={()=>{this.removeMovie(item.id)}}>X</button>
                       </li>)})
                    }
                </ul>
                {this.state.id? <Link to={`/list/${this.state.id}`}>Перейти к списку</Link> : <button type="button" className="favorites__save" disabled={!this.state.title || this.state.movies.length == 0} onClick={this.postAndGet}>Сохранить список</button>}
            </div>
        );
    }
}
 
export default Favorites;