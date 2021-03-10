import { Autista } from './../models/autista';
import { Filiale } from './../models/filiale';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AutistaService } from './../common/services/autista.service';
import { FilialeService } from './../common/services/filiale.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-autista',
  templateUrl: './autista.component.html',
  styleUrls: ['./autista.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AutistaComponent implements OnInit, AfterViewInit {
  autisti: Autista[];
  filiali: Filiale[];
  displayedColumns: string[] = ['tesseraAutista', 'nome-cognome', 'filiale'];
  dataSource = new MatTableDataSource<Autista>();
  expandedElement: Autista;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  filterControl = new FormControl('');
  filter = '';
  myplaceHolder = 'CERCA AUTISTA';
  filterValues = {
    nome: ''
  };

  constructor(private autistaService: AutistaService, private filialeService: FilialeService) {
    this.dataSource = new MatTableDataSource(this.autisti);
    this.dataSource.filterPredicate = this.tableFilter();
  }

  ngAfterViewInit(): any {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  tableFilter(): (data: any, filter: string) => boolean {
    const filterFunction = (data: any, filter: string): boolean => {
        const searchTerms = JSON.parse(filter);
        const nomecognome = data.nome + ' ' + data.cognome;
        const cognomenome = data.cognome + ' ' + data.nome;
        console.log(data);
        return  (nomecognome.toLowerCase().indexOf(searchTerms.nome) !== -1
          || cognomenome.toLowerCase().indexOf(searchTerms.nome) !== -1
          || data.filiale.toLowerCase().indexOf(searchTerms.nome) !== -1
          || data.tesseraAutista.toString().toLowerCase().indexOf(searchTerms.nome) !== -1);
      };
    return filterFunction;
  }

  ngOnInit(): void {
    this.getFiliali();
    this.getAutisti();
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
  getAutisti(): void {
    this.autistaService.getAutisti()
    .subscribe(autisti => {
      this.autisti = autisti;
      this.autisti.map(
        cont => {
            cont.filiale = this.filiali.find(filiale => filiale.id === cont.filialeId)?.nomeFiliale as string;
          }
        );
      this.dataSource.data = this.autisti;
      this.dataSource.filterPredicate = this.tableFilter();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
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
      this.myplaceHolder = 'CERCA AUTISTA';
      return;
    }
  }
}
