package io.egen.service;

import io.egen.entity.Tire;
import io.egen.repository.TireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

@Service
public class TireServiceImplementation implements TireService{

    @Autowired
    TireRepository tireRepository;

    @Transactional
    public Tire create(Tire tire){
        //System.out.println("Tire Service......");
        return tireRepository.create(tire);

    }

    @Transactional(readOnly = true)
    public Tire findOne(String tid){
        //System.out.println("Tire Service find......");
        return tireRepository.findOne(tid);
    }
}
