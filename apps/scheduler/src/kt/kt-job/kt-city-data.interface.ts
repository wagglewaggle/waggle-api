export interface IKtCityData {
  'SeoulRtd.citydata': {
    CITYDATA: {
      LIVE_PPLTN_STTS: ILivePopulationStatus;
      ROAD_TRAFFIC_STTS: {
        AVG_ROAD_DATA: IRoadTraffic;
      };
      ACDNT_CNTRL_STTS: string | IAccidentObject;
    };
  };
}

export interface ILivePopulationStatus {
  LIVE_PPLTN_STTS: {
    AREA_CONGEST_LVL: string;
    AREA_CONGEST_MSG: string;
    AREA_PPLTN_MIN: number;
    AREA_PPLTN_MAX: number;
    MALE_PPLTN_RATE: number;
    FEMALE_PPLTN_RATE: number;
    PPLTN_RATE_0: number;
    PPLTN_RATE_10: number;
    PPLTN_RATE_20: number;
    PPLTN_RATE_30: number;
    PPLTN_RATE_40: number;
    PPLTN_RATE_50: number;
    PPLTN_RATE_60: number;
    PPLTN_RATE_70: number;
    RESNT_PPLTN_RATE: number;
    NON_RESNT_PPLTN_RATE: number;
    REPLACE_YN: string;
    PPLTN_TIME: string;
  };
}

export interface IAccidentControlStatus {
  ACDNT_OCCR_DT: string;
  EXP_CLR_DT: string;
  ACDNT_TYPE: string;
  ACDNT_DTYPE: string;
  ACDNT_INFO: string;
  ACDNT_X: number;
  ACDNT_Y: number;
  ACDNT_TIME: string;
}

export interface IAccidentObject {
  ACDNT_CNTRL_STTS: IAccidentControlStatus | IAccidentControlStatus[];
}

export interface IRoadTraffic {
  ROAD_MSG: string;
  ROAD_TRAFFIC_IDX: string;
  ROAD_TRFFIC_TIME: string;
  ROAD_TRAFFIC_SPD: number;
}
