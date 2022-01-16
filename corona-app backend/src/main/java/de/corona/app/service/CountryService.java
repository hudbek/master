package de.corona.app.service;

import de.corona.app.model.Country;
import de.corona.app.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    public Country create(Country entity) {
        Country c = countryRepository.findByName(entity.getName());
        if (c != null) {
            c.setFollow(entity.isFollow());
            countryRepository.save(c);
            return c;
        }
        return countryRepository.save(entity);
    }

    public List<Country> getAll() {
        return countryRepository.findAll();
    }

    public Country getCountry(String name) {
        return countryRepository.findByName(name);
    }
}
