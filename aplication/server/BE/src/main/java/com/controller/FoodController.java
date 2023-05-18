package com.controller;

import com.model.entity.Food;
import com.model.entity.Movie;
import com.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/auth/food")
@CrossOrigin("**")
public class FoodController {
    @Autowired
    FoodService foodService;

    @GetMapping(value = "/findAll")
    public ResponseEntity<List<Food>> getAllFood() {
        List<Food> foodList = foodService.findAll();
        if (foodList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(foodList, HttpStatus.OK);
        }
    }
}
