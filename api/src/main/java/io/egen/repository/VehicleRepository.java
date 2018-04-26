package io.egen.repository;

import io.egen.entity.Vehicle;

import java.util.List;

public interface VehicleRepository {
    Vehicle create(Vehicle vehicle);
    Vehicle findOne(String vin);
    Vehicle update(Vehicle vehicle);
    List<Vehicle> fetchAll();
}
