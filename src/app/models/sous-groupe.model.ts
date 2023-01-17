import {Ligne} from "./ligne.model";

export class SousGroupe {
  designation: string;
  lignes: Ligne[];

  constructor(designation: string, lignes: Ligne[]) {
    this.designation = designation;
    this.lignes = lignes;
  }

  get total() {
    return this.lignes.reduce((total, ligne) => total + ligne.total, 0);
  }

  deleteLigne(ligne: Ligne){
    this.lignes=this.lignes.filter((u)=>u !== ligne);
  }
}
