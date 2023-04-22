package com.service.impl;

import com.repository.BookingRepository;
import com.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingServiceImpl  {
    @Autowired
    private BookingRepository bookingRepository;

}
