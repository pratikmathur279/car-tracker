package io.egen.controller;

import io.egen.entity.Reading;
import io.egen.service.ReadingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://mocker.egen.io","http://localhost:63342"},maxAge=3600)
@RestController
@RequestMapping(value="/readings")
public class ReadingController {

    @Autowired
    ReadingService readingService;

    @RequestMapping(method = RequestMethod.POST)
    public Reading create(@RequestBody Reading reading){
        //System.out.println("Reading......");
        return readingService.create(reading);
    }
    @RequestMapping(method = RequestMethod.GET, value = "/{vin}")
    public List<Reading> fetchDataByVin(@PathVariable String vin,
                                        @RequestParam(value = "filer",required = false) String filter){
        return readingService.fetchDataByVin(vin,filter);
    }
}
