import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Ligne} from "../models/ligne.model";
import {DialogNameComponent} from "../dialog-name/dialog-name.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {Groupe} from "../models/groupe.model";
import {animate, state, style, transition, trigger} from "@angular/animations";



@Component({
  selector: 'app-sous-groupe',
  templateUrl: './sous-groupe.component.html',
  styleUrls: ['./sous-groupe.component.css'],
  animations: [
    trigger('ligneExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms 50ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SousGroupeComponent implements OnChanges, OnInit{
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  show:boolean=false;
  collapsedElements: Groupe[] = [];

  data2: MatTableDataSource<Groupe> = new MatTableDataSource<Groupe>();
  displayedColumns: string[] = ["designation", "qte", "unite", "pu", "total","remove","add"];
  @Input() sousGroupes!: Groupe[];
  @Output() sousGroupe =new EventEmitter<Groupe>();
  private designation: string="";

  constructor(public dialog: MatDialog) {
  }
  delete(sousGroupe : Groupe){
    let newData=this.data2.data;
    newData=newData.filter((u)=>u !== sousGroupe);
    this.data2.data=newData;
    this.sousGroupe.emit(sousGroupe);
  }
  deleteLigne(ligne: Ligne,sousGroupe:Groupe){
    sousGroupe.deleteLigne(ligne);
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
        this.data2.data=this.data2.data.filter((u)=>u !== sousGroupe);
        sousGroupe.addLigne(new Ligne(result,3,"",50));
        let newData = [...this.data2.data];

        newData.push(sousGroupe)
        this.data2.data = newData
      }

    });
  }
  addSousGroupe(groupe:Groupe){
    const dialogRef = this.dialog.open(DialogNameComponent, {
      data: this.designation
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        this.data2.data=this.data2.data.filter((u)=>u !== groupe);
        groupe.pushSousGroupe(new Groupe(result,[],[]));
        let newData = [...this.data2.data];

        newData.push(groupe)
        this.data2.data = newData
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
  ngOnInit(): void {
    //this.data.data=this.sousGroupes;
    this.data2.data=this.sousGroupes;
  }
  showElement(){
    this.show=! this.show;
  }
  toggleCollapse(sousGroupe: Groupe) {
    const index = this.collapsedElements.indexOf(sousGroupe);
    if (index > -1) {
      this.collapsedElements.splice(index, 1);
    } else {
      this.collapsedElements.push(sousGroupe);
    }
  }
}
