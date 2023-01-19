import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ligne} from "../models/ligne.model";


@Component({
  selector: 'app-ligne',
  templateUrl: './ligne.component.html',
  styleUrls: ['./ligne.component.scss']
})
export class LigneComponent {
  displayedColumns: string[] = ["designation", "qte", "unite", "pu", "total","action"];
  @Input() lignes!: Ligne[];
  @Output() ligne=new EventEmitter<Ligne>();
  delete(sousGroupe : Ligne){
    this.lignes=this.lignes.filter((u)=>u !== sousGroupe);
    this.ligne.emit(sousGroupe);
  }
}
