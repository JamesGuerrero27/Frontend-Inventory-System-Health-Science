import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Product, Brand, TypeProduct, Providers, _Storage } from 'src/app/models/product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  
  private _newProduct: Product;

  // Trabajando con tablas
  public dataSource:any = [];
  displayedColumns: string[] = ['select','options', 'code', 'name', 'brand', 'type', 'cost', 'provider', 'storage'];
  public selection = new SelectionModel<Product>(true, []);

  // Instancias para los autocompleados
  filteredBrand: Observable<Brand[]>;
  brandCtrl = new FormControl();

  //DECLARANDO E INICIALIZNDO OBJETO FILTERPRODUCT
  private dataProductFiltered:Product;

  _brand: Brand[] = [
  {
    productBrandId: 1,
    productBrandName: "Product1",
    product2s: "string",
  },
  {
    productBrandId: 2,
    productBrandName: "Product2",
    product2s: "string",
  }];

  private status: boolean = false;
  productForm:FormGroup;
  // this.dataProductFiltered.productName || ""

   constructor(private _notification:NotificationsComponent, private _productService:ProductService) {
    this.initFilteredProduct();
    this.initForm('');
    // this.getBrands()
    // .subscribe((data : Brand[]) => {
    //   console.log('BRANDS SERVICE', data)
    //   this.detectChangesComboBox(data);
    //   console.log('this.filteredBrand SERVICE',this.filteredBrand);

    //   this._brand = data; 
    // }, error => console.log("error " + error));

    this.filteredBrand = this.brandCtrl.valueChanges
    .pipe(
      startWith(''),
      map(brand => brand ? this._filterComboBox(brand) : this._brand.slice())
    );

    console.log('BRANDS SERVICE', this.filteredBrand);

    
  }


  ngOnInit() {

  this.getProducts();
  console.log('this._brand ngOnInit',this._brand); 
  }

  initForm( typeRequest:string): void {
    // Variables temp. || 
    let code = typeRequest == "edit" ? this.dataProductFiltered.productCode : '';
    let name = typeRequest == "edit" ? this.dataProductFiltered.productName: '';
    let brand = typeRequest == "edit" ? this.dataProductFiltered.productBrand.productBrandName: '';
    let typeProduct =  typeRequest == "edit" ? this.dataProductFiltered.typeProduct.typeProductName: '';
    let cost =  typeRequest == "edit" ? this.dataProductFiltered.productCost: '';
    let provider = typeRequest == "edit" ?  this.dataProductFiltered.providers.providerName: '';
    let storage =  typeRequest == "edit" ? this.dataProductFiltered.storage.storageDescription: '';
    
    // Instanciando Formulario Reactivo
    this.productForm = new FormGroup({
      productCode: new FormControl(code, Validators.required),
      productName: new FormControl(name, Validators.required),
      brand: new FormControl(brand, Validators.required),
      typeProduct: new FormControl(typeProduct, Validators.required),
      productCost: new FormControl(cost, Validators.required),
      providers: new FormControl(provider, Validators.required),
      storage: new FormControl(storage, Validators.required)
    });
  }

  initFilteredProduct() {
    this.dataProductFiltered = {
      productId: 0,
      options: '',
      productCode: '',
      productName: '',
      productBrand: new Brand,
      typeProduct: new TypeProduct,
      productCost: 0,
      providers: new Providers,
      storage: new _Storage,
    }
  }

  getBrands():Observable<Brand[]>{
    return this._productService.getBrands()
  
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
    this.initForm('');
    this._newProduct = new Product;
  }

  onCreateProduct() : void{
    this._newProduct = this.productForm.value;
    console.log("Imprimiendo DATA del FORM", this._newProduct);
    this._productService.createProduct(this._newProduct)
      .subscribe((data : Product ) =>{
        console.log('Suucess Create Product');
        this.openTypeWindow('', '');
        this._notification.notificationOpen('success', 'success!', 'Producto creado con exito');
        this.getProducts();
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



  openTypeWindow (type: string, code:string): void {
    debugger
    this.openWindowOf = type;
    let btnAdd = document.getElementById('add');
    let btnfilter = document.getElementById('filter');

    if (type=='create'){
       btnAdd.classList.add('active');
       btnfilter.classList.remove('active');
       this.createUser();
    }else if (type=='filter'){
      btnAdd.classList.remove('active');
      btnfilter.classList.add('active');  
    }else if (type=='edit') {
      this.addDataInputForm(code);
    }else{
      btnAdd.classList.remove('active');
      btnfilter.classList.remove('active');
    }

  }

  saveItem(){
    this.openTypeWindow('','');
    this._notification.notificationOpen('success', 'success!', 'El producto se almacenado con exito');
  }

  editItem(){
    this.openTypeWindow('', '');
    this._notification.notificationOpen('success', 'success!', 'El producto se editado con exito');
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.productForm.value);
  }

  addDataInputForm(code) {
        console.log(code);
        this.dataProductFiltered = this._product.filter(p => p.productId == code)[0];
        console.log(this.dataProductFiltered);
        this.initForm('edit');
  }
}
