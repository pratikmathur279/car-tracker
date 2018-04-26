package io.egen.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import java.sql.Timestamp;

/**
 * Created by darav on 6/24/2017.
 */
@Entity
@NamedQueries({
    @NamedQuery(name="Vehicle.fetchAll",
                query="select v from Vehicle v")
})
public class Vehicle {

    @Id
    private String vin;

    private String make;
    private String model;
    private long year;
    private long redlineRpm;
    private long maxFuelVolume;
    private Timestamp lastServiceDate;

    public long getRedlineRpm() {
        return redlineRpm;
    }

    public void setRedlineRpm(long redlineRpm) {
        this.redlineRpm = redlineRpm;
    }

    public long getMaxFuelVolume() {
        return maxFuelVolume;
    }

    public void setMaxFuelVolume(long maxFuelVolume) {
        this.maxFuelVolume = maxFuelVolume;
    }


    public String getVin() {
        return vin;
    }

    public void setVin(String vin) {
        this.vin = vin;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public long getYear() {
        return year;
    }

    public void setYear(long year) {
        this.year = year;
    }

    public Timestamp getLastServiceDate() {
        return lastServiceDate;
    }

    public void setLastServiceDate(Timestamp lastServiceDate) {
        this.lastServiceDate = lastServiceDate;
    }
}
