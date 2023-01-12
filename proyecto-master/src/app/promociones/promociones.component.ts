import { Component } from '@angular/core';
import DocumentJson from "src/assets/graduados.json";

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent {

  cosos: any[]=[]; // Declaración de la variable "items"
  solicitud: any = DocumentJson;

  constructor() {
    this.getXMLData();
  }

  async getXMLData() {
    const response = await fetch('../assets/graduados.xml');
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'text/xml');
    this.cosos = Array.from(xml.querySelectorAll('graduado')).map(cosos => {
      return {
        id: cosos.getAttribute('id'),
        label: cosos.textContent
        
      };
    });
  }
}
