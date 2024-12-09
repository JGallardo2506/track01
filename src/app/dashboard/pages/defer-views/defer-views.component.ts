import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { VaccineService } from '../../../service/vaccine.service';
import { Vaccine } from '../../../model/vaccine';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './defer-views.component.html',
  styles: []
})
export default class DeferViewsComponent implements OnInit {
  isModalOpen = false;
  isConfirmationModalOpen = false;
  isEditConfirmationModalOpen = false;
  isInactivateConfirmationModalOpen = false;
  isActivateConfirmationModalOpen = false;
  isValidationErrorModalOpen = false; // Modal para errores de validación
  vaccines: Vaccine[] = [];
  filteredVaccines: Vaccine[] = [];
  isLoading: boolean = true;
  isActive: boolean = true;
  isEditMode: boolean = false;

  // Filtros
  nameFilter: string = ''; 
  descriptionFilter: string = ''; 

  // Información del proveedor
  VaccineForm: Vaccine = { id: 0, nameVaccine: '', typeVaccine: '', description: '', manufacturingDate: '', expirationDate: '', price: '', stock: '', active: 'A' }; 

  // Mensajes de error
  validationErrors: string[] = [];

  constructor(private vaccineService: VaccineService) {}

  ngOnInit(): void {
    this.getVaccines();
  }

  // Obtener todas las vacunas
  getVaccines(): void {
    this.vaccineService.getAllVaccines().subscribe({
      next: (data) => {
        this.vaccines = data;
        this.filterVaccines();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching vaccines:', err);
        this.isLoading = false;
      }
    });
  }

  // Filtrar vacunas
  filterVaccines(): void {
    this.filteredVaccines = this.vaccines.filter(vaccine => {
      const matchesActive = vaccine.active === (this.isActive ? 'A' : 'I');
      const matchesName = vaccine.nameVaccine.toLowerCase().includes(this.nameFilter.toLowerCase());
      const matchesDescription = vaccine.description.toLowerCase().includes(this.descriptionFilter.toLowerCase());
      return matchesActive && matchesName && matchesDescription;
    });
  }

  // Cambiar el estado del switcher
  toggleActive(): void {
    this.filterVaccines();
  }

  // Validar los campos del formulario
  validateForm(): boolean {
    this.validationErrors = []; // Limpiar errores previos

    const { typeVaccine, description, price, stock } = this.VaccineForm;

    // Validación para typeVaccine (solo letras incluyendo la Ñ)
    const regexTypeVaccine = /^[a-zA-ZÑñ]+$/;
    if (!regexTypeVaccine.test(typeVaccine)) {
      this.validationErrors.push('El tipo de vacuna solo debe contener letras del abecedario incluyendo la Ñ.');
    }

    // Validación para description (letras y números)
    const regexDescription = /^[a-zA-ZÑñ0-9 ]+$/;
    if (!regexDescription.test(description)) {
      this.validationErrors.push('La descripción solo debe contener letras del abecedario incluyendo la Ñ y números.');
    }

    // Validación para price (número decimal mayor que 0)
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      this.validationErrors.push('El precio debe ser un número decimal mayor que 0.');
    }

    // Validación para stock (solo número mayor que 0)
    const parsedStock = parseInt(stock);
    if (isNaN(parsedStock) || parsedStock <= 0) {
      this.validationErrors.push('La cantidad debe ser un número mayor que 0.');
    }

    if (this.validationErrors.length > 0) {
      this.isValidationErrorModalOpen = true; // Abrir modal de errores
      return false;
    }

    return true;
  }

  // Inactivar una vacuna
  inactivateVaccine(id: number | undefined): void {
    if (id !== undefined) {
      this.isInactivateConfirmationModalOpen = true; // Abrir modal de confirmación
      this.VaccineForm.id = id; // Guardar el ID de la vacuna a inactivar
    }
  }

  // Activar una vacuna
  activateVaccine(id: number | undefined): void {
    if (id !== undefined) {
      this.isActivateConfirmationModalOpen = true; // Abrir modal de confirmación
      this.VaccineForm.id = id; // Guardar el ID de la vacuna a activar
    }
  }

  // Confirmar inactivación de vacuna
  confirmInactivateVaccine(): void {
    if (this.VaccineForm.id) {
      this.vaccineService.deleteVaccine(this.VaccineForm.id).subscribe({
        next: () => {
          this.getVaccines();
          this.isInactivateConfirmationModalOpen = false; // Cerrar modal de confirmación
        },
        error: (err) => {
          console.error('Error inactivating vaccine:', err);
        }
      });
    }
  }

  // Confirmar activación de vacuna
  confirmActivateVaccine(): void {
    if (this.VaccineForm.id) {
      this.vaccineService.activateVaccine(this.VaccineForm.id).subscribe({
        next: () => {
          this.getVaccines();
          this.isActivateConfirmationModalOpen = false; // Cerrar modal de confirmación
        },
        error: (err) => {
          console.error('Error activating vaccine:', err);
        }
      });
    }
  }

  // Abrir modal para agregar
  openModal(): void {
    this.isEditMode = false;
    this.VaccineForm = { id: 0, nameVaccine: '', typeVaccine: '', description: '', manufacturingDate: '', expirationDate: '', price: '', stock: '', active: 'A' };
    this.isModalOpen = true;
  }

  // Abrir modal para editar
  editVaccineDetails(vaccine: Vaccine): void {
    this.isEditMode = true;
    this.VaccineForm = { ...vaccine };
    this.isModalOpen = true;
  }

  // Cerrar modal
  closeModal(): void {
    this.isModalOpen = false;
    this.isValidationErrorModalOpen = false; // Cerrar modal de errores
  }

  // Agregar una vacuna
  addVaccine(): void {
    if (this.validateForm()) {
      if (this.VaccineForm.id === 0) {
        this.VaccineForm.id = undefined;
      }

      this.vaccineService.createVaccine(this.VaccineForm).subscribe({
        next: () => {
          this.isConfirmationModalOpen = true; // Abrir modal de confirmación
          this.getVaccines(); 
          this.closeModal();
        },
        error: (err) => {
          console.error('Error adding vaccine:', err);
        }
      });
    }
  }

  // Confirmar la actualización de una vacuna
  confirmUpdateVaccine(): void {
    if (this.validateForm()) {
      this.isEditConfirmationModalOpen = true; // Abrir modal de confirmación de edición
    }
  }

  // Manejar la respuesta de la confirmación de edición
  handleEditConfirmation(response: boolean): void {
    if (response) {
      if (this.VaccineForm.id) {
        this.vaccineService.updateVaccine(this.VaccineForm.id, this.VaccineForm).subscribe({
          next: () => {
            this.getVaccines();
            this.closeModal();
            this.isEditConfirmationModalOpen = false; // Cerrar modal de confirmación
          },
          error: (err) => {
            console.error('Error updating vaccine:', err);
          }
        });
      }
    } else {
      this.isEditConfirmationModalOpen = false; // Cerrar modal si se cancela
    }
  }
}
