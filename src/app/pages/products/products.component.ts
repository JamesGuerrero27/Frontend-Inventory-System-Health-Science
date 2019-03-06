import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Product, Brand } from 'src/app/models/product';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith, debounceTime} from 'rxjs/operators';
import { NotificationsComponent } from 'src/app/@theme/notifications/notifications.component'
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NotificationsComponent]
})

export class ProductsComponent implements OnInit {
  public openWindowOf: string;
  public isActive: string;
  public _product:Array<Product>;
  private _brand:Brand[];
  private _newProduct : Product;

  // Trabajando con tablas
  public dataSource:any = [];
  displayedColumns: string[] = ['select','options', 'code', 'name', 'brand', 'type','cost', 'provider', 'storage'];
  public selection = new SelectionModel<Product>(true, []);

  // Instancias para los autocompleados
  public filteredBrand: Observable<Brand[]>;
  brandCtrl = new FormControl();

  private status: boolean = false;

  //Instanciando Formulario Reactivo
  productForm = new FormGroup({
    productCode: new FormControl(''),
    productName: new FormControl(''),
    productBrandId: new FormControl(''),
    typeProductId: new FormControl(''),
    productCost: new FormControl(''),
    providersId: new FormControl(''),
    storageId: new FormControl('')
  });


  constructor(private _notification:NotificationsComponent, private _productService:ProductService) {

  }


  ngOnInit() {
    this.getBrands();
    this.getProducts();
    console.log('this._brand ngOnInit',this._brand);
    
  }

  getBrands():void{
    this._productService.getBrands()
    .subscribe((data : Brand[]) => {
      console.log('BRANDS SERVICE', data)
      this.detectChangesComboBox(data);
      console.log('this.filteredBrand SERVICE',this.filteredBrand);
      return this._brand = data; 
    }, error => console.log("error " + error));
  }

  detectChangesComboBox(data){
    this.filteredBrand = this.brandCtrl.valueChanges
    .pipe(
      startWith(''),
      map(brand => brand ? this._filterComboBox(brand) : data.slice())
    );
  }

  private _filterComboBox(value: string): Brand[] {
    const filterValue = value.toLowerCase();
     console.log(filterValue)
    return this._brand.filter(brand => brand.productBrandName.toLowerCase().indexOf(filterValue) === 0);
  } 

   getProducts() {
    this._productService.getProducts()
    .subscribe((data : Product[]) => {
       console.log('PRODUCT SERVICE', data);
       this.dataSource = new MatTableDataSource<Product>(data);
       return this._product = data;
    });
   }

   createUser():void{ 
     debugger
    this._newProduct = new Product;
  }

  onCreateProduct() : void{
    debugger
    this._newProduct = this.productForm.value;
    console.log("Imprimiendo DATA del FORM", this._newProduct);
    this._productService.createProduct(this._newProduct)
      .subscribe((data : Product ) =>{
        debugger
        console.log('Suucess Create Product');
      }, error => console.log("error "+ error));
  }

  /** Si el número de elementos seleccionados coincide con el número total de filas. */
   isAllSelected() {
     const numSelected = this.selection.selected.length;
     const numRows = this.dataSource.data.length;
     return numSelected === numRows;
   }

  /** Selecciona todas las filas si no están todas seleccionadas; de lo contrario, la selección se limpia. */
   masterToggle() {
     this.isAllSelected() ?
         this.selection.clear() :
         this.dataSource.data.forEach(row => this.selection.select(row));
   }



  openTypeWindow (type: string): void {
    let btnAdd = document.getElementById('add');
    let btnfilter = document.getElementById('filter');

    if (type=='create'){
       btnAdd.classList.add('active');
       btnfilter.classList.remove('active');
       this.createUser();
    }else if (type=='filter'){
      btnAdd.classList.remove('active');
      btnfilter.classList.add('active');
    }else{
      btnAdd.classList.remove('active');
      btnfilter.classList.remove('active');
    }
    this.openWindowOf = type;
  }

  saveItem(){
    this.openTypeWindow('');
    this._notification.notificationOpen('success', 'success!', 'El producto se almacenado con exito');
  }

  editItem(){
    this.openTypeWindow('');
    this._notification.notificationOpen('success', 'success!', 'El producto se editado con exito');
  }

  onSubmit() {
    debugger
    // TODO: Use EventEmitter with form value
    console.warn(this.productForm.value);
  }
  
}
