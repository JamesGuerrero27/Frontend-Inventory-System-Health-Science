import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

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

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.requisitionFormGroup = this._formBuilder.group({
      requisitionNumber: ['', Validators.required],
      requisitionDate: ['', Validators.required],
      Assignature: ['', Validators.required],
      PracticType: ['', Validators.required],
      teacherName: ['', Validators.required],
      secction: ['', Validators.required],
      classTime: ['', Validators.required],
      DateToBePerformed: ['', Validators.required],
    });

    

  }
  }


