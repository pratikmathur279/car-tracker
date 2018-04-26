package io.egen.repository;

import io.egen.entity.Tire;

/**
 * Created by darav on 6/28/2017.
 */
public interface TireRepository
{
    Tire create(Tire tire);
    Tire findOne(String tid);
}
