import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message-invalid-component',
  imports: [],
  template: `
    @if (formGroup.get(controlName)?.invalid && formGroup.get(controlName)?.touched) {
      <div class="invalid-message">
        <span> {{ message }} </span>
      </div>
    }
  `,
  styles: `
    .invalid-message {
      color: #ef4444;
      font-size: 12px;
      margin-top: -12px;
      margin-bottom: 16px;
      padding-left: 16px;
    }
  `,
})
export class MessageInvalidComponent {
  // Recibe el FormGroup del formulario padre para mostrar los mensajes de error
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() message!: string;
}
