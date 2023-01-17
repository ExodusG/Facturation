import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {SousGroupe} from "../models/sous-groupe.model";
import {Ligne} from "../models/ligne.model";



@Component({
  selector: 'app-sous-groupe',
  templateUrl: './sous-groupe.component.html',
  styleUrls: ['./sous-groupe.component.css']
})
export class SousGroupeComponent{
  displayedColumns: string[] = ["designation", "qte", "unite", "pu", "total","remove"];
  @Input() sousGroupes!: SousGroupe[];
  @Output() sousGroupe =new EventEmitter<SousGroupe>();


  delete(sousGroupe : SousGroupe){
    this.sousGroupes=this.sousGroupes.filter((u)=>u !== sousGroupe);
    this.sousGroupe.emit(sousGroupe);
  }
  deleteLigne(ligne: Ligne,sousGroupe:SousGroupe){
    sousGroupe.deleteLigne(ligne);
  }
}
