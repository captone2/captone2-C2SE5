package com.controller;

import com.model.entity.Food;
import com.model.entity.Movie;
import com.repository.FoodRepository;
import com.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/auth/food")
@CrossOrigin("**")
public class FoodController {
    @Autowired
    FoodRepository foodRepository;

    @GetMapping(value = "/getAll")
    public ResponseEntity<List<Food>> getAll() {
        try {
            List<Food> foodList = foodRepository.findAllFood();
            return new ResponseEntity<>(foodList,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteFood(@PathVariable("id") long id) {
        foodRepository.deleteMovie(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
