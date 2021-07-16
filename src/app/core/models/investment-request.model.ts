export interface InvestmentRequestModel {
  status: string;
  id: number;
  product: string;
  summ: string;
  createDateTime: string;
  type?: string;
  title?: string;
  isin?: string;
  currentCost?: number;
  currency?: number;
  targetCost?: number;
  potential?: string;
}
