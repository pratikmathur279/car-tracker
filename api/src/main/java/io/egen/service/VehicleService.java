package io.egen.service;

import io.egen.entity.Vehicle;

import java.util.List;

public interface VehicleService {

    List<Vehicle> create(Vehicle vehicle[]);
    Vehicle findOne(String vin);
    List<Vehicle> fetchAll();
}
