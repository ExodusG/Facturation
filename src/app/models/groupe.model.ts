import {SousGroupe} from "./sous-groupe.model";

export class Groupe {

  designation: string;
  sous_groupes: SousGroupe[];

  constructor(designation: string, sous_groupes: SousGroupe[]) {
    this.designation = designation;
    this.sous_groupes = sous_groupes;
  }

  get total() {
    return this.sous_groupes.reduce((total, sous_groupe) => total + sous_groupe.total, 0);
  }

  deleteSousGroupe(sousGroupe: SousGroupe){
    this.sous_groupes=this.sous_groupes.filter((u)=>u !== sousGroupe);
  }

  pushSousGroupe(sousGroupe:SousGroupe){
    this.sous_groupes.push(sousGroupe);
  }
}
