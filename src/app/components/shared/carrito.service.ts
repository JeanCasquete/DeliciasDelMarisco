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
  currentDate!:string;
  currentTime!: string;




  constructor(private afs: AngularFirestore) { }

  getCart(): Product[] {
    return this.cart;
  }

  addToCart(product: Product) {
    const cart = this.cart.find(i => i.name === product.name);
    if (cart) {
      cart.price = cart.price 
    } else {
      this.cart.push({...product, quantity: 1, price: product.price});
      this.count++;
      this.count$.next(this.count);
      this.total += product.price;
      this.total$.next(this.total); 

    }
  }

  getCount(): number {
    return this.count;
  }


    updatePrice(products: Product) {
      this.total -= products.price * products.quantity;
      products.newprice = products.price * products.quantity;
      this.total = this.cart.reduce((a, b) => a + b.price * b.quantity, 0);
      this.total$.next(this.total); 
    }
  
    removeFromCart(products: Product) {
      const index = this.cart.indexOf(products);
      if (index > -1) {
        this.cart.splice(index, 1);
      }
      this.total = this.cart.reduce((a, b) => a + b.price * b.quantity, 0);
      this.count--;
      this.count$.next(this.count);
      this.total$.next(this.total); 
    }

    getTotal(): number {
      return this.total;
    }

    



  eliminarCompra(id: string) {
    this.afs.doc(`compras/${id}`).delete();
  } 



  procesarCompra(nombre: string, correo: string, calle_1: string, calle_2: string, ciudad: string, productos: any[], total: number) {
    // Crea un objeto con los datos del formulario y el array de productos
    const now = new Date();
    this.currentDate = now.toLocaleDateString();
    this.currentTime = now.toLocaleTimeString();
    const compra = {
      nombre: nombre,
      correo: correo,
      calle_1: calle_1,
      calle_2: calle_2,
      ciudad: ciudad,
      productos: productos,
      total: total,
      fecha: this.currentDate,
      hora: this.currentTime,
    };

    // Agrega el documento a la colección "compras" de la base de datos
    this.afs.collection('compras').add(compra);
  }
  getCompras(): Observable<any[]> {
    // Obtiene los documentos de la colección "compras"
    return this.afs.collection('compras').snapshotChanges();
  }

  getComprasPorEmail(email: string): Observable<any[]> {
    return this.afs.collection('compras', ref => ref.where('correo', '==', email)).snapshotChanges();
  }
   




}
