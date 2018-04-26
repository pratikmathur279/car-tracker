package io.egen.service;

import io.egen.entity.Alert;
import io.egen.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AlertServiceImplementation implements AlertService {

    @Autowired
    AlertRepository alertRepository;

    @Transactional
    public Alert create(Alert alert) {
        //System.out.println("Alert Service");
        return alertRepository.create(alert);
    }

    @Transactional(readOnly = true)
    public List<Alert> fetchAlertsLast2Hours() {
        return alertRepository.fetchAlertsLast2Hours();
    }

    @Transactional(readOnly = true)
    public List<Alert> fetchByVin(String id) {
        return alertRepository.fetchByVin(id);
    }
}
