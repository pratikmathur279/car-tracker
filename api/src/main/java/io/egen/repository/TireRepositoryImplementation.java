package io.egen.repository;

import io.egen.entity.Tire;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Created by darav on 6/28/2017.
 */

@Repository
public class TireRepositoryImplementation implements TireRepository {


    @PersistenceContext
    EntityManager entityManager;
    public Tire create(Tire tire) {
        //System.out.println("Tire Repository......");
        entityManager.persist(tire);
        return tire;
    }

    public Tire findOne(String tid) {
        //System.out.println("Tire Repository find......");
        return entityManager.find(Tire.class,tid);
    }
}
