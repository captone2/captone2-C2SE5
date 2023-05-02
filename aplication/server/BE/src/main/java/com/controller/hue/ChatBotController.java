package com.controller.hue;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

enum Test {
    MOVIES,
    PRICES,
    SHOW_TIMES
}
@RestController
@RequestMapping(value = "api")
@CrossOrigin("http://localhost:4200")
public class ChatBotController {
}
