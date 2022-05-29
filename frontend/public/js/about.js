let movie_id = location.pathname;             //get the movie id from the address bar
//can be checked using console.log(movie_id);

// fetching movie details 
fetch(`${movie_detail_http}${movie_id}?` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    setupMovieInfo(data);
})

const setupMovieInfo = (data) => {
    const movieName = document.querySelector('.movie-name');
    const genres = document.querySelector('.genres');
    const des = document.querySelector('.des');
    const title = document.querySelector('title');
    const backdrop = document.querySelector('.movie-info');

    title.innerHTML = movieName.innerHTML = data.title;           //rep
    genres.innerHTML = `${data.release_date.split('-')[0]} | `;
    for(let i = 0; i < data.genres.length; i++){
        genres.innerHTML += data.genres[i].name + formatString(i, data.genres.length);
    }  //loop to add genres

    if(data.adult == true){
        genres.innerHTML += ' | +18';
    }

    if(data.backdrop_path == null){
        data.backdrop_path = data.poster_path;
    }

    des.innerHTML = data.overview.substring(0, 200) + '...';

    backdrop.style.backgroundImage = `url(${original_img_url}${data.backdrop_path})`;      //setting backdrop image
}

const formatString = (currentIndex, maxIndex) => {
    return (currentIndex == maxIndex - 1) ? '' : ', ';
}//return nothing if the current and the last genre is same or else ','

//fetching cast info

fetch(`${movie_detail_http}${movie_id}/credits?` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    const cast = document.querySelector('.starring');
    for(let i = 0; i < 5; i++){
        cast.innerHTML += data.cast[i].name + formatString(i, 5);
    }
})

// fetching video clips

fetch(`${movie_detail_http}${movie_id}/videos?` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    let trailerContainer = document.querySelector('.trailer-container');

    let maxClips = (data.results.length > 4) ? 4 : data.results.length;

    for(let i = 0; i < maxClips; i++){
        trailerContainer.innerHTML += `
        <iframe src="https://youtube.com/embed/${data.results[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    }
})

// fetch recommendations
fetch(`http://localhost:8080/api/recommend`)
.then(res => res.json())
.then(data => {
    let container = document.querySelector('.recommendations-container');
    for(i = 0 ; i < 8 ; i++){
        // take individual movie id
        var movieId = data.ItemList[i].ItemId;
            
        // fetch each movie details
        fetch(`${movie_detail_http}/${movieId}?` + new URLSearchParams({
            api_key: api_key
        }))
        .then(res => res.json())
        .then(data_detail => {
            if(data_detail.backdrop_path == null){
                i++;
            }
            container.innerHTML += `
            <div class="movie" onclick="location.href = '/${data_detail.id}'">
                <img src="${img_url}${data_detail.backdrop_path}" alt="">
                <p class="movie-title">${data_detail.title}</p>
            </div>
            `;
        })

    }
})
