package io.egen.service;

import io.egen.entity.Alert;
import io.egen.entity.Reading;
import io.egen.entity.Tire;
import io.egen.entity.Vehicle;
import io.egen.exception.ResourceNotFoundException;
import io.egen.repository.ReadingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by darav on 6/24/2017.
 */

@Service
public class ReadingServiceImplementation implements ReadingService
{
    @Autowired
    ReadingRepository readingRepository;

    @Autowired
    TireService tireService;

    @Autowired
    VehicleService vehicleService;

    @Autowired
    AlertService alertService;

    @Transactional(readOnly = true)
    public List<Reading> fetchDataByVin(String vin, String filter) {
        if(filter==null) {
            return readingRepository.fetchCoordinatesByVin(vin);
        }
        else if(filter.equals("last30min")){
            readingRepository.fetchCoordinatesByVin(vin);
        }
        else if(filter.equals("last1Hr")){
            readingRepository.fetchReadingByVinAnd1Hr(vin);
        }
        else if(filter.equals("last3Hr")){
            readingRepository.fetchReadingByVinAnd3Hr(vin);
        }
        else if(filter.equals("last1Day")){
            readingRepository.fetchReadingByVinAnd1Day(vin);
        }
        return null;
    }
    @Transactional
    public Reading create(Reading reading) {
        //System.out.println("Reading Service......");
        //System.out.println(reading.getVehicle().getVin());
        Vehicle vehicleExists=vehicleService.findOne(reading.getVin());
        if(vehicleExists==null){
            throw new ResourceNotFoundException("Vehicle with id " + reading.getVin() + " doesn't exist. Foreign constraint violated ");
        }
        Tire tire=reading.getTires();
        Tire exists= tireService.findOne(tire.getId());
        if (exists==null){
            tireService.create(tire);
        }
        readingRepository.create(reading);
        checkRules(reading);
        return reading;
    }



    public void checkRules(Reading reading){


        Vehicle vehicle=vehicleService.findOne(reading.getVin());
        if(vehicle==null){
            throw new ResourceNotFoundException("Vehicle with id " + reading.getVin() + " doesn't exist. Foreign constraint violated ");
        }
        if(reading.getEngineRpm()>vehicle.getRedlineRpm()){
            Alert alert=new Alert();
            //System.out.println(reading.getEngineRpm());
            alert.setReading(reading);
            alert.setVin(reading.getVin());
            alert.setPriority("HIGH");
            alert.setTimestamp(reading.getTimestamp());
            alertService.create(alert);
        }
        if(reading.getFuelVolume()< (0.1)*(vehicle.getMaxFuelVolume()) ){
            Alert alert=new Alert();
            alert.setReading(reading);
            alert.setVin(reading.getVin());
            alert.setPriority("MEDIUM");
            alert.setTimestamp(reading.getTimestamp());
            alertService.create(alert);
        }
        if(tireDefect(reading.getTires()) || reading.isEngineCoolantLow() || reading.isCheckEngineLightOn()){
            Alert alert=new Alert();
            alert.setReading(reading);
            alert.setVin(reading.getVin());
            alert.setPriority("LOW");
            alert.setTimestamp(reading.getTimestamp());
            alertService.create(alert);
        }
        /*if (reading.isEngineCoolantLow() || reading.isCheckEngineLightOn()){
            alert.setReading(reading);

            alert.setPriority("LOW");
            alert.setTimestamp(reading.getTimestamp());
            alertService.create(alert);
        }*/
    }
    public boolean tireDefect(Tire tire){
        if (tire.getFrontLeft()<32 || tire.getFrontLeft() > 36)
            return true;
        if (tire.getFrontRight()<32 || tire.getFrontRight() > 36)
            return true;
        if (tire.getRearLeft()<32 || tire.getRearLeft() > 36)
            return true;
        if (tire.getRearRight()<32 || tire.getRearRight() > 36)
            return true;
        return false;
    }

}
