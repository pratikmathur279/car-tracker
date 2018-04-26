package io.egen.repository;

import io.egen.entity.Vehicle;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;

@Repository
public class VehicleRepositoryImplementation implements VehicleRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public Vehicle create(Vehicle vehicle) {
        entityManager.persist(vehicle);
        return vehicle;

    }

    public Vehicle findOne(String vin){
        return entityManager.find(Vehicle.class,vin);
    }

    public Vehicle update(Vehicle vehicle) {
        return entityManager.merge(vehicle);
    }

    public List<Vehicle> fetchAll() {
        TypedQuery<Vehicle> typedQuery=entityManager.createNamedQuery("Vehicle.fetchAll",Vehicle.class);
        return typedQuery.getResultList();
    }
}
