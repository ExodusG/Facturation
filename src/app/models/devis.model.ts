import {Groupe} from "./groupe.model";

export class Devis {

  groupes:Groupe[]

  constructor(groupe:Groupe[]) {
    this.groupes=groupe;
  }

  addGroupe(groupe:Groupe){
    this.groupes.push(groupe);
  }

  deleteGroupe(groupe: Groupe){
    this.groupes=this.groupes.filter((u)=>u !== groupe);
  }

  get total():number{
    return this.groupes.reduce((total, groupe) => total + groupe.total, 0);
  }

  get tva() :number {
    return this.total *0.077;
  }

  get totalTTC() :number{
    return this.total-this.tva;
  }
}
