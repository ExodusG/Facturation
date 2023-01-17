import {Ligne} from "./ligne.model";

export class Groupe {

  designation: string;
  sousGroupes: Groupe[];
  lignes: Ligne[];
  constructor(designation: string, sous_groupes: Groupe[],lignes : Ligne[]) {
    this.designation = designation;
    this.sousGroupes = sous_groupes;
    this.lignes=lignes;
  }

  get total() : number{
    return this.sousGroupes.reduce((total, groupe) => total + groupe.total, 0) + this.lignes.reduce((total, ligne) => total + ligne.total, 0);
  }

  deleteSousGroupe(sousGroupe: Groupe){
    this.sousGroupes=this.sousGroupes.filter((u)=>u !== sousGroupe);
  }

  pushSousGroupe(sousGroupe:Groupe){
    this.sousGroupes.push(sousGroupe);
  }

  deleteLigne(ligne: Ligne){
    this.lignes=this.lignes.filter((u)=>u !== ligne);
  }

  addLigne(ligne : Ligne){
    this.lignes.push(ligne);
  }
}
