package io.egen.repository;

import io.egen.entity.Alert;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Repository
public class AlertRepositoryImplementation implements AlertRepository {

    @PersistenceContext
    EntityManager entityManager;

    public Alert create(Alert alert) {
        //System.out.println("Alert Repository");
        entityManager.persist(alert);
        return alert;
    }

    public List<Alert> fetchAlertsLast2Hours() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR, -2);
        Timestamp timestamp1 = new Timestamp(calendar.getTimeInMillis());
        TypedQuery<Alert> typedQuery=entityManager.createNamedQuery("Alert.fetchHighAlertsWithinLast2Hours",
                                                                    Alert.class);
        typedQuery.setParameter("pastTime",timestamp1);
        return typedQuery.getResultList();
    }

    public List<Alert> fetchByVin(String id) {
        TypedQuery<Alert> typedQuery=entityManager.createNamedQuery("Alert.fetchByVin",Alert.class);
        typedQuery.setParameter("paramVin",id);
        return typedQuery.getResultList();
    }
}
