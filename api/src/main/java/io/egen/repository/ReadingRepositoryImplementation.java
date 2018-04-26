package io.egen.repository;

import io.egen.entity.Reading;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Repository
public class ReadingRepositoryImplementation implements ReadingRepository {

    @PersistenceContext
    EntityManager entityManager;
    public Reading create(Reading reading){
        //System.out.println("Reading Repository......");
        entityManager.persist(reading);
        return reading;
    }

    public List<Reading> fetchCoordinatesByVin(String vin) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, -30);
        Timestamp timestamp = new Timestamp(calendar.getTimeInMillis());
        TypedQuery<Reading> typedQuery=entityManager.createNamedQuery("Reading.fetchCoordinatesByVin",
                                                                        Reading.class);
        typedQuery.setParameter("paramVin",vin);
        typedQuery.setParameter("pastTime",timestamp);
        return typedQuery.getResultList();
    }


    public List<Reading> fetchReadingByVinAnd1Hr(String vin) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR, -1);
        Timestamp timestamp = new Timestamp(calendar.getTimeInMillis());
        TypedQuery<Reading> typedQuery=entityManager.createNamedQuery("Reading.fetchCoordinatesByVin",
                Reading.class);
        typedQuery.setParameter("paramVin",vin);
        typedQuery.setParameter("pastTime",timestamp);
        return typedQuery.getResultList();
    }

    public List<Reading> fetchReadingByVinAnd3Hr(String vin) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR, -2);
        Timestamp timestamp = new Timestamp(calendar.getTimeInMillis());
        TypedQuery<Reading> typedQuery=entityManager.createNamedQuery("Reading.fetchCoordinatesByVin",
                Reading.class);
        typedQuery.setParameter("paramVin",vin);
        typedQuery.setParameter("pastTime",timestamp);
        return typedQuery.getResultList();
    }

    public List<Reading> fetchReadingByVinAnd1Day(String vin) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DAY_OF_MONTH, -1);
        Timestamp timestamp = new Timestamp(calendar.getTimeInMillis());
        TypedQuery<Reading> typedQuery=entityManager.createNamedQuery("Reading.fetchCoordinatesByVin",
                Reading.class);
        typedQuery.setParameter("paramVin",vin);
        typedQuery.setParameter("pastTime",timestamp);
        return typedQuery.getResultList();
    }
}
