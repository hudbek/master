package de.corona.app.controller;

import de.corona.app.model.Country;
import de.corona.app.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(maxAge = 3600)
@RestController
public class MainController {
    @Autowired
    private CountryService countryService;

    @PostMapping("/v1/country")
    public ResponseEntity<Country> create(@Valid @RequestBody Country type) {
        Country t = countryService.create(type);
        if (t != null) {
            return ResponseEntity.accepted().body(t);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/v1/country/{name}")
    public ResponseEntity<Country> getCountry(@PathVariable String name) {
        Country t = countryService.getCountry(name);
        if (t != null) {
            return ResponseEntity.accepted().body(t);
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/v1/countries")
    public List<Country> getAllCountries() {
        return countryService.getAll();
    }
}
