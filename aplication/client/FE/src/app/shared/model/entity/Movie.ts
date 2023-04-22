import {Comment} from './Comment';
import {MovieImage} from './MovieImage';
import {Showtime} from './Showtime';

import {Account} from './Account';
import {Genre} from './Genre';


export class Movie {
  id: number;
  title: string;
  showingFrom: string;
  showingTo: string;
  cast: string;
  director: string;
  releaseDate: string;
  rated: string;
  runningTime: number;
  production: string;
  trailerUrl: string;
  content: string;
  is3D: boolean;
  genres: Genre[];
  comments: Comment[];
  movieImages: MovieImage[];
}
