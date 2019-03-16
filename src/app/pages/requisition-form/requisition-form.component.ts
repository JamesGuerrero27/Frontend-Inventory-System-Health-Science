import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-requisition-form',
  templateUrl: './requisition-form.component.html',
  styleUrls: ['./requisition-form.component.scss'],
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

  constructor(private _formBuilder: FormBuilder, private _productService:ProductService) {
  }

  ngOnInit() {
       this.initDataFormRequisition(); 
       this.getProducts();
  }

  initDataFormRequisition () {
    // GENERAR FECHA AUTOMATICA
    let d = new Date();
    let date = d.getDate() + "/" + (d.getMonth() +1) + "/" + d.getFullYear();

    this.requisitionFormGroup = this._formBuilder.group({
      requisitionNumber: ['1', Validators.required],
      requisitionDate: [date, Validators.required],
      Assignature: ['', Validators.required],
      PracticType: ['', Validators.required],
      teacherName: ['', Validators.required],
      secction: ['', Validators.required],
      classTime: ['', Validators.required],
      DateToBePerformed: ['', Validators.required],
      productFormGroup: this._formBuilder.group({
        quantity: ['', Validators.required],
        description: ['', Validators.required],
        observation: ['', Validators.required]
      })
    });
  }

  getProducts() {
    this._productService.getProducts()
      .subscribe((data : Product[]) => {
          console.log('PRODUCT SERVICE', data);
          return this._product = data;
      });
    }

  saveData(): void {
    var data:any = this.requisitionFormGroup.value;
    console.log(data)
  }
}


