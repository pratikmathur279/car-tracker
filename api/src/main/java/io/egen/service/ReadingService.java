package io.egen.service;

import io.egen.entity.Reading;

import java.util.List;

/**
 * Created by darav on 6/24/2017.
 */
public interface ReadingService {

    Reading create(Reading reading);
    List<Reading> fetchDataByVin(String vin,String filter);
}
