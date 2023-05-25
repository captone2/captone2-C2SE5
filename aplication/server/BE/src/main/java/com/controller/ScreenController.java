package com.controller;

import com.model.dto.ScreenDTO;
import com.model.entity.Food;
import com.model.entity.Screen;
import com.model.entity.Seat;
import com.repository.ScreenRepository;
import com.repository.SeatRepository;
import com.service.ScreenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "api/screen")
@CrossOrigin("**")
public class ScreenController {
    @Autowired
    ScreenService screenService;

    @Autowired
    ScreenRepository screenRepository;

    @Autowired
    SeatRepository seatRepository;

    @GetMapping("/list")
    public List<Screen> getList(){
        return screenService.findAll();
    }

    @PostMapping("/details")
    public Optional<Screen> findScreenById(@RequestBody String id){
        System.out.println(id);
        return screenService.findScreenById(id);
    }

    @PostMapping(value = "/add")
    public ResponseEntity<?> createScreen(@RequestBody ScreenDTO screen ) {
        System.out.println(1);
        Screen screen2 = new Screen(screen.getName(),screen.getTotalSeat(),true);
        Screen screen1 = screenRepository.save(screen2);

        List<Seat> seats = new ArrayList<>();

        char row = 'A';

        for (int i = 0; i < screen.getTotalSeat(); i++) {  //36 seat
            for (int seatNumber = 1; seatNumber <= 16; seatNumber++) {
                Seat seat = new Seat();
                seat.setName(String.valueOf(row) + seatNumber);
                seat.setVip(false);
                seat.setEnabled(true);
                seat.setScreen(screen1);
                seats.add(seat);
                i++;
                if (i == screen.getTotalSeat()) {
                    break;
                }
            }
            i--;
            row++;
        }
        seatRepository.saveAll(seats);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/search")
    public List<Screen> searchScreen(@RequestParam(required = false) String keyWord){
        System.out.println(keyWord);
        return screenService.findScreenByName(keyWord);
    }
}
