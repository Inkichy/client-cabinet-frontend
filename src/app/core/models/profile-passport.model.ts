export interface ProfilePassportModel {
  first_name: string;
  last_name: string;
  middle_name: string;
  birthday: string;
  series: string;
  number: string;
  issued_by: string;
  date_of_issue: string;
  unit_code: string;
  place_of_birth: string;
}
export interface ProfilePassportWithImage {
  series: string;
  number: string;
  issued_by: string;
  date_of_issue: string;
  unit_code: string;
  place_of_birth: string;
  scan_of_passport: any
}
