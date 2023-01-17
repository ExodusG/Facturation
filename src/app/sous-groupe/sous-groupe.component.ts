import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SousGroupe} from "../models/sous-groupe.model";
import {Ligne} from "../models/ligne.model";
import {DialogNameComponent} from "../dialog-name/dialog-name.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {Groupe} from "../models/groupe.model";



@Component({
  selector: 'app-sous-groupe',
  templateUrl: './sous-groupe.component.html',
  styleUrls: ['./sous-groupe.component.css']
})
export class SousGroupeComponent implements OnChanges, OnInit{
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  data: MatTableDataSource<SousGroupe> = new MatTableDataSource<SousGroupe>();
  displayedColumns: string[] = ["designation", "qte", "unite", "pu", "total","remove","add"];
  @Input() sousGroupes!: SousGroupe[];
  @Output() sousGroupe =new EventEmitter<SousGroupe>();
  private designation: string="";

  constructor(public dialog: MatDialog) {
  }
  delete(sousGroupe : SousGroupe){
    let newData=this.data.data;
    newData=newData.filter((u)=>u !== sousGroupe);
    this.data.data=newData;
    this.sousGroupe.emit(sousGroupe);
  }
  deleteLigne(ligne: Ligne,sousGroupe:SousGroupe){
    sousGroupe.deleteLigne(ligne);
  }

  addLigne(sousGroupe: SousGroupe){
    const dialogRef = this.dialog.open(DialogNameComponent, {
      data: this.designation
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //let newSousGroupes = this.sousGroupes;
      //newSousGroupes.push(sousGroupe);
      //sousGroupe.addLigne(new Ligne(this.designation,3,"",50));
      //this.sousGroupes=newSousGroupes;
      this.data.data=this.data.data.filter((u)=>u !== sousGroupe);
      sousGroupe.addLigne(new Ligne(result,3,"",50));
      let newData = [...this.data.data];

      newData.push(sousGroupe)
      this.data.data = newData
      //console.log(this.data.data);

    });
  }

  ngOnInit(): void {
    this.data.data=this.sousGroupes;
  }
}
