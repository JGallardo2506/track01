package pe.edu.vallegrande.vaccine.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Table;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column; // Importa Column

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("vaccine") // Nombre de la tabla en la base de datos
public class VaccineModel {

    @Id
    private Long id;

    @Column("nameVaccine") // Especifica el nombre exacto de la columna
    private String nameVaccine;

    @Column("typeVaccine") // Especifica el nombre exacto de la columna
    private String typeVaccine;

    @Column("description")
    private String description;

    @Column("manufacturingDate")
    private LocalDate manufacturingDate;

    @Column("expirationDate")
    private LocalDate expirationDate;

    @Column("price")
    private BigDecimal price;

    @Column("stock")
    private Integer stock;

    @Column("active")
    private String active;
}
