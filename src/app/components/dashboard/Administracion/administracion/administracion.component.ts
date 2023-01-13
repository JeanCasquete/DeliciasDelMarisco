import { Component } from '@angular/core';
import { trigger, state,transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css'],
  animations: [
    trigger('menuState', [
      state('open', style({
        width: '250px'
      })),
      state('closed', style({
        width: '0'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class AdministracionComponent {
  isExpanded = false;

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}
