'use strict';
import * as utils from '../utils.js';

describe('test matmul', () => {
  let context;
  before(async () => {
    context = await navigator.ml.createContext();
  });

  async function testMatmul(A, B, expected) {
    const builder = new MLGraphBuilder(context);
    const a = builder.input('a', {dataType: 'float32', dimensions: A.shape});
    const b = builder.constant(
        {dataType: 'float32', dimensions: B.shape}, new Float32Array(B.value));
    const c = builder.matmul(a, b);
    utils.checkDataType(c.dataType(), a.dataType());
    utils.checkShape(c.shape(), expected.shape);
    const graph = await builder.build({c});
    const inputs = {'a': new Float32Array(A.value)};
    const outputs = {'c': new Float32Array(utils.sizeOfShape(expected.shape))};
    const result = await context.compute(graph, inputs, outputs);
    utils.checkValue(result.outputs.c, expected.value);
  }

  it('matmul 1d', async () => {
    await testMatmul(
        {shape: [4], value: [0.9025404, 0.89538723, 0.16789329, 0.7440875]},
        {shape: [4], value: [0.8782074, 0.22533207, 0.7134056, 0.04190519]},
        {shape: [], value: [1.1453342]});
  });

  it('matmul 1dx2d', async () => {
    await testMatmul(
        {shape: [4], value: [0.1309212, 0.9090703, 0.62183434, 0.9195683]}, {
          shape: [4, 3],
          value: [
            0.3093976,
            -1.2924036,
            -0.64339244,
            1.1423386,
            1.5052135,
            1.8182521,
            -1.825652,
            -0.39694095,
            -0.90111053,
            0.7807154,
            -1.9163561,
            -0.13988003,
          ],
        },
        {shape: [1, 3], value: [0.6616409, -0.80990994, 0.8797145]});
  });

  it('matmul 2dx1d', async () => {
    await testMatmul(
        {
          shape: [3, 4],
          value: [
            0.3582649,
            0.83665735,
            0.30253866,
            0.6446781,
            0.4684662,
            0.94761264,
            0.4122941,
            0.6787481,
            0.15072346,
            0.2820577,
            0.67296237,
            0.3856028,
          ],
        },
        {shape: [4], value: [0.25528687, 0.2126722, 0.26320502, 0.8297401]},
        {shape: [3, 1], value: [0.8839391, 0.9928265, 0.5955407]});
  });

  it('matmul 2d', async () => {
    await testMatmul(
        {
          shape: [3, 4],
          value: [
            0.9602246,
            0.97682184,
            -0.33201018,
            0.8248904,
            0.40872088,
            0.18995902,
            0.69355214,
            -0.37210146,
            0.18104352,
            3.270753,
            -0.803097,
            -0.7268995,
          ],
        },
        {
          shape: [4, 3],
          value: [
            0.17467105,
            -1.2045133,
            -0.02621938,
            0.6096196,
            1.4499376,
            1.3465316,
            0.03289436,
            1.0754977,
            -0.61485314,
            0.94857556,
            -0.36462623,
            1.402278,
          ],
        },
        {
          shape: [3, 3],
          value: [
            1.5347629,
            -0.3981255,
            2.6510081,
            -0.14295794,
            0.6647107,
            -0.70315295,
            1.3096018,
            3.9256358,
            3.873897,
          ],
        });
  });

  it('matmul 3d', async () => {
    await testMatmul(
        {
          shape: [2, 3, 4],
          value: [
            0.19521078,  0.11637875, 0.54684865,  0.13257395, -0.05654722,
            -0.64351636, -1.0019655, -1.6156989,  0.01625126, 1.2386297,
            -0.1242797,  0.40350053, -0.5883816,  0.93452644, -0.01409106,
            -0.7825521,  -1.2281458, -1.2388189,  0.7644939,  -0.8567167,
            0.3942727,   -0.772506,  -0.06412488, -0.9848109,
          ],
        },
        {
          shape: [2, 4, 3],
          value: [
            -2.7142005,  0.41909233,  0.80572236,  0.19983047, -1.9361104,
            1.1919757,   0.61684674,  0.23732206,  0.74679494, 0.4595843,
            -0.90667343, 0.7676448,   0.48643762,  0.41120672, 1.1319419,
            1.9692143,   -0.44463134, 0.17005378,  1.1589569,  -0.4333597,
            -0.47976026, 0.01067371,  -0.79455626, -1.4024538,
          ],
        },
        {
          shape: [2, 3, 3],
          value: [
            -0.10833447,
            -0.13393278,
            0.8061598,
            -1.3357227,
            2.449343,
            -2.801163,
            0.31218773,
            -2.7866507,
            1.7064441,
            1.5293882,
            -0.02957799,
            0.5971595,
            -2.1600451,
            0.39520463,
            -0.7661238,
            -1.4142704,
            1.3158847,
            1.7268425,
          ],
        });
  });

  it('matmul 3dx2d', async () => {
    await testMatmul(
        {
          shape: [2, 3, 4],
          value: [
            -0.57675153, -0.40231872, 0.10705414,  -0.66516143, 0.3206562,
            0.43695804,  -1.8614748,  0.77510875,  -1.2424866,  -0.58930343,
            0.40949076,  0.5517746,   0.09809388,  0.5084747,   0.76594603,
            0.8050488,   -0.03979152, 2.4019558,   -0.54937273, -0.1696853,
            -1.223669,   1.0791223,   -0.61921734, 2.1074235,
          ],
        },
        {
          shape: [4, 3],
          value: [
            -0.38534147,
            -0.18395364,
            -2.548874,
            0.4525641,
            -0.41875792,
            0.57480955,
            -0.41603103,
            0.6973883,
            0.9531734,
            1.3292471,
            -1.003955,
            -0.7639869,
          ],
        },
        {
          shape: [2, 3, 3],
          value: [
            -0.8885305,
            1.0170201,
            1.8490261,
            1.8789318,
            -2.3183105,
            -2.9326258,
            0.775168,
            0.2069526,
            2.7969716,
            0.9437693,
            -0.5050435,
            0.15727985,
            1.1053747,
            -1.211288,
            1.0880805,
            4.0188026,
            -2.774386,
            1.5390024,
          ],
        });
  });

  it('matmul 3dx2d should be 3d', async () => {
    await testMatmul(
        {
          shape: [1, 3, 4],
          value: [
            0.25500464,
            -1.105212,
            -0.5368534,
            -0.01583702,
            0.9875369,
            1.3744136,
            0.61079186,
            0.74018836,
            -0.56111795,
            -0.16432828,
            1.3176169,
            -0.249416,
          ],
        },
        {
          shape: [4, 3],
          value: [
            0.2545374,
            -1.6150205,
            -0.64508885,
            -0.3454305,
            0.38700557,
            1.3147515,
            -0.3379386,
            1.1804152,
            1.9414345,
            -1.5912915,
            0.40443325,
            -0.23596671,
          ],
        },
        {
          shape: [1, 3, 3],
          value: [
            0.6533069,
            -1.4796758,
            -2.6561086,
            -1.607665,
            -0.04264185,
            2.1811159,
            -0.13444155,
            2.297084,
            2.762841,
          ],
        });
  });

  it('matmul 4d', async () => {
    await testMatmul(
        {
          shape: [1, 2, 3, 4],
          value: [
            -0.8074054, -0.72524256, 0.4510249,  1.6203358,   1.9851393,
            0.501528,   1.3975041,   -2.3231244, 0.70866925,  0.24667543,
            -0.6271161, -0.9634111,  -0.5911732, -0.09888726, -1.0926677,
            0.47262478, 0.6141726,   -0.634484,  -0.07425678, -1.2638812,
            -1.1002079, -1.5324054,  -1.1643038, -0.05644368,
          ],
        },
        {
          shape: [1, 2, 4, 3],
          value: [
            -0.45605758, -0.43318668, 0.61509126, -2.2228749,  0.50257015,
            -0.29311436, -0.64561933, -0.6439757, 1.6211574,   -0.28852704,
            -0.46247238, 0.5082442,   1.2357981,  -0.82043344, -0.926581,
            -0.8955289,  0.74586314,  -0.8022598, -0.5360306,  -0.08719682,
            0.72717273,  1.1277325,   2.0261378,  -1.4311641,
          ],
        },
        {
          shape: [1, 2, 3, 3],
          value: [
            1.2216457,
            -1.0545375,
            1.2706597,
            -2.2521434,
            -0.4334606,
            2.1588962,
            -0.1886742,
            0.66638416,
            -1.1427099,
            0.47668338,
            1.464142,
            -0.84385866,
            -0.058324,
            -3.5314486,
            1.6947643,
            0.5731275,
            -0.2531564,
            1.4829493,
          ],
        });
  });

  it('matmul 4dx2d', async () => {
    await testMatmul(
        {
          shape: [1, 2, 3, 4],
          value: [
            -0.40162078, -0.5607968, -1.4350457,  -0.22855183, -0.1357853,
            -1.3434876,  1.0602195,  -0.17137937, 0.44751146,  0.78427273,
            -0.49435133, -0.9062699, -0.6109297,  0.645001,    0.6632162,
            0.903104,    2.4085212,  0.7805757,   -0.9099179,  -0.6195976,
            0.38710263,  0.5102191,  -0.03610202, 1.2280966,
          ],
        },
        {
          shape: [4, 3],
          value: [
            0.01829041,
            -0.73948264,
            -0.95898634,
            -0.5105271,
            2.1705306,
            1.2495605,
            -1.9865801,
            -0.58367056,
            -0.80371356,
            -0.583849,
            -1.2323712,
            1.3314632,
          ],
        },
        {
          shape: [1, 2, 3, 3],
          value: [
            3.2632291,
            0.19901966,
            0.5334567,
            -1.3227482,
            -3.223286,
            -2.628851,
            1.118986,
            2.7767603,
            -0.25850934,
            -2.185273,
            0.3517071,
            2.061255,
            1.814924,
            1.2078704,
            -1.4280205,
            -0.8987038,
            -0.67120874,
            1.9305047,
          ],
        });
  });
});
