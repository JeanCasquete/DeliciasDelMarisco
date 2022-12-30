import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../dashboard/productos2/product';  // Assume you have a Product interface or class

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  cart: Product[] = [];
  total: number=0;
  count: number=0;
  count$: Subject<number> = new Subject<number>();
  total$: Subject<number> = new Subject<number>();


  constructor() { }

  getCart(): Product[] {
    return this.cart;
  }
  getCount(): number {
    return this.count;
  }

  addToCart(product: Product) {
    this.cart.push(product);
    this.total += product.price;
    this.count++;
    this.count$.next(this.count);
    this.total$.next(this.total); 
    console.log(this.count,this.total$)

  }

  removeFromCart(product: Product) {
    const index = this.cart.indexOf(product);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.total -= product.price;
      this.count--;
      this.count$.next(this.count);
      this.total$.next(this.total); 
    }
  }
}