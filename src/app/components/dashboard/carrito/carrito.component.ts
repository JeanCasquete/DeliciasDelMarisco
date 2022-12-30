import { Component } from '@angular/core';
import { CarritoService } from 'src/app/components/shared/carrito.service';
import { Product } from '../productos2/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  products: Product[] = [];
  total = 0;

  constructor(private carritoService: CarritoService) { }

  ngOnInit() {
    this.products = this.carritoService.getCart();
    this.total = this.products.reduce((acc, product) => acc + product.price, 0);

    }

    
}
