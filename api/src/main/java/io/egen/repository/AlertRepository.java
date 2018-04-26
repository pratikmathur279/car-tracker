package io.egen.repository;

import io.egen.entity.Alert;

import java.util.List;

/**
 * Created by darav on 6/29/2017.
 */
public interface AlertRepository {
    Alert create(Alert alert);
    List<Alert> fetchAlertsLast2Hours();
    List<Alert> fetchByVin(String id);
}
