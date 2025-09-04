# SlackTime Frontend

Frontend Angular para el sistema de análisis de tiempo en Slack y reuniones de Microsoft Teams.

## 🚀 Características

- Interfaz moderna y responsiva con Angular Material
- Formularios reactivos con validación en tiempo real
- Integración con el backend SlackTime
- Descarga automática de reportes Excel
- Manejo robusto de errores y estados de carga
- Diseño responsive para móviles y desktop

## 📋 Prerrequisitos

- Node.js >= 18.0.0
- npm o yarn
- Angular CLI >= 20.0.0
- Backend SlackTime ejecutándose en `http://localhost:3001`

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd FrontSlack
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar el backend**
   Asegúrate de que el backend esté ejecutándose en `http://localhost:3001` o modifica la URL en `src/app/formulario/formulario.service.ts`.

## 🚀 Uso

### Desarrollo
```bash
npm start
```
La aplicación estará disponible en `http://localhost:4200`

### Construcción para producción
```bash
npm run build
```

### Ejecutar tests
```bash
npm test
```

### Ejecutar tests con coverage
```bash
npm run test:coverage
```

## 🏗️ Estructura del Proyecto

```
FrontSlack/
├── src/
│   ├── app/
│   │   ├── formulario/
│   │   │   ├── formulario.component.ts    # Componente principal
│   │   │   ├── formulario.component.html  # Template
│   │   │   ├── formulario.component.css   # Estilos
│   │   │   └── formulario.service.ts      # Servicio de API
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   └── app.routes.ts
│   ├── styles.css
│   └── index.html
├── package.json
├── angular.json
└── README.md
```

## 🎨 Componentes

### FormularioComponent
Componente principal que maneja:
- Selección de grupos y personas
- Configuración de fechas
- Envío de datos al backend
- Descarga de archivos generados
- Manejo de errores y estados de carga

### FormularioService
Servicio que maneja:
- Comunicación con el backend
- Validación de datos
- Manejo de errores HTTP
- Timeouts y reintentos

## 📱 Características de UX

- **Interfaz intuitiva**: Diseño limpio y fácil de usar
- **Validación en tiempo real**: Feedback inmediato sobre errores
- **Estados de carga**: Indicadores visuales durante el procesamiento
- **Mensajes informativos**: Notificaciones claras sobre el estado del proceso
- **Responsive design**: Funciona perfectamente en móviles y desktop

## 🔧 Configuración

### Variables de entorno
Puedes configurar la URL del backend modificando `API_BASE_URL` en `formulario.service.ts`:

```typescript
private readonly API_BASE_URL = 'http://localhost:3001';
```

### Estilos personalizados
Los estilos están en `formulario.component.css` y pueden ser personalizados fácilmente.

## 🐛 Solución de Problemas

### Error de conexión con el backend
- Verifica que el backend esté ejecutándose en el puerto correcto
- Revisa la consola del navegador para errores de CORS
- Asegúrate de que la URL del backend sea correcta

### Error de compilación
- Verifica que todas las dependencias estén instaladas
- Ejecuta `npm install` para reinstalar dependencias
- Limpia la caché con `npm run clean`

### Error de descarga de archivos
- Verifica que el backend esté generando archivos correctamente
- Revisa los permisos del navegador para descargas
- Asegúrate de que no haya bloqueadores de popups activos

## 🧪 Testing

### Tests unitarios
```bash
npm test
```

### Tests e2e
```bash
npm run e2e
```

## 📦 Build

### Desarrollo
```bash
ng build
```

### Producción
```bash
ng build --configuration production
```

## 🚀 Despliegue

### Build para producción
```bash
npm run build
```

Los archivos generados estarán en `dist/front-slack/`

### Servidor de archivos estáticos
Puedes usar cualquier servidor web estático como:
- nginx
- Apache
- Node.js con express-static
- GitHub Pages
- Netlify
- Vercel

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Autores

- **SlackTime Team** - *Desarrollo inicial*

## 🙏 Agradecimientos

- Angular Team por el framework
- Angular Material por los componentes UI
- RxJS por la programación reactiva
