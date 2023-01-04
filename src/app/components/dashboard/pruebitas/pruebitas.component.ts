import { Component, ElementRef, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/components/shared/carrito.service';
import { Product } from '../productos2/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pruebitas',
  templateUrl: './pruebitas.component.html',
  styleUrls: ['./pruebitas.component.css']

})
export class PruebitasComponent implements OnInit {

  items!: Product[];
  total!: number;
  form: FormGroup;
  compras: any[]=[];

  constructor(private carritoService: CarritoService,private modalService: NgbModal,private http: HttpClient) {
    this.form = new FormGroup({
      cliente: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      calle_1: new FormControl('', Validators.required),
      calle_2: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      total: new FormControl(),
      quantity: new FormControl(),
    });

   }

  ngOnInit() {
    this.items = this.carritoService.getCart();
    this.total = this.items.reduce((a, b) => a + b.price * b.quantity, 0);
  }

  updatePrice(item: Product) {
    this.total -= item.price * item.quantity;
    item.newprice = item.price * item.quantity;
    this.total = this.items.reduce((a, b) => a + b.price * b.quantity, 0);

  }

  removeFromCart(item: Product) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
    this.total = this.items.reduce((a, b) => a + b.price * b.quantity, 0);
    this.carritoService.removeFromCart(item);

  }


}

