package com.controller.hue;

import com.model.dto.Hue.SearchMovieDTO;
import com.model.entity.*;
import com.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "api")
@CrossOrigin("http://localhost:4200")
public class HueMovieController {
    @Autowired
    MovieService movieService;


    @Autowired
    ScreenService screenService;

    @Autowired
    MovieImageService movieImageService;

    @Autowired
    ShowtimeService showtimeService;

    @Autowired
    GenreService genreService;

    @Autowired
    AccountService accountService;


    // HueHV, phương thức hiển thị tất cả danh sách phim
//    @GetMapping("/list-movie")
//    public Page<Movie> getAllMovie(@RequestParam(value = "title") Optional<String> title,
//                                   @PageableDefault(value=10) Pageable pageable) {
//        String stringAfterCheck = "";
//        if(!title.isPresent()){
//            return movieService.getAllMovie(pageable);
//        }
//        else {
//            stringAfterCheck = title.get();
//            return movieService.listAllMovie(stringAfterCheck, pageable);
//        }
//    }

    // HueHV, phương thức hiển thị tất cả danh sách phim
    @GetMapping("/list-movie")
    public List<Movie> getAllMovie(@RequestParam(value = "title") Optional<String> title) {
        String stringAfterCheck = "";
        if(!title.isPresent()){
            return movieService.getAllMovie();
        }
        else {
            stringAfterCheck = title.get();
            return movieService.listAllMovie(stringAfterCheck);
        }
    }

    @PutMapping("/search")
    public ResponseEntity<List<Movie>> searchMovie(@RequestBody SearchMovieDTO searchMovieDTO){
        List<Movie> movies = movieService.searchMovie(searchMovieDTO);
        System.out.println(searchMovieDTO.getTitle());
        System.out.println(searchMovieDTO.getReleaseDate());
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    //HueHV, phương thức tạo mới 1 bộ phim
//    @PostMapping(value = "/create-movie/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> createMovie(@RequestBody com.model.dto.hue.MovieDTO movie, @PathVariable(value = "id") long id) {
//        if (movie == null) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } else {
//            System.out.println(id);
//            movieService.createMovie(movie.getTitle().trim(), movie.getShowingFrom(), movie.getShowingTo(),
//                    movie.getCast().trim(), movie.getDirector().trim(),
//                    movie.getReleaseDate(), movie.getRated(),
//                    movie.getRunningTime(), movie.getProduction().trim(), movie.getTrailerUrl().trim(),
//                    movie.getContent().trim(), movie.isIs3D(), id);
//            long idMovie = Long.parseLong(String.valueOf(movieService.getIdMovieByName(movie.getTitle()).getId()));
//            for(int i =0;i < movie.getGenres().size(); i++){
//                genreService.addGenreToMovie(Long.parseLong(movie.getGenres().get(i)), idMovie);
//            }
//            for(int i =0;i < movie.getShowtime().size(); i++){
//                showtimeService.addShowTimes(movie.getShowtime().get(i).getShowtime(), movie.getShowtime().get(i).getPrice());
//            }
//            for(int i =0;i < movie.getShowtime().size(); i++){
//                long showTimesDTO = showtimeService.getIdByShowDayAndShowTime(movie.getShowtime().get(i).getShowtime(), movie.getShowtime().get(i).getPrice()).getId();
//                showtimeService.joinTableMovieAndShowtime(idMovie, showTimesDTO);
//            }
////            for(int i = 0;i<movie.getMovieImages().size();i++){
////                System.out.println(movie.getMovieImages().get(i));
////                movieImageService.addImageByIdMovie(movie.getMovieImages().get(i), idMovie);
////            }
//
//            return new ResponseEntity<>(HttpStatus.OK);
//        }
//    }

    //HueHV, phương thức tìm phim theo mã id
    @GetMapping("/list/{id}")
    public Movie getMovieById(@PathVariable(value = "id") long id) {
        return movieService.findMovieById(id);
    }

    //HueHV, phương thức chỉnh sửa 1 bộ phim
    @PatchMapping(value = "/update-movie/{id}/{idAccount}")
    public ResponseEntity<?> updateMovie(@PathVariable(value = "id") long id, @PathVariable(value = "idAccount") long accountId, @RequestBody com.model.dto.Hue.MovieDTO movie) {
        if (movie == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            movieService.updateMovie(movie.getTitle().trim(), movie.getShowingFrom(), movie.getShowingTo(),
                    movie.getCast().trim(), movie.getDirector().trim(), movie.getReleaseDate(), movie.getRated(),
                    movie.getRunningTime(), movie.getProduction().trim(), movie.getTrailerUrl().trim(),
                    movie.getContent().trim(), movie.isIs3D(), accountId, id);

            for(int i=0; i< movie.getGenres().size();i++){

            }
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }


    //HueHV, phương thức lấy danh sách phòng chiếu
    @GetMapping("/list-screen")
    public List<Screen> getAllScreen() {
        return screenService.findAll();
    }

    // HueHV, phương thức lấy tất cả ảnh của bộ phim theo id của phim
    @GetMapping("/get-image/{id}")
    public List<MovieImage> getImageByIdMovie(@PathVariable(value = "id") long id) {
        return movieImageService.listImageMovieById(id);
    }

    //HueHV
    @GetMapping("/get-id")
    public Movie getIdMovieByName(@RequestParam(value = "title")String title){
        return movieService.getIdMovieByName(title);
    }


    //HueHV, phương thức lấy danh sách account của nhân viên
    @GetMapping("/list-employee")
    public List<Account> getAllAccountByCodeEmployee() {
        return accountService.listAccountByCodeEmployee();
    }

    //HueHV, phương thức lấy danh sách thể loại phim
    @GetMapping(value = "/list-genre")
    public List<Genre> getAllGenre(){
        return genreService.findAll();
    }

    //HueHV, phương thức lấy danh sách giá phim
//    @GetMapping("/list-price")
//    public List<Price> getAllListPrice(){
//        return priceService.listPrice();
//    }

}
