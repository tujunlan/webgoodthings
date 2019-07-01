package com.example.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Controller
public class SessionController {

    @RequestMapping(value = "/session", method = RequestMethod.POST)
    @ResponseBody
    public String welcome(HttpServletRequest request, @RequestBody String json) {
        request.getSession().setAttribute("json", json);
        return "success";
    }
}