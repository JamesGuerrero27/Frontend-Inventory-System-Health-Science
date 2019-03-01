import {SelectionModel} from '@angular/cdk/collections';
import {Component, Query} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Product, State, Brand } from 'src/app/models/product';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { NotificationsComponent } from 'src/app/@theme/notifications/notifications.component'
import { ProductService } from 'src/app/services/product.service';


// Data de prueba de Productos hasta consumir servicios.
const PRODUCT_DATA: Product[] = [
  {options: '', code: 'T61754125', name: 'jeringa', brand: 'ddos', type: 'aguja fina', cost: 500, provider: 'Jsarmiento', storage: 'bodega 1'},
];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NotificationsComponent]
})
export class ProductsComponent {
  public openWindowOf: string;
  public isActive: string;
  private product:Product;
  private  brand:Brand[];

  // instancias para los autocompleados
  brandCtrl  = new FormControl();
  filteredBrand: Observable<Brand[]>;
 
  displayedColumns: string[] = ['select','options', 'code', 'name', 'brand', 'type','cost', 'provider', 'storage'];
  dataSource = new MatTableDataSource<Product>(PRODUCT_DATA);
  selection = new SelectionModel<Product>(true, []);

  constructor(private _notification:NotificationsComponent, private _productService:ProductService) {
    debugger
    this.getBrands();
    debugger
    // this.filteredBrand = this.brandCtrl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(brand => brand ? this._filterComboBox(brand) : this.brand.slice())
    //   );
  }

  private _filterComboBox(value: string): Brand[] {
    const filterValue = value.toLowerCase();

    return this.brand.filter(brand => brand.productBrandName.toLowerCase().indexOf(filterValue) === 0);
  } 

  getBrands():void{
    debugger
    this._productService.getBrands()
    .subscribe((data : Brand) => {
      console.log(data)
      this.brand.push(data);
    }, error => console.log("error " + error));
  }

  /** Si el número de elementos seleccionados coincide con el número total de filas. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
Selecciona todas las filas si no están todas seleccionadas; de lo contrario, la selección se limpia. */
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


}
