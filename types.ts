export interface movieDetailType {
    Poster: string,
    Title: string,
    Type: string,
    Year: string,
    imdbID: string
}
enum MovieType {
    Movie = "movie",
    Series = "series",
    Episode = "episode",
}


export interface eachMovieDetailsType {
    Actors: string,
    Awards: string,
    BoxOffice: string,
    Country: string,
    DVD: string,
    Director: string,
    Genre: string,
    Language: string,
    Metascore: string,
    Plot: string,
    Poster: string,
    Production: string,
    Rated: string,
    Ratings: {
        Source: string,
        Value: string
    }[],
    Released: string,
    Response: string,
    Runtime: string,
    Title: string,
    Type: MovieType,
    Website: string,
    Writer: string,
    Year: string,
    imdbID: string,
    imdbRating: string,
    imdbVotes: string,

}

export interface assetsDataType {
    changePercent24Hr: string;
    explorer: string;
    id: string;
    marketCapUsd: string;
    maxSupply: string;
    name: string;
    priceUsd: string;
    rank: string;
    supply: string;
    symbol: string;
    volumeUsd24Hr: string;
    vwap24Hr: string;
}