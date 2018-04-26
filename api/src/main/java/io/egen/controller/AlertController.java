package io.egen.controller;

import io.egen.entity.Alert;

import io.egen.service.AlertService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://mocker.egen.io","http://localhost:63342"}, maxAge=3600)
@RestController
@RequestMapping(value="/alerts")
public class AlertController {

    @Autowired
    AlertService alertService;

    @RequestMapping(method = RequestMethod.GET)
    public List<Alert> fetchAlertsLast2Hours(){
        return alertService.fetchAlertsLast2Hours();
    }

    @RequestMapping(method = RequestMethod.GET, value="/{id}")
    public List<Alert> fetchByVin(@PathVariable("id") String vin){
        return alertService.fetchByVin(vin);
    }
}
