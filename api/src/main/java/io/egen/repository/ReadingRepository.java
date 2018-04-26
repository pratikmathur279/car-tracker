package io.egen.repository;

import io.egen.entity.Reading;

import java.util.List;

/**
 * Created by darav on 6/28/2017.
 */
public interface ReadingRepository {

    public Reading create(Reading reading);
    public List<Reading> fetchCoordinatesByVin(String vin);
    public List<Reading> fetchReadingByVinAnd1Hr(String vin);
    public List<Reading> fetchReadingByVinAnd3Hr(String vin);
    public List<Reading> fetchReadingByVinAnd1Day(String vin);
}
