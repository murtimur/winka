import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './input-component.html',
  styleUrl: './input-component.scss',
})
export class InputComponent {
  readonly label = input<string>('');
  readonly type = input<'text' | 'password' | 'email' | 'number' | 'search'>('text');
  readonly placeholder = input<string>('');
  readonly autofocus = input(false);
  readonly className = input<string>('form-control');

  readonly required = input(false, {
    transform: booleanAttribute,
  });

  readonly disabled = input(false);
  readonly error = input<string>('');
  readonly model = input<string>('');
  readonly id = input<string>(`input-${Math.random().toString(36).slice(2)}`);
  readonly modelChange = output<string>();
  readonly focused = signal(false);
  readonly showPassword = signal(false);
  readonly hasError = computed(() => !!this.error());

  readonly inputType = computed(() => {
    if (this.type() === 'password' && this.showPassword()) {
      return 'text';
    }
    return this.type();
  });

  constructor() {
    effect(() => {
      if (this.error()) {
        this.focused.set(false);
      }
    });
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.modelChange.emit(value);
  }

  onFocus() {
    this.focused.set(true);
  }

  onBlur() {
    this.focused.set(false);
  }

  togglePassword() {
    this.showPassword.update((v) => !v);
  }
}
