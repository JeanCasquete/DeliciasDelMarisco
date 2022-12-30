import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Product } from '../productos2/product';
import { map, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CarritoService } from 'src/app/components/shared/carrito.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  products: Observable<Product[]> = new Observable<Product[]>();
  count: number = 0;


  constructor(private firestore: AngularFirestore,private carritoService: CarritoService) { }
  ngOnInit() {
    this.products = this.firestore.collection('encebollado').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        return data;
      }))
    );
  }


  addToCart(product: Product) {
    this.carritoService.addToCart(product)
    
  }

  ngOnChanges(): void {
    // Actualiza el valor del contador cada vez que cambie
    this.count = this.carritoService.getCount();
  }

}

