import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Groupe} from "./models/groupe.model";
import {Ligne} from "./models/ligne.model";
import {DialogNameComponent} from "./dialog-name/dialog-name.component";
import {MatDialog} from "@angular/material/dialog";
import {Devis} from "./models/devis.model";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'facturation';

  data2:Groupe[]=[new Groupe("Groupe 1", [
    new Groupe("Sous-groupe 1", [ new Groupe("Sous-groupe 56", [],[
      new Ligne("Voiture",1, "Unité", 100),
      new Ligne("Iphone",2, "Unité", 200),
    ])],[
      new Ligne("Voiture",1, "Unité", 100),
      new Ligne("Iphone",2, "Unité", 200),
    ]),
    new Groupe("Sous-groupe 2",[], [
      new Ligne("Cable",1, "Unité", 100),
      new Ligne("Voiture",2, "Unité", 200),
    ]),
  ],[new Ligne("Voiture",2, "Unité", 200)]),
    new Groupe("Groupe 2", [
      new Groupe("Sous-groupe 1", [],[
        new Ligne("Voiture",1, "Unité", 100),
        new Ligne("Voiture",2, "Unité", 200),
      ]),
    ],[])
  ];
  devis=new Devis(this.data2);
  private designation: string="";
  constructor(public dialog: MatDialog) {
  }
  ngOnInit() {
  }

  deleteGroupe(groupe:Groupe){
    this.devis.deleteGroupe(groupe);
  }
  addGroupe(){
    const dialogRef = this.dialog.open(DialogNameComponent, {
      data: this.designation
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        let newData = [...this.data2];
        let groupe:Groupe=new Groupe(result,[],[]);
        newData.push(groupe)
        this.data2 = newData
        this.devis.addGroupe(groupe);
      }
    });

  }
}

