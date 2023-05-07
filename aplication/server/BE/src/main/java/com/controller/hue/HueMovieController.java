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

    //HueHV, phương thức tìm phim theo mã id
    @GetMapping("/list/{id}")
    public Movie getMovieById(@PathVariable(value = "id") long id) {
        return movieService.findMovieById(id);
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

}
