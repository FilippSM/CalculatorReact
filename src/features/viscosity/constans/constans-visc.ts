export type Viscosity = {
  id: number;
  diameter: number;
  constant: number;
  calibration: boolean;
}

export const constansVisc: Viscosity[] = [
    { id: 1279, diameter: 0.34, constant: 0.003948, calibration: false },
    { id: 769, diameter: 0.34, constant: 0.003484, calibration: false },
    { id: 3763, diameter: 0.54, constant: 0.010504, calibration: true },
    { id: 3776, diameter: 0.54, constant: 0.01070, calibration: false },
    { id: 721, diameter: 0.86, constant: 0.030039, calibration: true },
    { id: 603, diameter: 0.86, constant: 0.03731, calibration: false },
    { id: 847, diameter: 0.86, constant: 0.030584, calibration: true },
    { id: 751, diameter: 0.86, constant: 0.030685, calibration: true },
    { id: 3059, diameter: 0.86, constant: 0.03022, calibration: false },
    { id: 3041, diameter: 0.86, constant: 0.02905, calibration: false },
    { id: 1076, diameter: 1.16, constant: 0.110159, calibration: true },
    { id: 3389, diameter: 1.16, constant: 0.112311, calibration: true },
    { id: 3404, diameter: 1.16, constant: 0.118910, calibration: true },
    { id: 3407, diameter: 1.16, constant: 0.1188, calibration: false },
    { id: 145, diameter: 1.16, constant: 0.1056, calibration: false },
    { id: 691, diameter: 1.16, constant: 0.09725, calibration: false },
    { id: 5, diameter: 1.52, constant: 0.337121, calibration: true },
    { id: 3595, diameter: 1.52, constant: 0.333743, calibration: true},
    { id: 3555, diameter: 1.52, constant: 0.322547, calibration: true},
    { id: 745, diameter: 2.10, constant: 1.129067, calibration: true},
    { id: 769, diameter: 2.10, constant: 1.090, calibration: false },
    { id: 708, diameter: 2.10, constant: 1.102, calibration: false },
    { id: 3932, diameter: 2.10, constant: 0.940120, calibration: true},
    { id: 670, diameter: 2.10, constant: 1.042, calibration: false },
    { id: 3909, diameter: 2.10, constant: 0.9090, calibration: false },
    { id: 794, diameter: 2.75, constant: 3.224, calibration: false },
    { id: 241, diameter: 3.75, constant: 8.502, calibration: false },
    { id: 1544, diameter: 5.10, constant: 26.62, calibration: false },
    { id: 241, diameter: 5.10, constant: 28.33, calibration: false },
];