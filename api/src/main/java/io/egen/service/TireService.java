package io.egen.service;

import io.egen.entity.Tire;


public interface TireService {
    Tire create(Tire tire);
    Tire findOne(String tid);
}
