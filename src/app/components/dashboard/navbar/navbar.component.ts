import { Component, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { CarritoService } from 'src/app/components/shared/carrito.service';
import { Product } from '../productos2/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {


  count: number=0;
  public count$: Observable<number> = new Observable<number>();
  products: Product[]=[];  // Declare an array to hold the products in the cart
  total = 0;


  constructor(private car: CarritoService,private modalService: NgbModal) { }
  ngOnInit() {
    this.products = this.car.getCart();
    this.count$ = this.car.count$;
    this.count$.subscribe(count => this.count = count);
    this.car.total$.subscribe(total => {
      this.total = total;
    });
    

  }

  removeProduct(product: Product) {
    this.car.removeFromCart(product);
  }


  openModal(ModalContent: TemplateRef<any>) {
    this.modalService.open(ModalContent);
  }

}
