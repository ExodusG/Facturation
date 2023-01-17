import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Groupe} from "./models/groupe.model";
import {Ligne} from "./models/ligne.model";
import {SousGroupe} from "./models/sous-groupe.model";
import {DialogNameComponent} from "./dialog-name/dialog-name.component";
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
  title = 'facturation';
  displayedColumns: string[] = ["designation", "qte", "unite", "pu", "total","remove","add"];
  /*form:FormGroup;*/
  data: MatTableDataSource<Groupe> = new MatTableDataSource<Groupe>([new Groupe("Groupe 1", [
      new SousGroupe("Sous-groupe 1", [
        new Ligne("Voiture",1, "Unité", 100),
        new Ligne("Iphone",2, "Unité", 200),
      ]),
      new SousGroupe("Sous-groupe 2", [
        new Ligne("Cable",1, "Unité", 100),
        new Ligne("Voiture",2, "Unité", 200),
      ]),
    ]),
    new Groupe("Groupe 2", [
      new SousGroupe("Sous-groupe 1", [
        new Ligne("Voiture",1, "Unité", 100),
        new Ligne("Voiture",2, "Unité", 200),
      ]),
    ])
  ]);
  private designation: string="";
  constructor(public dialog: MatDialog) {
  }
  ngOnInit() {
   /* this.form=this.formBuilder.group({

    })*/
  }

  remove(element : Groupe){
    this.data.data=this.data.data.filter((u)=>u !== element);

  }

  deleteSousGroupe(sousGroupe : SousGroupe,element:Groupe){
    element.deleteSousGroupe(sousGroupe);
  }

  addGroupe(){
    const dialogRef = this.dialog.open(DialogNameComponent, {
      data: this.designation
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let newData = [...this.data.data];
      newData.push(new Groupe(result,[]))
      this.data.data = newData
      console.log(this.data.data);
    });

  }

  addSousGroupe(groupe:Groupe){
    const dialogRef = this.dialog.open(DialogNameComponent, {
      data: this.designation
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.data.data=this.data.data.filter((u)=>u !== groupe);
      groupe.pushSousGroupe(new SousGroupe(result,[]));
      let newData = [...this.data.data];

      newData.push(groupe)
      this.data.data = newData
      console.log(this.data.data);

    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}

