import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent  {
  @Input() title?: string;
  @Input() message?: string;
  @Input() status: 'success' | 'danger' | 'warning' | 'info';
  @Input() show: boolean;
  @Output() closed = new EventEmitter();

  close() {
    this.closed.emit();
  }
}
