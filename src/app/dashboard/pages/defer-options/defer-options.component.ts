import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Food } from './model/food';
import { FoodServiceService } from './service/food-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FoodInsert } from './model/food_insert';
import { FormsModule } from '@angular/forms';
import { FoodUpdate } from './model/food_update';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './defer-options.component.html',
  styles: ``
})
export default class DeferOptionsComponent implements OnInit {
  isModalOpen = false;
  isModalEdit = false;
  isModalDeactivate = false;
  isModalRestore = false;
  foodActive: Food[] = [];
  foodInactive: Food[] = [];
  showInactive: boolean = false; // Estado del checkbox
  newFood: FoodInsert = {} as FoodInsert;
  foodToEdit: FoodUpdate = {} as FoodUpdate;
  foodIdToDeactivate: number | null = null;
  foodIdToRestore: number | null = null;

  constructor(private foodService: FoodServiceService) { }

  ngOnInit(): void {
    this.getFoods();
  }

  getFoods(): void {
    if (this.showInactive) {
      this.foodService.getInactiveFoods().subscribe({
        next: (data: Food[]) => {
          this.foodInactive = data; // Cargar alimentos inactivos
        },
        error: (err) => {
          console.error('Error al obtener alimentos inactivos:', err);
        }
      });
    } else {
      this.foodService.getActiveFoods().subscribe({
        next: (data: Food[]) => {
          this.foodActive = data; // Cargar alimentos activos
        },
        error: (err) => {
          console.error('Error al obtener alimentos activos:', err);
        }
      });
    }
  }

  toggleFoodList(): void {
    this.showInactive = !this.showInactive;
    this.getFoods();
  }

  addFood(): void {
    this.foodService.addNewFood(this.newFood).subscribe({
      next: (data) => {
        console.log('Alimento agregado:', data);
        this.showInactive = false;
        this.getFoods();
        this.resetForm();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error al agregar alimento:', err);
        if (err.status === 500) {
          console.error('Error del servidor:', err.message);
        }
      }
    });
  }

  DatosFood(food: Food): void {
    this.isModalEdit = true;
    this.foodToEdit = {
      id: food.id,
      foodType: food.foodType,
      foodBrand: food.foodBrand,
      unitMeasure: food.unitMeasure,
      packaging: food.packaging
    };
  }

  updateAlimento(): void {
    if (this.foodToEdit) {
      this.foodService.updateFood(this.foodToEdit.id, this.foodToEdit).subscribe({
        next: (data) => {
          console.log('Alimento actualizado:', data);
          this.showInactive = false;
          this.getFoods();
          this.isModalEdit = false;
        },
        error: (err) => {
          console.error('Error al actualizar alimento:', err);
        }
      });
    }
  }

  openModalDeactivate(id: number): void {
    this.foodIdToDeactivate = id;
    this.isModalDeactivate = true;
  }

  deactivateFood(): void {
    if (this.foodIdToDeactivate !== null) {
      console.log(`Desactivando alimento con ID: ${this.foodIdToDeactivate}`);
      this.foodService.deactivateFood(this.foodIdToDeactivate).subscribe({
        next: (data) => {
          console.log('Respuesta del servidor:', data);
          this.getFoods();
          this.isModalDeactivate = false;
        },
        error: (err) => {
          console.error('Error al desactivar alimento:', err);
          console.error('Detalles del error:', err.error);
        }
      });
    }
  }

  openModalRestore(id: number): void {
    this.foodIdToRestore = id;
    this.isModalRestore = true;
  }

  restoreFood(): void {
    if (this.foodIdToRestore !== null) {
      console.log(`Restaurando alimento con ID: ${this.foodIdToRestore}`);
      this.foodService.reactivateFood(this.foodIdToRestore).subscribe({
        next: (data) => {
          console.log('Respuesta del servidor:', data);
          this.getFoods(); 
          this.isModalRestore = false; 
        },
        error: (err) => {
          console.error('Error al restaurar alimento:', err);
          console.error('Detalles del error:', err.error);
        }
      });
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  resetForm(): void {
    this.newFood = {} as FoodInsert;
    this.foodToEdit = {} as FoodUpdate;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.isModalEdit = false;
    this.isModalDeactivate = false;
    this.isModalRestore = false;
    this.foodIdToDeactivate = null;
    this.foodIdToRestore = null;
  }
}
