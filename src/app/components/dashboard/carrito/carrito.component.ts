import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { CarritoService } from 'src/app/components/shared/carrito.service';
import { Product } from '../productos2/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  products: Product[] = [];
  total = 0;
  form: FormGroup;
  compras: any[]=[];



  @ViewChild('ModalContent') ModalContent?: TemplateRef<any>;
  @ViewChild('mapContent') mapContent?: TemplateRef<any>;
  selectedLocation: { lat: number, lng: number } = { lat: 0, lng: 0 };
  

  constructor(private carritoService: CarritoService,private modalService: NgbModal) {
    this.form = new FormGroup({
      cliente: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      total: new FormControl(),
    });

   }

  ngOnInit() {
    this.products = this.carritoService.getCart();
 
        // Suscríbete al Observable y asigna los datos a la variable compras
        this.carritoService.getCompras().subscribe(compras => {
          this.compras = compras;
        });
    this.total = this.products.reduce((acc, product) => acc + product.price, 0);
    this.carritoService.total$.subscribe(total => {
      this.total = total;
    });
    }


    openModal() {
      const modalRef = this.modalService.open(this.mapContent, { centered: true });
     
    }

 
    
    
    



    removeProduct(product: Product) {
      this.carritoService.removeFromCart(product);

    }

    procesarCompra() {
      if (this.form && this.form.valid) {
        // Obtiene los valores del formulario a través del objeto FormControl
        const nombre = this.form.value.cliente;
        const correo = this.form.value.correo;
        const total = this.total; // Obtiene el total del carrito a través del servicio
        console.log(nombre,correo)
        if (nombre && correo && total >=1) {
          // Llama al método procesarCompra() del servicio y pasa los datos del formulario y el array de productos
          this.carritoService.procesarCompra(nombre, correo, this.products, total);
          this.modalService.open(this.ModalContent);

          
        } else {
          console.error('Error: el nombre o el correo son inválidos o no agregaste objetos al carrito');
        }
      }
    }
 
  
}
