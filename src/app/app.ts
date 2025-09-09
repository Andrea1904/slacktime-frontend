import { Component } from '@angular/core';
import { FormularioComponent } from './formulario/formulario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormularioComponent],
  template: `
    <app-formulario></app-formulario>
  `,
  styles: []
})
export class App {
  title = 'SlackTime';
}
