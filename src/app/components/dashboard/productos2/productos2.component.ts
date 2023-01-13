import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, map, Observable } from 'rxjs';
import { Product } from './product';  // Assume you have a Product interface or class
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { CarritoService } from 'src/app/components/shared/carrito.service';
import { EmpleadoService } from 'src/app/components/shared/empleado.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgZone } from '@angular/core';



@Component({
  selector: 'app-productos2',
  templateUrl: './productos2.component.html',
  styleUrls: ['./productos2.component.css']
})
export class Productos2Component implements OnInit {


  displayedColumns: string[] = ['name', 'imageUrl', 'price','actions'];
  productForm: FormGroup;
  productUpdateForm: FormGroup;

  products: Observable<Product[]>  = new Observable<Product[]>(); 
  selectedFile: File = new File([], '');
  selectedProduct: Product | null = null;

  constructor(private firestore: AngularFirestore,private formBuilder: FormBuilder,
    private storage: AngularFireStorage,private carritoService: CarritoService,public dialog: MatDialog,
    private modalService: NgbModal,private ngZone: NgZone, private empleadito: EmpleadoService) {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.productUpdateForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
    });

  }
  
  ngOnInit() {
    this.empleadito.verificarempleado();
    this.products = this.firestore.collection('encebollado').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }


  addProduct() {
    
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if (this.selectedFile) {
        const filePath = `images/${this.selectedFile.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.selectedFile);
  
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              product.imageUrl = url;
              this.firestore.collection('encebollado').add(product);
            });
          })
        ).subscribe();
      } else {
        this.firestore.collection('encebollado').add(product);
      }
    }
  }

  deleteProduct(productId: string): Promise<void> {
    const productRef = this.firestore.doc(`encebollado/${productId}`);
    return productRef.delete().catch(error => {
      console.error(`Error removing document: ${error}`);
      throw error;  // Rethrow the error so the calling code can handle it
    });
  }

  updateProduct() {
    if (this.productUpdateForm.valid && this.selectedProduct) {  // Añade una comprobación de nulidad
      const product: Product = this.productUpdateForm.value;
      if (this.selectedFile) {
        const filePath = `images/${this.selectedFile.name}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.selectedFile);
    
        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              product.imageUrl = url;
              if (this.selectedProduct && this.selectedProduct.id) {  // Añade una comprobación de nulidad adicional
                const productRef = this.firestore.doc(`encebollado/${this.selectedProduct.id}`);
                this.closeModal();
                productRef.update(product).catch(error => {
                  console.error(`Error updating document: ${error}`);
                  throw error;  // Rethrow the error so the calling code can handle it
                });
              }
            });
          })
        ).subscribe();
      } else {
        if (this.selectedProduct && this.selectedProduct.id) {  // Añade una comprobación de nulidad adicional
          const productRef = this.firestore.doc(`encebollado/${this.selectedProduct.id}`);
          productRef.update(product).catch(error => {
            console.error(`Error updating document: ${error}`);
            throw error;  // Rethrow the error so the calling code can handle it
          });
        }
      }
    }
  }
  

  onImageChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  openUpdateModal(modalContent: TemplateRef<any>, product: Product) {
    this.ngZone.run(() => {
      this.selectedProduct = product;
    });
    this.modalService.open(modalContent);
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}

