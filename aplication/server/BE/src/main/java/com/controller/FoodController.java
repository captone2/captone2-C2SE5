package com.controller;

import com.model.dto.employeeAccount.CreateEmployeeAccount;
import com.model.entity.Account;
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
        List<Food> foodList = foodRepository.findAllFood();
        return new ResponseEntity<>(foodList,HttpStatus.OK);

    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteFood(@PathVariable("id") long id) {
        foodRepository.deleteFood(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<?> createFood(@RequestBody Food food ) {
        food.setEnabled(true);
        foodRepository.save(food);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
