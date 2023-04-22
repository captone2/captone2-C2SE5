package com.controller;

import com.model.entity.Screen;
import com.service.ScreenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "api/screen")
@CrossOrigin("http://localhost:4200")
public class ScreenController {
    @Autowired
    ScreenService screenService;

    @GetMapping("/list")
    public List<Screen> getList(){
        return screenService.findAll();
    }

    @PostMapping("/details")
    public Optional<Screen> findScreenById(@RequestBody String id){
        System.out.println(id);
        return screenService.findScreenById(id);
    }

    @GetMapping("/search")
    public List<Screen> searchScreen(@RequestParam(required = false) String keyWord){
        System.out.println(keyWord);
        return screenService.findScreenByName(keyWord);
    }
}
