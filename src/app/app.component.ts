import {Component, OnInit} from '@angular/core';
import {Groupe} from "./models/groupe.model";
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

  data2:Groupe[]=[];
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

