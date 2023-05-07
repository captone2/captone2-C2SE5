package com.controller.hue;

import com.model.entity.ChatBot;
import com.model.entity.Food;
import com.model.entity.Movie;
import com.service.ChatBotService;
import com.service.FoodService;
import com.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/chat-bot")
@CrossOrigin("http://localhost:4200")
public class ChatBotController {
    @Autowired
    private ChatBotService chatBotService;

    @Autowired
    private MovieService movieService;

    @Autowired
    private FoodService foodService;

    @GetMapping("/")
    public ResponseEntity<List<ChatBot>> findAllKeyword() {
        return new ResponseEntity(chatBotService.findAllKeyword(), HttpStatus.OK);
    }

    @PostMapping(value = "/add-key-word", consumes = MediaType.ALL_VALUE)
    public ResponseEntity<?> addKeyword(@RequestBody ChatBot chatBot){
        if(chatBot.equals(null)){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        chatBotService.addKeyword(chatBot.getKeyword());
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping(value = "/remove-key-word", consumes = MediaType.ALL_VALUE)
    public ResponseEntity<?> removeKeyword(@RequestBody ChatBot chatBot){
        ChatBot chatBotCurrent = chatBotService.findChatBotById(chatBot.getId());
        if (chatBotCurrent != null){
            chatBotService.removeKeywordById(chatBotCurrent.getId());
            return new ResponseEntity(HttpStatus.OK);
        }
       return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/movie-coming-soon")
    public ResponseEntity<List<Movie>> findAllMovieComingSoon() {
        return new ResponseEntity(movieService.findAllMovieComingSoon(), HttpStatus.OK);
    }

    @GetMapping("/movie-best-seller")
    public ResponseEntity<Movie> findOneMovieBestSeller() {
        return new ResponseEntity(movieService.findOneMovieBestSeller(), HttpStatus.OK);
    }

    @GetMapping("/movie-showing")
    public ResponseEntity<List<Movie>> findAllMovieShowing() {
        return new ResponseEntity(movieService.findAllMovieShowing(), HttpStatus.OK);
    }

    @GetMapping("/food")
    public ResponseEntity<List<Food>> findAllFood() {
        return new ResponseEntity(foodService.findAll(), HttpStatus.OK);
    }
}
