import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { SpinnerComponent } from "../spinner-component/spinner-component";

@Component({
  selector: 'app-button-component',
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {

  readonly text = input<string>('');
  readonly disabled = input<any>(false);
  readonly type = input<string>();
  readonly className = input<string>('btn btn-primary');
  readonly loading = input<boolean>(false);
  
  readonly clickEvent = output<void>();

  onClickHandler() {
    if (this.disabled() || this.loading()) return;
    this.clickEvent.emit();
  }

}
