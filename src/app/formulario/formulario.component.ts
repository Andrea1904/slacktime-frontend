import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from './formulario.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Subject, takeUntil } from 'rxjs';

// Interfaces
interface Grupo {
  nombre: string;
  correo: string;
}

interface DatosEnvio {
  nombreGrupo: string;
  fechaInicio: string;
  fechaFin: string;
  personas: Grupo[];
  correos: string[];
}

interface RespuestaServidor {
  success: boolean;
  fileUrl: string;
  stats?: {
    totalCorreos: number;
    procesadosExitosamente: number;
    diasHabiles: number;
    fechaInicio: string;
    fechaFin: string;
  };
}

// Configuración de grupos
const GRUPOS_CONFIG = {
  grupos: ['Synecta', 'Mavericks', 'Analítica', 'Swat', 'Migration Force', 'Apache', 'Tráfico', 'Exploradores', 'Rangers', 'Design System', 'Rocket', 'Mejoramiento'],
  
  nombresPorGrupo: {
    'Synecta': [
      { nombre: 'Daniel Agudelo', correo: 'daniel_agudelo@satrack.com' },
      { nombre: 'Andrés Zapata', correo: 'andres_zapata@satrack.com' },
      { nombre: 'German Carranza', correo: 'german_carranza@satrack.com' },
      { nombre: 'John Freddy', correo: 'john_saldarriaga@satrack.com' },
      { nombre: 'Julieth Gil', correo: 'julieth_gil@satrack.com' },
      { nombre: 'Katherine Gutierrez', correo: 'katherine_Gutierrez@satrack.com' },
      { nombre: 'Nathalia Meneses', correo: 'nathalia_meneses@satrack.com' },
      { nombre: 'Julián Pinto', correo: 'julian_pinto@satrack.com' },
    ],
    'Mavericks': [
      { nombre: "Alexander Rincón", correo: "alexander_rincon@satrack.com" },
      { nombre: "Valentina", correo: "valentina_soto@satrack.com" },
      { nombre: "Jhony", correo: "jhony_angulo@satrack.com" },
      { nombre: "Claudia", correo: "claudia_restrepo@satrack.com" },
      { nombre: "Cristian Daniel", correo: "daniel_gutierrez@satrack.com" },
      { nombre: "Miguel", correo: "miguel_hernandez@satrack.com" },
      { nombre: "Hugo Castrillon", correo: "hugo_castrillon@satrack.com" },
    ],
    'Analítica': [
      { nombre: "Manuela", correo: "manuela_jaramillo@satrack.com" },
      { nombre: "Farley", correo: "farley_berruecos@satrack.com" },
      { nombre: "Jhos", correo: "jhos_hurtado@satrack.com" },
      { nombre: "Sebastián", correo: "sebastian_duque@satrack.com" },
      { nombre: "Hugo Castrillon", correo: "hugo_castrillon@satrack.com" }
    ],
    'Swat': [
      { nombre: "Andrea Ferro", correo: "andrea_ferro@satrack.com" },
      { nombre: "Daniel Camilo Vargas", correo: "daniel_vargas@satrack.com" },
      { nombre: "Jhon Alzate Macea", correo: "jhon_alzate@satrack.com" },
      { nombre: "Juan Pablo Rios", correo: "juan_rios@satrack.com" },
      { nombre: "Jeimar Villota", correo: "jeimar_villota@satrack.com" },
      { nombre: "Ferney Osorio", correo: "ferney_osorio@satrack.com" }
    ],
    'Migration Force': [
      { nombre: "Jaiver Vargas Mendez", correo: "jaiver_vargas@satrack.com" },
      { nombre: "Wilmar Andres Munera", correo: "wilmar_munera@satrack.com" },
      { nombre: "Edgar Gustavo Navarro Renza", correo: "gustavo_navarro@satrack.com" },
      { nombre: "Carlos Waldo Serna Imbachi", correo: "waldo_serna@satrack.com" },
      { nombre: "Alexander Guillermo Hernandez Montenegro", correo: "alexander_hernandez@satrack.com" },
      { nombre: "Laura Maria Echeverri Pajon", correo: "laura_echeverri@satrack.com" }
    ],
    'Apache': [
      { nombre: "Cristian Augusto Bedoya Cadena", correo: "cristian_bedoya@satrack.com" },
      { nombre: "Sebastian Londoño Ramirez", correo: "sebastian_londono@satrack.com" },
      { nombre: "Daniel Albeiro Riveros Quiroz", correo: "daniel_riveros@satrack.com" },
      { nombre: "Juan Camilo Marin Valencia", correo: "camilo_marin@satrack.com" },
      { nombre: "Camilo Andres Moran López", correo: "camilo_moran@satrack.com" },
    ],
    'Tráfico': [
      { nombre: "Esteban Pelaez", correo: "jhon_pelaez@satrack.com" },
      { nombre: "Herson García", correo: "herson_garcia@satrack.com" },
      { nombre: "Leidy Ramírez", correo: "leidy_ramirez@satrack.com" },
      { nombre: "Haminton Joven", correo: "haminton_joven@satrack.com" },
      { nombre: "Percy Lucas", correo: "percy_lucas@satrack.com" },
      { nombre: "Andrea Ferro", correo: "andrea_ferro@satrack.com" }
    ],
    'Exploradores': [
      { nombre: "Jose David R", correo: "jose_restrepo@satrack.com" },
      { nombre: "Jhon Quintero", correo: "john_quintero@satrack.com" },
      { nombre: "Diego Puentes", correo: "diego_puentes@satrack.com" },
      { nombre: "Manuel Inciarte", correo: "manuel_inciarte@satrack.com" },
      { nombre: "Cesar Castro", correo: "cesar_castro@satrack.com" },
      { nombre: "Laura Echeverri", correo: "laura_echeverri@satrack.com" },
    ],
    'Rangers': [
      { nombre: "Jaiver Vargas", correo: "jaiver_vargas@satrack.com" },
      { nombre: "Luis F Pinto", correo: "felipe_pinto@satrack.com" },
      { nombre: "Anderson Gallo", correo: "anderson_gallo@satrack.com" },
      { nombre: "Julian Pinto", correo: "julian_pinto@satrack.com" },
      { nombre: "Alex Hernandez", correo: "alexander_hernandez@satrack.com" },
    ],
    'Design System': [
      { nombre: "Miguel Hernandez", correo: "miguel_hernandez@satrack.com" },
      { nombre: "Camilo Bellnavis", correo: "camilo_bellnavis@satrack.com" },
    ],
    'Rocket': [
      { nombre: "Frank Florez", correo: "Frank.Florez@satrack.com" },
      { nombre: "Juan Esteban Piedrahita", correo: "juan.piedrahita@satrack.com" },
      { nombre: "Jennipher Barrera", correo: "jennipher.barrera@satrack.com" },
      { nombre: "Juan Pablo Barrera", correo: "juan.barrerao@satrack.com" },
      { nombre: "Hernan Galeano", correo: "Andres.Galeano@satrack.com" },
      { nombre: "Carlos Loaiza", correo: "Carlos.Loaiza@satrack.com" },
      { nombre: "Cristhian Martinez", correo: "Cristhian.Martinez@satrack.com" },
      { nombre: "Carolina Arcila", correo: "Carolina.Arcila@satrack.com" },
      { nombre: "Andres Gomez", correo: "Andres.Gomez@satrack.com" },
      { nombre: "Yamel Puentes", correo: "andres.puentes@satrack.com" },
      { nombre: "Camilo Martinez", correo: "camilo.martinez@satrack.com" }
    ],
    'Mejoramiento': [
      { nombre: "Johan A", correo: "johan.aristizabal@satrack.com" },
      { nombre: "Jhohan", correo: "Jhohan.Vasquez@satrack.com" },
      { nombre: "Diego Q", correo: "diego.quirama@satrack.com" },
      { nombre: "Diego M", correo: "Diego.Mesa@satrack.com" },
      { nombre: "Jorge", correo: "alexander.lancheros@satrack.com" },
      { nombre: "Luisfer", correo: "Fernando.Aguirre@satrack.com" },
    ]
  }
};

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit, OnDestroy {
  formulario: FormGroup;
  grupos: string[] = GRUPOS_CONFIG.grupos;
  nombresPorGrupo: { [key: string]: Grupo[] } = GRUPOS_CONFIG.nombresPorGrupo;
  nombres: Grupo[] = [];
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder, 
    private formularioService: FormularioService,
    private snackBar: MatSnackBar
  ) {
    this.formulario = this.fb.group({
      nombreGrupo: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.setupFormSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupFormSubscriptions(): void {
    this.formulario.get('nombreGrupo')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((grupo: string) => {
        this.nombres = this.nombresPorGrupo[grupo] || [];
      });
  }

  onSubmit(): void {
    if (this.formulario.valid && !this.isLoading) {
      this.isLoading = true;
      
      try {
        const datosEnvio = this.prepararDatosEnvio();
        this.procesarSolicitud(datosEnvio);
      } catch (error) {
        this.handleError('Error al preparar los datos: ' + (error as Error).message);
        this.isLoading = false;
      }
    } else {
      this.mostrarMensaje('Por favor, complete todos los campos requeridos', 'warning');
    }
  }

  private prepararDatosEnvio(): DatosEnvio {
    const formData = this.formulario.value;
    const nombresConCorreos = this.nombres.map(n => ({
      nombre: n.nombre,
      correo: n.correo.trim()
    }));

    const correos = nombresConCorreos.map(persona => persona.correo);

    return {
      nombreGrupo: formData.nombreGrupo,
      fechaInicio: formData.fechaInicio.toISOString(),
      fechaFin: formData.fechaFin.toISOString(),
      personas: nombresConCorreos,
      correos: correos
    };
  }

  private procesarSolicitud(datosEnvio: DatosEnvio): void {
    this.formularioService.enviarDatos(datosEnvio)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: RespuestaServidor) => {
          this.handleSuccess(response);
        },
        error: (error) => {
          this.handleError('Error al procesar la solicitud: ' + (error.error?.message || error.message));
        }
      });
  }

  private handleSuccess(response: RespuestaServidor): void {
    this.isLoading = false;
    
    if (response.success && response.fileUrl) {
      this.descargarArchivo(response.fileUrl);
      
      const stats = response.stats;
      if (stats) {
        this.mostrarMensaje(
          `✅ Procesamiento completado. ${stats.procesadosExitosamente}/${stats.totalCorreos} correos procesados exitosamente.`,
          'success'
        );
      } else {
        this.mostrarMensaje('✅ Archivo generado exitosamente', 'success');
      }
    } else {
      this.mostrarMensaje('Error: No se recibió la URL del archivo', 'error');
    }
  }

  private handleError(message: string): void {
    this.isLoading = false;
    this.mostrarMensaje(message, 'error');
  }

  private descargarArchivo(fileUrl: string): void {
    if (!fileUrl) {
      console.error('La URL del archivo no es válida');
      return;
    }

    try {
      const backendUrl = 'http://localhost:3001';
      const a = document.createElement('a');
      a.href = `${backendUrl}${fileUrl}`;
      
      const fileName = fileUrl.split('/').pop();
      if (fileName) {
        a.download = fileName;
      }

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      this.mostrarMensaje('Error al descargar el archivo', 'error');
    }
  }

  private mostrarMensaje(mensaje: string, tipo: 'success' | 'error' | 'warning' = 'success'): void {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: tipo === 'error' ? 8000 : 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [`snackbar-${tipo}`]
    });
  }

  // Métodos de utilidad para el template
  getFormularioValido(): boolean {
    return this.formulario.valid && !this.isLoading;
  }

  getTotalPersonas(): number {
    return this.nombres.length;
  }

  limpiarFormulario(): void {
    this.formulario.reset();
    this.nombres = [];
  }
}
