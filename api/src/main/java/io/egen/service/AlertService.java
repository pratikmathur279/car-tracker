package io.egen.service;

import io.egen.entity.Alert;

import java.util.List;

/**
 * Created by darav on 6/29/2017.
 */
public interface AlertService {
    Alert create(Alert alert);
    List<Alert> fetchAlertsLast2Hours();
    List<Alert> fetchByVin(String id);

}
