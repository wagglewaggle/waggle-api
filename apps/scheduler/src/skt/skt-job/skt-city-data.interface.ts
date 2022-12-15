export interface ISktCityData {
  status: {
    code: string;
    message: string;
    totalCount: number;
  };
  contents: {
    poiId: string;
    poiName: string;
    rltm: ISktRealTimeCongestion;
  };
}

export interface ISktRealTimeCongestion {
  congestion: number;
  congestionLevel: number;
  datetime: string;
}
