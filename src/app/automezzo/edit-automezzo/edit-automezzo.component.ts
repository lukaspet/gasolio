import { TipoAutomezzo } from './../../models/tipoAutomezzo';
import { Automezzo } from './../../models/automezzo';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-automezzo',
  templateUrl: './edit-automezzo.component.html',
  styleUrls: ['./edit-automezzo.component.scss']
})
export class EditAutomezzoComponent implements OnInit {

  editAutomezzoForm: FormGroup;
  tipoAutomezzo: TipoAutomezzo[];

  constructor(public dialogRef: MatDialogRef<EditAutomezzoComponent>, @Inject(MAT_DIALOG_DATA) public data: Automezzo,
              private fb: FormBuilder) {
                this.editAutomezzoForm = this.fb.group({
                  id: [''],
                  tagMezzo: ['', Validators.required],
                  targa: ['', Validators.required],
                  marcaModello: ['', Validators.required],
                  tipoAutomezzoId: [''],
                  tipoAutomezzo: [''],
                  cellulare: [''],
                  filialeId: [''],
                  email: ['', Validators.email],
                  ruoloId: [''],
                  accise: [''],
                  fringeBenefit: [''],
                });
               }

  ngOnInit(): void {
  }
  onConfirm(): void {
    // Close the dialog
    this.dialogRef.close(true);
  }
  onDismiss(): void {
    // Close the dialog
    this.dialogRef.close(false);
  }

}
