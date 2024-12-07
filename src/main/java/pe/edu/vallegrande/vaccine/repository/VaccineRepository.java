package pe.edu.vallegrande.vaccine.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import pe.edu.vallegrande.vaccine.model.VaccineModel; // Cambia a VaccineModel



public interface VaccineRepository extends ReactiveCrudRepository<VaccineModel, Long> { // Cambia el nombre de la interfaz

}
