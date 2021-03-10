export interface Automezzo {
  id: number;
  tagMezzo: number;
  targa: string;
  marcaModello: string;
  tipoAutomezzoId: number;
  tipoAutomezzo: string;
  kmOre: number;
  frequenzaTagliando: number;
  kmUltimoTagliando: number;
  scadenzaBollo: Date;
  scadenzaAssicurazione: Date;
  scadenzaCollaudo: Date;
  scadenzaTachigrafo: Date;
  filialeId: number;
  filiale: string;
  kmOreUltimoRifrnimento: number;
  fringeBenefit: boolean;
  accise: boolean;
}
