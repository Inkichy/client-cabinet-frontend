import {TMDocuments} from './tm-documents.model';

export interface TMPurchaseDataModel {
  sum: number;
  product: number;
  currency: string;
  userProductToChange?: number;
}

export interface TMPurchaseDataResponseModel {
  agreement: number;
  product: number;
  sum: number;
  documents: TMDocuments[];
}
