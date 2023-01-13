import { Component, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CarritoService } from 'src/app/components/shared/carrito.service';
import { Product } from '../productos2/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  dataUser: any;
  username: string | undefined;
  email: string | null | undefined;
  compritas: any[]=[];


  constructor(private car: CarritoService,private modalService: NgbModal,
    private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private router: Router)
     {

    }
 
    ngOnInit() {
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          console.log("estas logueado");   
          this.dataUser = user;
          this.email = user.email;
          if(this.email) {
            this.getCompras(this.email).subscribe(compras => {
              this.compritas = compras;
            });          }
        } else {
          this.router.navigate(["dashboard"])
        }
      });
    }

    getCompras(email: string): Observable<any[]> {
      return this.car.getComprasPorEmail(email).pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
    }
     
    
  

}
