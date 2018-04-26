package io.egen.service;

import io.egen.entity.Vehicle;
import io.egen.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.ArrayList;
import java.util.List;

/**
 * Created by darav on 6/24/2017.
 */

@Service
public class VehicleServiceImplementation implements VehicleService
{
    @Autowired
    VehicleRepository vehicleRepository;

    @Transactional
    public List<Vehicle> create(Vehicle v[]) {
        List<Vehicle> result=new ArrayList<Vehicle>();
        for(Vehicle vehicle:v){
            Vehicle exists=vehicleRepository.findOne(vehicle.getVin());
            if(exists==null){
                vehicle=vehicleRepository.create(vehicle);
            }
            else{
                vehicle=vehicleRepository.update(vehicle);
            }
            result.add(vehicle);
        }
        return result;
    }

    public Vehicle findOne(String vin) {
        return vehicleRepository.findOne(vin);
    }

    @Transactional(readOnly = true)
    public List<Vehicle> fetchAll() {
        return vehicleRepository.fetchAll();
    }
}
