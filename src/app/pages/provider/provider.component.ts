import { ProviderService } from './../../services/provider.service';
import { Provider } from './../../models/provider';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl } from '@angular/forms';
import { NotificationsComponent } from 'src/app/@theme/notifications/notifications.component';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
  providers: [NotificationsComponent]

})
export class ProviderComponent implements OnInit {
  public openWindowOf: string;
  public isActive: string;
  public _provider: Array<Provider>;
  private _newProvider: Provider;

  // Trabajando con tablas
  public dataSource: any = [];
  displayedColumns: string[] = ['select', 'options', 'Nombre', 'RTN', 'CorreoElectronico', 'Telefono1', 'Telefono2', 'Contacto'];
  public selection = new SelectionModel<Provider>(true, []);

  providerForm = new FormGroup({
    providerName: new FormControl(''),
    providerRtn: new FormControl(''),
    providerPhone1: new FormControl(''),
    providerPhone2: new FormControl(''),
    providerEmail: new FormControl(''),
    providerContact: new FormControl('')

  });
  constructor(private _notification: NotificationsComponent, private _providerService: ProviderService) { }

  ngOnInit() {
    this.getProvider();
  }

  getProvider(): void {
    this._providerService.getProvider()
   .subscribe((data: Provider[]) => {
    console.log('PROVIDE SERVICE', data);
    this.dataSource = new MatTableDataSource<Provider>(data);
    return this._provider = data;
 });
}
createUser(): void {
 this._newProvider = new Provider;
}
onCreateProvider(): void {
  this._newProvider = this.providerForm.value;
  console.log('Imprimiendo DATA del FORM', this._newProvider);
  this._providerService.createProvider(this._newProvider)
    .subscribe((data: Provider ) => {
      console.log('Suceess Create Provider');
      this.openTypeWindow('');
      this._notification.notificationOpen('success', 'success!', 'Proveedor creado con exito');
      this.getProvider();
    }, error => console.log('error ' + error));
}
openTypeWindow (type: string): void {
  const btnAdd = document.getElementById('add');
  const btnfilter = document.getElementById('filter');

  if (type === 'create') {
     btnAdd.classList.add('active');
     btnfilter.classList.remove('active');
     this.createUser();
  } else if (type === 'filter') {
    btnAdd.classList.remove('active');
    btnfilter.classList.add('active');
  } else {
    btnAdd.classList.remove('active');
    btnfilter.classList.remove('active');
  }
  this.openWindowOf = type;
}
 /** Si el número de elementos seleccionados coincide con el número total de filas. */
 isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}

masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}
saveItem() {
  this.openTypeWindow('');
  this._notification.notificationOpen('success', 'success!', 'El proveedor se almacenado con exito');
}

editItem() {
  this.openTypeWindow('');
  this._notification.notificationOpen('success', 'success!', 'El proveedor se editado con exito');
}

onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.providerForm.value);
}
}
