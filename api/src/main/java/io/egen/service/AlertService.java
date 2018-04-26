package io.egen.service;

import io.egen.entity.Alert;

import java.util.List;


public interface AlertService {
    Alert create(Alert alert);
    List<Alert> fetchAlertsLast2Hours();
    List<Alert> fetchByVin(String id);

}
