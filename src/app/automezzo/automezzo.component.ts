import { ConfirmDialogModel, ConfirmModalComponent } from './../modal/confirm-modal/confirm-modal.component';
import { TipoAutomezzoService } from './../common/services/tipo-automezzo.service';
import { TipoAutomezzo } from './../models/tipoAutomezzo';
import { EditAutomezzoComponent } from './edit-automezzo/edit-automezzo.component';
import { Automezzo } from './../models/automezzo';
import { Filiale } from './../models/filiale';
import { Component, OnInit, ViewChild, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { AutomezzoService } from './../common/services/automezzo.service';
import { FilialeService } from './../common/services/filiale.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-automezzo',
  templateUrl: './automezzo.component.html',
  styleUrls: ['./automezzo.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0'})), // added 'collapsed, void' for matSort error
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')), // added whole line for matSort error
    ]),
  ],
})
export class AutomezzoComponent implements OnInit, AfterViewInit {

  expandedElement: Automezzo | null;
  automezzi: Automezzo[];
  filiali: Filiale[];
  tipoAutomezzo: TipoAutomezzo[];
  displayedColumns: string[] = ['tagMezzo', 'targa', 'marcaModello', 'filiale', 'kmOre', 'action'];
  dataSource = new MatTableDataSource<Automezzo>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  filterControl = new FormControl('');
  filter = '';
  myplaceHolder = 'CERCA AUTOMEZZO';
  filterValues = {
    nome: ''
  };
  constructor(public dialog: MatDialog, private automezzoService: AutomezzoService, private filialeService: FilialeService,
              private tipoAutomezzoService: TipoAutomezzoService) {
    this.dataSource = new MatTableDataSource(this.automezzi);
    this.dataSource.filterPredicate = this.tableFilter();
  }
  ngAfterViewInit(): any {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.getFiliali();
    this.getTipoAutomezzo();
    this.getAutomezzi();
    this.filterControl.valueChanges
      .subscribe(
        name => {
          this.filter = name;
          this.filterValues.nome = name;
          this.dataSource.filter = JSON.stringify(this.filterValues).toLowerCase();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        }
      );
  }
  getFiliali(): void {
    this.filialeService.getFiliali()
    .subscribe(filiali => this.filiali = filiali);
  }
  getTipoAutomezzo(): void {
    this.tipoAutomezzoService.getTipoAutomezzo()
    .subscribe(tipoAutomezzo => this.tipoAutomezzo = tipoAutomezzo);
  }
  getAutomezzi(): void {
    this.automezzoService.getAutomezzi()
    .subscribe(automezzi => {
      this.automezzi = automezzi;
      this.automezzi.forEach(auto => {
        if (auto.marcaModello === null) {
          auto.marcaModello = '';
        }
      });
      this.automezzi.map(
        cont => {
            cont.filiale = this.filiali.find(filiale => filiale.id === cont.filialeId)?.nomeFiliale as string;
            cont.tipoAutomezzo = this.tipoAutomezzo.find(tipoAutomezzo => tipoAutomezzo.id === cont.tipoAutomezzoId)
            ?.tipoAutomezzo as string;
          }
        );
      this.dataSource.data = this.automezzi;
      this.dataSource.filterPredicate = this.tableFilter();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  tableFilter(): (data: any, filter: string) => boolean {
    const filterFunction = (data: any, filter: string): boolean => {
        const searchTerms = JSON.parse(filter);
        // const nomecognome = data.nome + ' ' + data.cognome;
        // const cognomenome = data.cognome + ' ' + data.nome;
        console.log(data);
        return  (data.tagMezzo.toString().toLowerCase().indexOf(searchTerms.nome) !== -1
          || data.targa.toLowerCase().indexOf(searchTerms.nome) !== -1
          || data.filiale.toLowerCase().indexOf(searchTerms.nome) !== -1
          || data.marcaModello.toLowerCase().indexOf(searchTerms.nome) !== -1);
      };
    return filterFunction;
  }
  resetPaging(): void {
    this.paginator.pageIndex = 0; // on sort reset Paging - disabled (removed TableSort from automezzo.module)
  }
  clear(): void {
    this.filterControl.reset('');
    this.filter = '';
  }
  checkPlaceHolder(): void {
    if (this.myplaceHolder) {
      this.myplaceHolder = '';
      return;
    } else {
      this.myplaceHolder = 'CERCA AUTOMEZZO';
      return;
    }
  }
  onAllUserPaginateChange(event: any): void {
    const matTable = document.getElementById('tableMezzo');
    if (matTable !== null) {
      matTable.scrollIntoView({behavior: 'smooth' });
    }
  }
  updateAutomezzo(automezzo: Automezzo): void {
    const dialogRef = this.dialog.open(EditAutomezzoComponent, {
      // disableClose: true,
      // panelClass: 'login-dialog-container', // to hide padding on login form - added padding : 0 on gloabal styles.css
      width: '500px',
      height: '440px',
      data: automezzo
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // this.updateContact(result);
        }
    });
  }
  deleteAutomezzo(automezzo: Automezzo): void {

    const message = `Sei sicuro di voler cancellare automezzo ` + automezzo.targa + `?`;

    const dialogData = new ConfirmDialogModel('Elimina automezzo', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      // disableClose: true,
      // panelClass: 'login-dialog-container', // to hide padding on login form - added padding : 0 on gloabal styles.css
      // width: '500px',
      // height: '440px',
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(result);
          // this.updateContact(result);
        }
    });
  }
  onScroll(event: Event): void {
    console.log('here i am');
  }
}
