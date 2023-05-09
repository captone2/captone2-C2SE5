package com.controller;

import com.model.dto.CommentDTO;
import com.model.entity.Comment;
import com.model.entity.Movie;
import com.service.CommentService;
import com.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/comment")
@CrossOrigin("http://localhost:4200")
public class CommentController {
    @Autowired
    private CommentService commentService;
    @Autowired
    private MovieService movieService;


    @GetMapping(value = "/get-comment/{id}")
    public ResponseEntity<List<Comment>> getAllCommentByMovieId(@PathVariable("id") long id) {
        List<Comment> comments = commentService.findAllCommentByMovieId(id);

        if (comments.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(comments, HttpStatus.OK);
        }
    }
}
