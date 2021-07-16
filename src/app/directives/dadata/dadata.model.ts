export interface BankResponseModel {
  data: {
    bic: number,
    name: {
      payment: string
    },
    correspondent_account: number
  };
}
