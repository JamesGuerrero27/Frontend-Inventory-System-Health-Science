import {SelectionModel} from '@angular/cdk/collections';
import {Component, Query} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { Product, State } from 'src/app/models/product';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { NotificationsComponent } from 'src/app/@theme/notifications/notifications.component'


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

  displayedColumns: string[] = ['select','options', 'code', 'name', 'brand', 'type','cost', 'provider', 'storage'];
  dataSource = new MatTableDataSource<Product>(PRODUCT_DATA);
  selection = new SelectionModel<Product>(true, []);

  //Data de prueba de Autocompletados combo box
states: State[] = [
  {
    name: 'Arkansas',
    population: '2.978M',
    // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
    flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
  },
  {
    name: 'California',
    population: '39.14M',
    // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
    flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
  },
  {
    name: 'Florida',
    population: '20.27M',
    // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
    flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
  },
  {
    name: 'Texas',
    population: '27.47M',
    // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
    flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
  }
];

  constructor(private _notification:NotificationsComponent) {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.states.slice())
      );
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

  // instancias para los autocompleados
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
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