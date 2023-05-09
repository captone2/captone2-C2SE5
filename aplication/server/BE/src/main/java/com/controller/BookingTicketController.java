package com.controller;

import com.model.dto.BookingCheck;
import com.model.dto.BookingDTOMain;
import com.model.dto.BookingFoodDTO;
import com.model.entity.Booking;
import com.model.entity.Movie;
import com.repository.BookingRepository;
import com.service.MovieService;
import com.service.ShowtimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "api/auth/booking")
@CrossOrigin(origins = "*")
public class BookingTicketController {
    @Autowired
    private MovieService movieService;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ShowtimeService showtimeService;

    @PostMapping(value = "/seat")
    public ResponseEntity<Object> postListNumbersAndId(@RequestBody Map<String, Object> requestData) {
        List<Integer> numbers = (List<Integer>) requestData.get("numbers");
        String code = (String) requestData.get("id");
        Booking booking = bookingRepository.getBookingByBookingCode(code);
        for(int i =0; i<numbers.size();i++) {
            bookingRepository.saveBookingSeat(numbers.get(i),booking.getId());
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping(value = "/food")
    public ResponseEntity<Object> handleTwoLists(@RequestBody BookingFoodDTO request) {
        String code = request.getId();
        List<Integer> list1 = request.getList1(); //total
        List<Integer> list2 = request.getList2(); //foodId
        Booking booking = bookingRepository.getBookingByBookingCode(code);
        for (int i = 0 ; i<list1.size();i++) {
            if (list1.get(i) == 0) {
                continue;
            } else {
                bookingRepository.saveBookingFood(list1.get(i),booking.getId(),list2.get(i));
            }
        }
        return new ResponseEntity<>( HttpStatus.OK);
    }


    @PostMapping()
    public ResponseEntity<?> createBooking(@RequestBody BookingDTOMain bookingDTO) {
        bookingRepository.saveBooking(bookingDTO.getBookingCode(),bookingDTO.getDayTimeBooking(),bookingDTO.getTotalPrice(),bookingDTO.getAccountId(),bookingDTO.getMovieShowTimeId(),bookingDTO.getUrlQrCode());
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping(value = "/account/{id}")
    public ResponseEntity<List<Booking>> getListBookingByAccountId(@PathVariable("id") Integer id) {
        List<Booking> bookings = bookingRepository.getBookingByAccountId(id);
        return new ResponseEntity<>(bookings,HttpStatus.OK);
    }

    @GetMapping(value = "/movie-showing")
    public ResponseEntity<List<Movie>> getMovieShowings() {
        List<Movie> movieShowings = movieService.findAllMovieShowing();
        if (movieShowings.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(movieShowings, HttpStatus.OK);
        }
    }

    @GetMapping(value = "/seatByShowTime/{id}")
    public ResponseEntity<List<Integer>> getSeatByMovieShowings(@PathVariable("id") Integer id) {
        List<Integer> list = bookingRepository.getSeatByShowTimeId(id);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PostMapping(value = "/get-booking-by-code", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Booking> getBookingByCodeNotReceived(@RequestBody BookingCheck booking) {
        if(booking == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        Booking bookingCurrent = bookingRepository.getBookingByBookingCode(booking.getBookingCode());
        return new ResponseEntity<>(bookingCurrent, HttpStatus.OK);
    }

    @PostMapping(value = "/received-booking")
    public ResponseEntity setTicketBookingReceived(@RequestBody BookingCheck booking){
        if(booking == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        bookingRepository.setTicketBookingReceived(booking.getId());
        return new ResponseEntity(HttpStatus.OK);
    }

}

