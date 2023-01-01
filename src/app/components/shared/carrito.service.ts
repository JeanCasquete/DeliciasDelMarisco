import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../dashboard/productos2/product';  // Assume you have a Product interface or class
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  cart: Product[] = [];
  total: number=0;
  count: number=0;
  count$: Subject<number> = new Subject<number>();
  total$: Subject<number> = new Subject<number>();


  constructor(private afs: AngularFirestore) { }

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
  procesarCompra(nombre: string, correo: string, productos: any[], total: number) {
    // Crea un objeto con los datos del formulario y el array de productos
    const compra = {
      nombre: nombre,
      correo: correo,
      productos: productos,
      total: total,
    };

    // Agrega el documento a la colección "compras" de la base de datos
    this.afs.collection('compras').add(compra);
  }


  getCompras(): Observable<any[]> {
    // Obtiene los documentos de la colección "compras"
    return this.afs.collection('compras').snapshotChanges();
  }

  eliminarCompra(id: string) {
    this.afs.doc(`compras/${id}`).delete();
  }


}