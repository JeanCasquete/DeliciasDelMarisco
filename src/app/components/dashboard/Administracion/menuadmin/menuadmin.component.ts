import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from 'src/app/components/shared/empleado.service';


@Component({
  selector: 'app-menuadmin',
  templateUrl: './menuadmin.component.html',
  styleUrls: ['./menuadmin.component.css']
})
export class MenuadminComponent implements OnInit {
  constructor(private empleadito: EmpleadoService) {}
  
  ngOnInit() {
    this.empleadito.verificarempleado();
  }
  
}
