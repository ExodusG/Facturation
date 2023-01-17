export class Ligne {
  designation: string;
  quantite: number;
  unite: string;
  prix_unitaire: number;

  constructor(designation: string, quantite: number, unite: string, prix_unitaire: number) {
    this.designation = designation;
    this.quantite = quantite;
    this.unite = unite;
    this.prix_unitaire = prix_unitaire;
  }

  get total() {
    return this.quantite * this.prix_unitaire;
  }

}
