package io.egen.service;

import io.egen.entity.Reading;

import java.util.List;


public interface ReadingService {

    Reading create(Reading reading);
    List<Reading> fetchDataByVin(String vin,String filter);
}
