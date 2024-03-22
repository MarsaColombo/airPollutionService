const pollutionValuations = [
  {
    QualitativeName: "Good",
    Index: 1,
    PollutantConcentration: {
      so2: { min: 0, max: 20 },
      no2: { min: 0, max: 40 },
      pm10: { min: 0, max: 20 },
      pm2_5: { min: 0, max: 10 },
      o3: { min: 0, max: 60 },
      co: { min: 0, max: 4400 },
      no: null,
      nh3: null
    }
  },
  {
    QualitativeName: "Fair",
    Index: 2,
    PollutantConcentration: {
      so2: { min: 20, max: 80 },
      no2: { min: 40, max: 70 },
      pm10: { min: 20, max: 50 },
      pm2_5: { min: 10, max: 25 },
      o3: { min: 60, max: 100 },
      co: { min: 4400, max: 9400 },
      no: null,
      nh3: null
    }
  },
  {
    QualitativeName: "Moderate",
    Index: 3,
    PollutantConcentration: {
      so2: { min: 80, max: 250 },
      no2: { min: 70, max: 150 },
      pm10: { min: 50, max: 100 },
      pm2_5: { min: 25, max: 50 },
      o3: { min: 100, max: 140 },
      co: { min: 9400, max: 12400 },
      no: null,
      nh3: null
    }
  },
  {
    QualitativeName: "Poor",
    Index: 4,
    PollutantConcentration: {
      so2: { min: 250, max: 350 },
      no2: { min: 150, max: 200 },
      pm10: { min: 100, max: 200 },
      pm2_5: { min: 50, max: 75 },
      o3: { min: 140, max: 180 },
      co: { min: 12400, max: 15400 },
      no: null,
      nh3: null
    }
  },
  {
    QualitativeName: "Very Poor",
    Index: 5,
    PollutantConcentration: {
      so2: { min: 350 },
      no2: { min: 200 },
      pm10: { min: 200 },
      pm2_5: { min: 75 },
      o3: { min: 180 },
      co: { min: 15400 },
      no: null,
      nh3: null
    }
  }
];

export default pollutionValuations;