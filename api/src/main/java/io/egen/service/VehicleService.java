package io.egen.service;

import io.egen.entity.Vehicle;

import java.util.List;

/**
 * Created by darav on 6/24/2017.
 */
public interface VehicleService {

    List<Vehicle> create(Vehicle vehicle[]);
    Vehicle findOne(String vin);
    List<Vehicle> fetchAll();
}
