import { Automezzo } from './../../models/automezzo';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-automezzo',
  templateUrl: './edit-automezzo.component.html',
  styleUrls: ['./edit-automezzo.component.scss']
})
export class EditAutomezzoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditAutomezzoComponent>, @Inject(MAT_DIALOG_DATA) public data: Automezzo) { }

  ngOnInit(): void {
  }

}
