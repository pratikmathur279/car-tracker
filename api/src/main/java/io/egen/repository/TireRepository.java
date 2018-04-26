package io.egen.repository;

import io.egen.entity.Tire;


public interface TireRepository
{
    Tire create(Tire tire);
    Tire findOne(String tid);
}
