import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/components/shared/carrito.service';
import { Product } from 'src/app/components/dashboard/productos2/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-admin-compras',
  templateUrl: './admin-compras.component.html',
  styleUrls: ['./admin-compras.component.css']
})
export class AdminComprasComponent implements OnInit {
  compras: any[]=[];
 constructor(private carritoService: CarritoService) {}  
  ngOnInit(){
    this.getCompras().subscribe(compras => {
      this.compras = compras;
    });
    
  }

  getCompras(): Observable<any[]> {
    return this.carritoService.getCompras().pipe(map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return { id, ...data };
    })));
  }
   

  
eliminarCompra(id: string) {
  this.carritoService.eliminarCompra(id);
}
  
  


}
