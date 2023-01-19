import {Component, Input} from '@angular/core';
import {Devis} from "../models/devis.model";

@Component({
  selector: 'app-montant',
  templateUrl: './montant.component.html',
  styleUrls: ['./montant.component.scss']
})
export class MontantComponent {
  @Input() devis !:Devis;



}
