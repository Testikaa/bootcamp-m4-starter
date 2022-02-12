const initialState = {
    favorites: [],
    movies: []
}
function reducer(store = initialState, action){
    switch(action.type){
        case('ADD_TO_LIST'):
            let newList = [...store.favorites];
            let foundedMovie = newList.find(item => item.id === action.payload.id);
            if(foundedMovie){
            return{
                ...store,
                 favorites: newList
            }}
            if(!foundedMovie){
                newList.push(action.payload);
                return{
                    ...store,
                     favorites: newList
                }
            }
        case('ADD_MOVIE_ON_PAGE'):
            let listOfMovies = [...store.movies];
            action.payload.movies.map((item)=>{
                listOfMovies.push(item);
            })
            return{
                ...store,
                movies: listOfMovies
            };
        case('REMOVE_FROM_LIST'):
            let remains = [...store.favorites];
            let index = remains.findIndex((item)=> item.id === action.payload.id);
            remains.splice(index, 1);
            return{
                ...store,
                favorites: remains
            }
        default: return store;
    }
}
export default reducer;