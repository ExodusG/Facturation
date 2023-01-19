import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Groupe} from "../models/groupe.model";
import {MatTableDataSource} from "@angular/material/table";
import {Ligne} from "../models/ligne.model";
import {MatDialog} from "@angular/material/dialog";
import {DialogNameComponent} from "../dialog-name/dialog-name.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [
    trigger('ligneExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('100ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('sousGroupeExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms 50ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit, OnChanges{
  showAddIndex : number = -1;
  collapsedElements: Groupe[] = [];
  displayedColumns: string[] = ["designation", "qte", "unite", "pu", "total","action"];
  data: MatTableDataSource<Groupe> = new MatTableDataSource<Groupe>();

  @Input() groupes?: Groupe[];
  @Input() sousGroupes ?: Groupe[];
  @Output() sousGroupeEmit =new EventEmitter<Groupe>();
  private designation: string="";
  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.data.data = this.groupes ?? this.sousGroupes ?? [];
  }

  deleteSousGroupe(sousGroupe : Groupe,element:Groupe){
    element.deleteSousGroupe(sousGroupe);
  }

  remove(element : Groupe){
    this.data.data=this.data.data.filter((u)=>u !== element);
    this.sousGroupeEmit.emit(element);
  }

  deleteLigne(ligne: Ligne,groupe:Groupe){
    groupe.deleteLigne(ligne);
  }
  showElement(index:number){
    this.showAddIndex = this.showAddIndex === index ? -1 : index;
  }

  addLigne(sousGroupe: Groupe){
    const dialogRef = this.dialog.open(DialogNameComponent, {
      data: this.designation
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if(result){
        this.data.data=this.data.data.filter((u)=>u !== sousGroupe);
        sousGroupe.addLigne(new Ligne(result,3,"",50));
        let newData = [...this.data.data];

        newData.push(sousGroupe)
        this.data.data = newData
      }

    });
  }

  add(type:string, sousGroupe:Groupe,index:number){
    if(type==="ligne") {
      this.addLigne(sousGroupe);
    }else if(type==="groupe"){
      this.addSousGroupe(sousGroupe);
    }
    this.showElement(index);
  }
  addSousGroupe(groupe:Groupe){
    const dialogRef = this.dialog.open(DialogNameComponent, {
      data: this.designation
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.data.data=this.data.data.filter((u)=>u !== groupe);
        groupe.pushSousGroupe(new Groupe(result,[],[]));
        let newData = [...this.data.data];

        newData.push(groupe)
        this.data.data = newData
      }
    });
  }

  toggleCollapse(groupeChiffrage: Groupe) {
    const index = this.collapsedElements.indexOf(groupeChiffrage);
    if (index > -1) {
      this.collapsedElements.splice(index, 1);
    } else {
      this.collapsedElements.push(groupeChiffrage);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.data.data = this.groupes ?? this.sousGroupes ?? [];
  }
}
