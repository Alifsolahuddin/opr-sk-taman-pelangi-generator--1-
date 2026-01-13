
export interface ReportData {
  namaProgram: string;
  anjuran: string;
  tarikh: string;
  masa: string;
  tempat: string;
  sasaran: string;
  objektif: string;
  aktiviti: string;
  kekuatan: string;
  kelemahan: string;
  images: string[];
}

export const INITIAL_REPORT_DATA: ReportData = {
  namaProgram: '',
  anjuran: '',
  tarikh: '',
  masa: '',
  tempat: '',
  sasaran: '',
  objektif: '',
  aktiviti: '',
  kekuatan: '',
  kelemahan: '',
  images: []
};
