import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, timeout, catchError, retry } from 'rxjs';

// Interfaces
export interface DatosEnvio {
  nombreGrupo: string;
  fechaInicio: string;
  fechaFin: string;
  personas: Persona[];
  correos: string[];
}

export interface Persona {
  nombre: string;
  correo: string;
}

export interface RespuestaServidor {
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

export interface ErrorResponse {
  error: string;
  message: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private readonly API_BASE_URL = (window as any).process?.env?.['API_URL'] || '';
  private readonly API_ENDPOINTS = {
    procesar: '/api/procesar',
    health: '/api/health',
    test: '/api/test'
  };

  private readonly HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    timeout: 300000 // 5 minutos para procesamiento largo
  };

  constructor(private http: HttpClient) {}

  /**
   * Envía los datos del formulario al backend para procesamiento
   */
  enviarDatos(datos: DatosEnvio): Observable<RespuestaServidor> {
    const url = `${this.API_BASE_URL}${this.API_ENDPOINTS.procesar}`;
    
    return this.http.post<RespuestaServidor>(url, datos, this.HTTP_OPTIONS)
      .pipe(
        timeout(this.HTTP_OPTIONS.timeout),
        retry({ count: 1, delay: 1000 }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Verifica el estado de salud del servidor
   */
  verificarSalud(): Observable<any> {
    const url = `${this.API_BASE_URL}${this.API_ENDPOINTS.health}`;
    
    return this.http.get(url)
      .pipe(
        timeout(10000), // 10 segundos para health check
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Prueba la conectividad básica con el servidor
   */
  probarConexion(): Observable<any> {
    const url = `${this.API_BASE_URL}${this.API_ENDPOINTS.test}`;
    
    return this.http.get(url)
      .pipe(
        timeout(5000), // 5 segundos para test básico
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Maneja errores HTTP de manera centralizada
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error inesperado';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 0:
          errorMessage = 'No se puede conectar con el servidor. Verifica que el backend esté ejecutándose.';
          break;
        case 400:
          errorMessage = error.error?.message || 'Datos de entrada inválidos';
          break;
        case 401:
          errorMessage = 'Error de autenticación. Verifica las credenciales.';
          break;
        case 403:
          errorMessage = 'No tienes permisos para realizar esta acción.';
          break;
        case 404:
          errorMessage = 'El recurso solicitado no fue encontrado.';
          break;
        case 408:
          errorMessage = 'La solicitud tardó demasiado en completarse.';
          break;
        case 429:
          errorMessage = 'Demasiadas solicitudes. Intenta nuevamente en unos minutos.';
          break;
        case 500:
          errorMessage = error.error?.message || 'Error interno del servidor';
          break;
        case 502:
          errorMessage = 'Error de comunicación con servicios externos.';
          break;
        case 503:
          errorMessage = 'El servicio no está disponible temporalmente.';
          break;
        default:
          errorMessage = `Error del servidor: ${error.status} - ${error.statusText}`;
      }
    }

    console.error('Error en FormularioService:', {
      status: error.status,
      message: errorMessage,
      error: error
    });

    return throwError(() => new Error(errorMessage));
  }

  /**
   * Valida que los datos de entrada sean correctos antes de enviarlos
   */
  validarDatos(datos: DatosEnvio): { esValido: boolean; errores: string[] } {
    const errores: string[] = [];

    if (!datos.nombreGrupo?.trim()) {
      errores.push('El nombre del grupo es requerido');
    }

    if (!datos.fechaInicio) {
      errores.push('La fecha de inicio es requerida');
    }

    if (!datos.fechaFin) {
      errores.push('La fecha de fin es requerida');
    }

    if (datos.fechaInicio && datos.fechaFin) {
      const inicio = new Date(datos.fechaInicio);
      const fin = new Date(datos.fechaFin);
      
      if (inicio > fin) {
        errores.push('La fecha de inicio no puede ser posterior a la fecha de fin');
      }
    }

    if (!datos.personas || datos.personas.length === 0) {
      errores.push('Debe seleccionar al menos una persona');
    }

    if (!datos.correos || datos.correos.length === 0) {
      errores.push('Debe proporcionar al menos un correo electrónico');
    }

    // Validar formato de correos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    datos.correos?.forEach((correo) => {
      if (!emailRegex.test(correo)) {
        errores.push(`El correo "${correo}" no tiene un formato válido`);
      }
    });

    return {
      esValido: errores.length === 0,
      errores
    };
  }

  /**
   * Obtiene la URL completa para descargar un archivo
   */
  obtenerUrlDescarga(fileUrl: string): string {
    if (!fileUrl) {
      throw new Error('URL del archivo no proporcionada');
    }
    
    // Si ya es una URL completa, la devolvemos tal como está
    if (fileUrl.startsWith('http://') || fileUrl.startsWith('https://')) {
      return fileUrl;
    }
    
    // Si es una ruta relativa, la combinamos con la URL base
    return `${this.API_BASE_URL}${fileUrl}`;
  }
}