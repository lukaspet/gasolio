import { Filiale } from './../../models/filiale';
import { FilialeService } from './../../common/services/filiale.service';
import { TipoAutomezzoService } from './../../common/services/tipo-automezzo.service';
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
  tipoAutomezzo: TipoAutomezzo[];filiali: Filiale[];

  constructor(public dialogRef: MatDialogRef<EditAutomezzoComponent>, @Inject(MAT_DIALOG_DATA) public data: Automezzo,
              private fb: FormBuilder, private filialeService: FilialeService, private tipoAutomezzoService: TipoAutomezzoService)
  {
    this.editAutomezzoForm = this.fb.group({
      id: [''],
      tagMezzo: ['', Validators.required],
      targa: ['', Validators.required],
      marcaModello: ['', Validators.required],
      tipoAutomezzoId: [''],
      tipoAutomezzo: [''],
      kmOre: [''],
      frequenzaTagliando: [''],
      kmUltimoTagliando: [''],
      scadenzaBollo: [''],
      scadenzaAssicurazione: [''],
      scadenzaCollaudo: [''],
      scadenzaTachigrafo: [''],
      filialeId: [''],
      filiale: [''],
      kmOreUltimoRifrnimento: [''],
      fringeBenefit: [''],
      accise: [''],
    });
  }
  ngOnInit(): void {
    this.getTipoAutomezzo();
    this.getFiliali();
  }
  getTipoAutomezzo(): void {
    this.tipoAutomezzoService.getTipoAutomezzo()
    .subscribe(tipoAutomezzo => this.tipoAutomezzo = tipoAutomezzo);
  }
  getFiliali(): void {
    this.filialeService.getFiliali()
    .subscribe(filiali => this.filiali = filiali);
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
