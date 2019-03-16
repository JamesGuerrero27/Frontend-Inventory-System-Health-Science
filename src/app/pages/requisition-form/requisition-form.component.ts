import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product, _Storage } from 'src/app/models/product';
import { Requisition } from 'src/app/models/requisition';
import { RequisitionService } from 'src/app/services/requisition.service';
import { NotificationsComponent } from 'src/app/@theme/notifications/notifications.component';

@Component({
  selector: 'app-requisition-form',
  templateUrl: './requisition-form.component.html',
  styleUrls: ['./requisition-form.component.scss'],
  providers: [NotificationsComponent]
})
export class RequisitionFormComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  requisitionFormGroup: FormGroup;
  Contador: number;
  requisitionArr: [];

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  _product:Array<Product>;
  _storage: _Storage[];
  _requisition: Array<Requisition>;
  _newRequisition: Requisition;

  public openWindowOf: string;

  constructor(
    private _notification:NotificationsComponent,
    private _formBuilder: FormBuilder, 
    private _productService:ProductService, 
    private _requisitionService: RequisitionService
  ) {}

  ngOnInit() {
       this.initDataFormRequisition(); 
       this.getProducts();
       this.getStorage();
  }

  initDataFormRequisition () {
    // GENERAR FECHA AUTOMATICA
    let d = new Date();
    let date = d.getFullYear() + "-" + (d.getMonth() +1) + "-" + d.getDate() ;

    let idRequisition: number = 1;
    this.requisitionFormGroup = this._formBuilder.group({
      requisitionId: [idRequisition, Validators.required],
      requistionDate: [date, Validators.required],
      class: ['', Validators.required],
      reqPracticeName: ['', Validators.required],
      section: ['', Validators.required],
      storageId: ['', Validators.required],      
      classHour: ['', Validators.required],
      practiceDate: ['', Validators.required],
      requisitionDetails: this._formBuilder.array([ this.addproductFormGroup()])  
    });
  }

  addproductFormGroup(): FormGroup {  
    return this._formBuilder.group({  
      Quantity: ['', Validators.required],
      ProductId: ['', Validators.required],
      observation: ['', Validators.required]
    });  
  } 

  // AGREGAR NUEVA LINEA PARA LA LISTA DE PRODUCTOS
  addNewLineProduct(): void {  
    (<FormArray>this.requisitionFormGroup.get('requisitionDetails')).push(this.addproductFormGroup());  
  }  

  // PERMITE ELEGIR QUE VENTANA DESEO MOSTRAR EN EL FRONT
  openTypeWindow (type: string, code:string): void {
    this.openWindowOf = type;
    //let btnAdd = document.getElementById('add');
  }

  // OBTENER TODOS LOS PRODUCTOS
  getProducts() {
    this._productService.getProducts()
      .subscribe((data : Product[]) => {
          console.log('PRODUCT SERVICE', data);
          return this._product = data;
      });
  }

  // OBTENER TODAS LAS BODEGAS
  getStorage(){
    return this._productService.getStorages()
    .subscribe((data : _Storage[]) => {
      console.log('Storages SERVICE', data);
      return this._storage = data;
    });
  }
 // PREPARAR LA NUEVA REQUISICION
  createRequisition():void{ 
    this._newRequisition = new Requisition;
  }


  onCreateRequisition() : void{
    debugger
    this._newRequisition = this.requisitionFormGroup.value;
    console.log("Imprimiendo DATA del FORM", this._newRequisition);
    this._requisitionService.createRequisition(this._newRequisition)
      .subscribe((data : Requisition ) =>{
        console.log('Suucess Create Requisition');
        this.openTypeWindow('', '');
        this._notification.notificationOpen('success', 'success!', 'Requisicion se enviado con exito!!!');
        //this.getRequisition();
      }, error => console.log("Upps => "+ error));
  }

  saveData(): void {
    debugger
    var data:any = this.requisitionFormGroup.value;
    console.log(data)
  }
}


