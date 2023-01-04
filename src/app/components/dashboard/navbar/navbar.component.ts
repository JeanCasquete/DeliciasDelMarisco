import { Component, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { CarritoService } from 'src/app/components/shared/carrito.service';
import { Product } from '../productos2/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {AngularFireAuth} from '@angular/fire/compat/auth';


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

  dataUser: any;
  username: string | undefined;


  constructor(private car: CarritoService,private modalService: NgbModal,
    private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) { }
  ngOnInit() {
    this.products = this.car.getCart();
    this.car.count$.subscribe(count => this.count = count);
    this.car.total$.subscribe(total => this.total = total);
    this.afAuth.currentUser.then(user => {
      if (user && user) {
        this.dataUser = user;
        this.afDatabase.object<{ username: string }>('users/' + user.uid).valueChanges().subscribe(userData => {
          if (userData) {
            this.username = userData.username; // Asignar el nombre de usuario a la variable username
            
          }
        });
      } else {
      }
    });

  }

  updatePrice(products: Product) {

    this.car.updatePrice(products);

  }

  removeFromCart(products: Product) {
  this.car.removeFromCart(products);
}
}
