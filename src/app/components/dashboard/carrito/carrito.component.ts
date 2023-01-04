import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CarritoService } from 'src/app/components/shared/carrito.service';
import { Product } from '../productos2/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

//Interface de ubicacion
interface GeocodeResponse {
  results: any[];
  status: string;
}


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  products: Product[] = [];
  total = 0;
  form: FormGroup;
  compras: any[]=[];

  @ViewChild('ModalContent') ModalContent?: TemplateRef<any>;
 
  //Datos para guardar la ubicacion
  center: google.maps.LatLngLiteral = {lat: -0.95, lng: -80.72};
  zoom = 15;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPosition: google.maps.LatLngLiteral | null = null;
  street = '';
  city = '';
  country = '';
  @ViewChild('mapContent') mapContent?: TemplateRef<any>;
  

  constructor(private carritoService: CarritoService,private modalService: NgbModal,private http: HttpClient) {
    this.form = new FormGroup({
      cliente: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      calle_1: new FormControl('', Validators.required),
      calle_2: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      total: new FormControl(),

    });

   }

  ngOnInit() {
    this.products = this.carritoService.getCart();
    this.total = this.products.reduce((a, b) => a + b.price * b.quantity, 0);
    this.carritoService.total$.subscribe(total => this.total = total);
    }


    openModal() {
      const modalRef = this.modalService.open(this.mapContent, { centered: true });
     
    }
    
    removeFromCart(products: Product) {
       this.carritoService.removeFromCart(products);
    }



    
    procesarCompra() {
      if (this.form && this.form.valid) {
        // Obtiene los valores del formulario a través del objeto FormControl
        const cliente = this.form.value.cliente;
        const correo = this.form.value.correo;
        const calle_1 = this.form.value.calle_1;
        const calle_2 = this.form.value.calle_2;
        const ciudad = this.form.value.ciudad;


        const total = this.total; // Obtiene el total del carrito a través del servicio
        console.log(cliente,correo,calle_1,calle_2,ciudad)
        if (cliente && correo && total >=1) {
          // Llama al método procesarCompra() del servicio y pasa los datos del formulario y el array de productos
          this.carritoService.procesarCompra(cliente, correo,calle_1,calle_2,ciudad, this.products, total);
          this.modalService.open(this.ModalContent);

          
        } else {
          console.error('Error: el nombre o el correo son inválidos o no agregaste objetos al carrito');
        }
      } else {
        console.log(this.form.controls['cliente'].valid);
console.log(this.form.controls['correo'].valid);
console.log(this.form.controls['calle_1'].valid);
console.log(this.form.controls['calle_2'].valid);
console.log(this.form.controls['ciudad'].valid);
      }
    }

    prueba() {
      console.log("mensaje");
    }

    addMarker(event: google.maps.MapMouseEvent) {
      if (event.latLng) {
        this.markerPosition = event.latLng.toJSON();
        this.getAddress(this.markerPosition);
      }
    }
  
    getAddress(position: google.maps.LatLngLiteral) {
      const API_KEY = 'AIzaSyCUeNoX1-1WV8P5mWKUz8LUwxBWc6XyYoA';
      const lat = position.lat;
      const lng = position.lng;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
  
      this.http.get<GeocodeResponse>(url).subscribe(response => {
        if (response.status === 'OK') {
          const addressComponents = response.results[0].address_components;
  
          for (const component of addressComponents) {
            if (component.types.includes('route')) {
              this.street = component.long_name;
            } else if (component.types.includes('locality')) {
              this.city = component.long_name;
            } else if (component.types.includes('country')) {
              this.country = component.long_name;
            }
          }
  
          console.log(`Street: ${this.street}`);
          console.log(`City: ${this.city}`);
          console.log(`Country: ${this.country}`);
          this.form.controls['calle_1'].setValue(this.street);
          this.form.controls['ciudad'].setValue(this.city);
  
        } else {
          console.error(`Error: ${response.status}`);
        }
      }, error => {
        console.error(error);
      });
    }
 
}
