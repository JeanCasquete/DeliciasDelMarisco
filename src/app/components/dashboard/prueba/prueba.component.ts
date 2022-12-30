import { Component } from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent {

        // Creamos una lista de productos en el carrito
        products = [
          { name: 'Producto 1', price: 9.99 },
          { name: 'Producto 2', price: 19.99 },
          { name: 'Producto 3', price: 29.99 }
        ];
      
        // Creamos una variable para almacenar la información del producto que se está agregando
        product: { name: string, price: number } = { name: '', price: 0 };
      
        // Creamos una función para eliminar un producto de la lista
        removeProduct(product: { name: string, price: number }) {
          this.products = this.products.filter(p => p !== product);
        }
      
        // Creamos una función para agregar un producto a la lista
        addProduct() {
          this.products.push(this.product);
          // Limpiamos los campos del formulario
          this.product = { name: '', price: 0 };
        }
      
        // Creamos una función para calcular el total del carrito
        getTotal() {
          return this.products.reduce((acc, product) => acc + product.price, 0);
        }
    
  

}
