export interface CabinetPortfolioModel {
  ID: number;
  // id: string;
  // bxid: string;
  CODE: string;
  // CODE: string;
  IBLOCK_ID: number;
  // IBLOCK_ID: string;
  name: string;
  // name: string;
  PREVIEW_PICTURE: string;
  // PREVIEW_PICTURE: string;
  DETAIL_PICTURE: string;
  // DETAIL_PICTURE: string;
  previewText: string;
  // PREVIEW_TEXT: string;
  ACTIVE: boolean;
  // ACTIVE: boolean;
  strategyId: string;
  // strategyId: string;
  targetYield: string;
  // targetYield: string;
  link: string;
  currencys: string[];
  // currencys: string;
  fancyProductID: string;
  color: string;
  // color: string;
  RISK_LEVEL: string;
  // RISK_LEVEL: string;
  content: string;
  // content: string;
  ADDSUMM: string;
  MINSUMM: number;
  // MINSUMM: string;
  INVESTPLAN: string;
  ITEM_TYPE: string;
  // ITEM_TYPE: string;
  RATING: string;
  // RATING: string;
  PARENT_ID: string;
  // PARENT_ID: string;
  GROW_RATE: string;
  // GROW_RATE: string;
  CALC_YIELD: string;
  // CALC_YIELD: number;
  TARIFS: TariffModel | any; //
  // TARIFS: TariffModel;
  management_fee: string;
  // management_fee: string;
  success_fee: string;
  // success_fee: string;
  ANALITICS_FILE: string;
  FOR_WHOM: string;
  // FOR_WHOM: string;
  SHOW_MAIN: boolean;
  // SHOW_MAIN: boolean;
  child: CabinetPortfolioModel[];

  new: boolean;
  // INVESTPLAN: number;
  // ICON: string;
  // SITE_URL: number;
}


export interface CabinetStrategyModel {
  ID: number;
  name: string;
  previewText: string;
}

export interface RatesModel {
  USD: number;
  EUR: number;
}

export interface TariffModel {
  head: string;
  description: string;
  tables: {
    tableTitles: string;
    table_row: [][];
  }[];
}


export interface StructureModel {
  i_name: string;
  rur_rate: string;
  pictures: string;
  value: string;
  color: string;
}

export interface CabinetUserPortfolioModel {
  withdraw: any;
  id: string;
  date: string;
  structure: StructureModel[];
  graph: [number, number][];
  amount: { RUR: number, USD: number };
  product: CabinetPortfolioModel;
  portfolioId: string;
  share: number;
  color: string;
  agreementNumber: string;
  yield: any;
  active: number;
  currentYield: number;
  freeMoney: number;
  d_date: number;
  dateEmitents: string;
  lastOperations: [];
  generalAgreement: any;
  years: [];
  rates: RatesModel;
  CONTR: string;
}

export interface CabinetReportModel {
  date: string;
  description: string;
  file_url: string;
}

export interface CabinetDataModel {
  config: any;
  withdraw: string;
  meta: {
    dateLastUpdate: string;
  };
  client: {
    id: string;
    name: string;
    lastName: string;
    patronymic: string;
    documentInn: string;
    documentSnils: string;
    actualAddr: any;
    postAddr: any;
    privateWord: string;
    passport: {
      passportSeries: string;
      passportNumber: string;
      passportIssuedBy: string;
      passportIssueDate: string;
      passportIssueId: string;
      passportBirthplace: string;
    };
    requisites: {
      bankAccount: string;
      bankBik: string;
      bankCorr: string;
      bankName: string;
    }
    passportScan: number[];
    email: string;
    phone: string;
    isLegalEntity: string;
    legalEntityName: string;
    KPP: string;
    isKval: string;
    dateCreate: string;
  };
  portfolios: CabinetPortfolioModel[];
  strategys: CabinetStrategyModel[];
  userPortfolios: CabinetUserPortfolioModel[];
  notification: {
    new: boolean;
    groups: AvailableNoticeModel[];
  };
}

export class AvailableNoticeModel {
  id: string;
  title: string;
  fieldName: string;
  active: boolean;
}

export interface Question {
  'name': string;
  'phone': string;
  'time': string;
  'question': string;
}

export interface Requisites {
  ACTIVE: string;
  BANK_ACCOUNT: string;
  BANK_NAME: string;
  BIK: string;
  CODE: string;
  DETAIL_PICTURE: number;
  IBLOCK_ID: number;
  ID: string;
  CURRENCY: string;
  K_ACCOUNT: string;
  ITEM_TYPE: string;
  NAME: string;
  PREVIEW_PICTURE: string;
  PREVIEW_TEXT: string;
  PREVIEW_TEXT_TYPE: string;
  RECEIVER: string;
  RECEIVER_INN: string;
  content: string;
  SWIFT: string;
}


export interface SimpleResponseModel {
  timeout: number;
  success: boolean;
  phone?: boolean;
  email?: boolean;
  data: object;
  errorMsg: string[];
}

export interface NotificationModel {
  content: string;
  create_datetime: string;
  file: number;
  id: number;
  title: string;
  user_id: number;
  viewed: string;
}
