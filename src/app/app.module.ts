import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';  // Para mat-form-field y mat-error
import { MatInputModule } from '@angular/material/input';  // Para mat-input
import { MatButtonModule } from '@angular/material/button';  // Para mat-button
import { MatDatepickerModule } from '@angular/material/datepicker';  // Para mat-datepicker
import { MatNativeDateModule } from '@angular/material/core';  // Para matNativeDate
import { MatSelectModule } from '@angular/material/select';  // Para mat-select
import { MatOptionModule } from '@angular/material/core';  // Para mat-option

// import { FormularioComponent } from './formulario/formulario.component';  // Importamos FormularioComponent

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,  // Para formularios reactivos
    MatFormFieldModule,  // Para mat-form-field
    MatInputModule,      // Para matInput
    MatButtonModule,     // Para matButton
    MatDatepickerModule, // Para mat-datepicker
    MatNativeDateModule, // Para matNativeDateModule
    MatSelectModule,     // Para mat-select
    MatOptionModule,     // Para mat-option
  ],
  providers: [],
  // No declaramos FormularioComponent en "declarations", ya que es standalone
  bootstrap: []  // Aquí no usamos bootstrapApplication en un módulo, porque es standalone
})
export class AppModule { }
