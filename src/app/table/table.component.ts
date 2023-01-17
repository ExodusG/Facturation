import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
  show:boolean=false;
  collapsedElements: Groupe[] = [];
  displayedColumns: string[] = ["designation", "qte", "unite", "pu", "total","remove","add"];
  data: MatTableDataSource<Groupe> = new MatTableDataSource<Groupe>();
  /*form:FormGroup;*/
  @Input() groupes!: Groupe[];
  private designation: string="";
  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
       this.data.data=this.groupes
    }

  remove(element : Groupe){
    this.data.data=this.data.data.filter((u)=>u !== element);

  }

  deleteLigne(ligne: Ligne,groupe:Groupe){
    groupe.deleteLigne(ligne);
  }
  showElement(){
    this.show=! this.show;
  }
  deleteSousGroupe(sousGroupe : Groupe,element:Groupe){
    element.deleteSousGroupe(sousGroupe);
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

  add(type:string, sousGroupe:Groupe){
    if(type==="ligne") {
      this.addLigne(sousGroupe);
    }else if(type==="groupe"){
      this.addSousGroupe(sousGroupe);
    }
    this.showElement();
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
    this.data.data=this.groupes;
  }
}
