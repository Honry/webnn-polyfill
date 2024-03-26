'use strict';
import * as utils from '../utils.js';

describe('test instanceNormalization', () => {
  let context;
  before(async () => {
    context = await navigator.ml.createContext();
  });

  it('instanceNormalization default', async () => {
    const builder = new MLGraphBuilder(context);
    const inputShape = [1, 2, 1, 3];
    const input =
        builder.input('input', {dataType: 'float32', dimensions: inputShape});
    const output = builder.instanceNormalization(input);
    utils.checkDataType(output.dataType(), input.dataType());
    utils.checkShape(output.shape(), input.shape());
    const graph = await builder.build({output});
    const inputs = {'input': new Float32Array([-1, 0, 1, 2, 3, 4])};
    const outputs = {'output': new Float32Array(utils.sizeOfShape(inputShape))};
    const result = await context.compute(graph, inputs, outputs);
    const expected = [-1.2247356, 0., 1.2247356, -1.2247356, 0., 1.2247356];
    utils.checkValue(result.outputs.output, expected);
  });

  it('instanceNormalization with scale', async () => {
    const builder = new MLGraphBuilder(context);
    const inputShape = [1, 2, 1, 3];
    const input =
        builder.input('input', {dataType: 'float32', dimensions: inputShape});
    const desc = {dataType: 'float32', dimensions: [2]};
    const scale = builder.constant(desc, new Float32Array([1.0, 1.5]));
    const output = builder.instanceNormalization(input, {scale});
    utils.checkDataType(output.dataType(), input.dataType());
    utils.checkShape(output.shape(), input.shape());
    const graph = await builder.build({output});
    const inputs = {'input': new Float32Array([-1, 0, 1, 2, 3, 4])};
    const outputs = {'output': new Float32Array(utils.sizeOfShape(inputShape))};
    const result = await context.compute(graph, inputs, outputs);
    const expected = [-1.2247356, 0., 1.2247356, -1.8371035, 0., 1.8371034];
    utils.checkValue(result.outputs.output, expected);
  });

  it('instanceNormalization with bias', async () => {
    const builder = new MLGraphBuilder(context);
    const inputShape = [1, 2, 1, 3];
    const input =
        builder.input('input', {dataType: 'float32', dimensions: inputShape});
    const desc = {dataType: 'float32', dimensions: [2]};
    const bias = builder.constant(desc, new Float32Array([0, 1]));
    const output = builder.instanceNormalization(input, {bias});
    utils.checkDataType(output.dataType(), input.dataType());
    utils.checkShape(output.shape(), input.shape());
    const graph = await builder.build({output});
    const inputs = {'input': new Float32Array([-1, 0, 1, 2, 3, 4])};
    const outputs = {'output': new Float32Array(utils.sizeOfShape(inputShape))};
    const result = await context.compute(graph, inputs, outputs);
    const expected = [-1.2247356, 0., 1.2247356, -0.2247356, 1., 2.2247356];
    utils.checkValue(result.outputs.output, expected);
  });

  it('instanceNormalization with scale and bias', async () => {
    const builder = new MLGraphBuilder(context);
    const inputShape = [1, 2, 1, 3];
    const input =
        builder.input('input', {dataType: 'float32', dimensions: inputShape});
    const desc = {dataType: 'float32', dimensions: [2]};
    const scale = builder.constant(desc, new Float32Array([1.0, 1.5]));
    const bias = builder.constant(desc, new Float32Array([0, 1]));
    const output = builder.instanceNormalization(input, {scale, bias});
    utils.checkDataType(output.dataType(), input.dataType());
    utils.checkShape(output.shape(), input.shape());
    const graph = await builder.build({output});
    const inputs = {'input': new Float32Array([-1, 0, 1, 2, 3, 4])};
    const outputs = {'output': new Float32Array(utils.sizeOfShape(inputShape))};
    const result = await context.compute(graph, inputs, outputs);
    const expected = [-1.2247356, 0., 1.2247356, -0.8371035, 1., 2.8371034];
    utils.checkValue(result.outputs.output, expected);
  });

  it('instanceNormalization with epsilon', async () => {
    const builder = new MLGraphBuilder(context);
    const inputShape = [2, 3, 4, 5];
    const input =
        builder.input('input', {dataType: 'float32', dimensions: inputShape});
    const desc = {dataType: 'float32', dimensions: [3]};
    const scale = builder.constant(
        desc, new Float32Array([0.55290383, -1.1786512, -0.12353817]));
    const bias = builder.constant(
        desc, new Float32Array([0.36079535, 2.3073995, -0.12267359]));
    const epsilon = 1e-2;
    const output = builder.instanceNormalization(input, {scale, bias, epsilon});
    utils.checkDataType(output.dataType(), input.dataType());
    utils.checkShape(output.shape(), input.shape());
    const graph = await builder.build({output});
    const inputs = {
      'input': new Float32Array([
        0.23991525,  -1.3108366,  -0.8056796,  -0.20892623, 0.4869082,
        0.68151075,  0.5888935,   0.45948547,  -0.88501406, 1.9609013,
        0.21517155,  0.7427738,   0.853326,    -1.4071878,  -0.29106674,
        -0.11532243, -0.6716852,  -0.30156505, 0.45744178,  0.25426418,
        -2.0593688,  -0.6538451,  -0.2512263,  0.406628,    0.60806894,
        0.44109958,  0.92832196,  -0.64059025, -1.123297,   0.39360833,
        0.25650138,  -1.0688477,  -1.746481,   -1.4138917,  -0.75429744,
        -0.08158732, 0.38385203,  -0.14610007, 1.0802624,   -0.6336054,
        -0.21925186, -0.28690416, 2.0004241,   -0.4133636,  -0.68942326,
        -0.9513434,  -0.14104685, -0.74617624, 1.1912495,   -1.8508383,
        1.4370863,   1.4129546,   2.4901733,   1.1550623,   -0.6818049,
        0.21176137,  -0.44371676, -0.26306337, -0.01728541, 0.31616235,
        1.4783081,   -0.49589762, 1.5187141,   -0.63279223, -0.7817453,
        0.5844729,   0.35824686,  0.95782155,  -0.5790926,  -0.11348185,
        0.07356142,  -0.46691516, 0.00941111,  -0.23862253, -0.38974136,
        1.1558224,   -0.51724064, 0.27272934,  -0.798853,   0.29123458,
        2.239732,    0.11339404,  1.0436004,   -0.38251045, 0.5698435,
        -1.3686458,  -0.04936051, -0.6490325,  -0.58417344, -0.03446375,
        -0.7549325,  0.3405552,   0.3986468,   0.69191414,  -2.348451,
        1.2103504,   -0.33432662, 0.33831024,  0.11177547,  -1.9477838,
        1.9487013,   0.13771565,  0.32841948,  -0.6585632,  -0.19066776,
        -1.1357359,  1.3015537,   -0.50085896, -0.14418271, -0.2672549,
        1.2022284,   2.2585037,   1.3386828,   0.4864522,   -0.17040975,
        -0.5450272,  -0.0906434,  -0.23216948, -1.6074374,  -0.33925202,
      ]),
    };
    const outputs = {'output': new Float32Array(utils.sizeOfShape(inputShape))};
    const result = await context.compute(graph, inputs, outputs);
    const expected = [
      4.94363964e-01,  -5.80250263e-01, -2.30195075e-01, 1.83333233e-01,
      6.65521026e-01,  8.00373435e-01,  7.36193061e-01,  6.46518111e-01,
      -2.85170883e-01, 1.68694437e+00,  4.77217466e-01,  8.42826486e-01,
      9.19435143e-01,  -6.47018194e-01, 1.26412854e-01,  2.48197228e-01,
      -1.37341797e-01, 1.19137913e-01,  6.45101905e-01,  5.04307210e-01,
      4.69082165e+00,  2.78269839e+00,  2.23610783e+00,  1.34301233e+00,
      1.06953847e+00,  1.29621410e+00,  6.34766579e-01,  2.76470399e+00,
      3.42002106e+00,  1.36068761e+00,  1.54682255e+00,  3.34610128e+00,
      4.26604843e+00,  3.81452894e+00,  2.91907144e+00,  2.00580788e+00,
      1.37393284e+00,  2.09338975e+00,  4.28493977e-01,  2.75522137e+00,
      -7.73530304e-02, -6.95866644e-02, -3.32167834e-01, -5.50693423e-02,
      -2.33782008e-02, 6.68977946e-03,  -8.63308161e-02, -1.68630555e-02,
      -2.39276052e-01, 1.09950148e-01,  -2.67497659e-01, -2.64727384e-01,
      -3.88390154e-01, -2.35121816e-01, -2.42527649e-02, -1.26832575e-01,
      -5.15848622e-02, -7.23235458e-02, -1.00538410e-01, -1.38817608e-01,
      1.43087399e+00,  -8.45769346e-02, 1.46189058e+00,  -1.89660758e-01,
      -3.04000944e-01, 7.44743168e-01,  5.71086287e-01,  1.03133523e+00,
      -1.48439497e-01, 2.08975226e-01,  3.52554440e-01,  -6.23292625e-02,
      3.03311020e-01,  1.12914041e-01,  -3.08865309e-03, 1.18332565e+00,
      -1.00960344e-01, 5.05440831e-01,  -3.17133218e-01, 5.19645929e-01,
      -3.07856321e-01, 2.09997821e+00,  1.04662585e+00,  2.66153336e+00,
      1.58310151e+00,  3.77821898e+00,  2.28427911e+00,  2.96333909e+00,
      2.88989353e+00,  2.26741028e+00,  3.08325863e+00,  1.84274423e+00,
      1.77696204e+00,  1.44487035e+00,  4.88773632e+00,  8.57800603e-01,
      2.60697079e+00,  1.84528637e+00,  2.10181117e+00,  4.43402672e+00,
      -3.49317908e-01, -1.20361626e-01, -1.44471616e-01, -1.96910128e-02,
      -7.88453147e-02, 4.06361893e-02,  -2.67501414e-01, -3.96289825e-02,
      -8.47222507e-02, -6.91626817e-02, -2.54944086e-01, -3.88485104e-01,
      -2.72195488e-01, -1.64451107e-01, -8.14064592e-02, -3.40449512e-02,
      -9.14910287e-02, -7.35983998e-02, 1.00271679e-01,  -6.00603521e-02,
    ];
    utils.checkValue(result.outputs.output, expected);
  });

  it('instanceNormalization nchw', async () => {
    const builder = new MLGraphBuilder(context);
    const inputShape = [2, 3, 4, 5];
    const input =
        builder.input('input', {dataType: 'float32', dimensions: inputShape});
    const desc = {dataType: 'float32', dimensions: [3]};
    const scale = builder.constant(
        desc, new Float32Array([0.55290383, -1.1786512, -0.12353817]));
    const bias = builder.constant(
        desc, new Float32Array([0.36079535, 2.3073995, -0.12267359]));
    const epsilon = 1e-2;
    const layout = 'nchw';
    const output =
        builder.instanceNormalization(input, {scale, bias, epsilon, layout});
    utils.checkDataType(output.dataType(), input.dataType());
    utils.checkShape(output.shape(), input.shape());
    const graph = await builder.build({output});
    const inputs = {
      'input': new Float32Array([
        0.23991525,  -1.3108366,  -0.8056796,  -0.20892623, 0.4869082,
        0.68151075,  0.5888935,   0.45948547,  -0.88501406, 1.9609013,
        0.21517155,  0.7427738,   0.853326,    -1.4071878,  -0.29106674,
        -0.11532243, -0.6716852,  -0.30156505, 0.45744178,  0.25426418,
        -2.0593688,  -0.6538451,  -0.2512263,  0.406628,    0.60806894,
        0.44109958,  0.92832196,  -0.64059025, -1.123297,   0.39360833,
        0.25650138,  -1.0688477,  -1.746481,   -1.4138917,  -0.75429744,
        -0.08158732, 0.38385203,  -0.14610007, 1.0802624,   -0.6336054,
        -0.21925186, -0.28690416, 2.0004241,   -0.4133636,  -0.68942326,
        -0.9513434,  -0.14104685, -0.74617624, 1.1912495,   -1.8508383,
        1.4370863,   1.4129546,   2.4901733,   1.1550623,   -0.6818049,
        0.21176137,  -0.44371676, -0.26306337, -0.01728541, 0.31616235,
        1.4783081,   -0.49589762, 1.5187141,   -0.63279223, -0.7817453,
        0.5844729,   0.35824686,  0.95782155,  -0.5790926,  -0.11348185,
        0.07356142,  -0.46691516, 0.00941111,  -0.23862253, -0.38974136,
        1.1558224,   -0.51724064, 0.27272934,  -0.798853,   0.29123458,
        2.239732,    0.11339404,  1.0436004,   -0.38251045, 0.5698435,
        -1.3686458,  -0.04936051, -0.6490325,  -0.58417344, -0.03446375,
        -0.7549325,  0.3405552,   0.3986468,   0.69191414,  -2.348451,
        1.2103504,   -0.33432662, 0.33831024,  0.11177547,  -1.9477838,
        1.9487013,   0.13771565,  0.32841948,  -0.6585632,  -0.19066776,
        -1.1357359,  1.3015537,   -0.50085896, -0.14418271, -0.2672549,
        1.2022284,   2.2585037,   1.3386828,   0.4864522,   -0.17040975,
        -0.5450272,  -0.0906434,  -0.23216948, -1.6074374,  -0.33925202,
      ]),
    };
    const outputs = {'output': new Float32Array(utils.sizeOfShape(inputShape))};
    const result = await context.compute(graph, inputs, outputs);
    const expected = [
      4.94363964e-01,  -5.80250263e-01, -2.30195075e-01, 1.83333233e-01,
      6.65521026e-01,  8.00373435e-01,  7.36193061e-01,  6.46518111e-01,
      -2.85170883e-01, 1.68694437e+00,  4.77217466e-01,  8.42826486e-01,
      9.19435143e-01,  -6.47018194e-01, 1.26412854e-01,  2.48197228e-01,
      -1.37341797e-01, 1.19137913e-01,  6.45101905e-01,  5.04307210e-01,
      4.69082165e+00,  2.78269839e+00,  2.23610783e+00,  1.34301233e+00,
      1.06953847e+00,  1.29621410e+00,  6.34766579e-01,  2.76470399e+00,
      3.42002106e+00,  1.36068761e+00,  1.54682255e+00,  3.34610128e+00,
      4.26604843e+00,  3.81452894e+00,  2.91907144e+00,  2.00580788e+00,
      1.37393284e+00,  2.09338975e+00,  4.28493977e-01,  2.75522137e+00,
      -7.73530304e-02, -6.95866644e-02, -3.32167834e-01, -5.50693423e-02,
      -2.33782008e-02, 6.68977946e-03,  -8.63308161e-02, -1.68630555e-02,
      -2.39276052e-01, 1.09950148e-01,  -2.67497659e-01, -2.64727384e-01,
      -3.88390154e-01, -2.35121816e-01, -2.42527649e-02, -1.26832575e-01,
      -5.15848622e-02, -7.23235458e-02, -1.00538410e-01, -1.38817608e-01,
      1.43087399e+00,  -8.45769346e-02, 1.46189058e+00,  -1.89660758e-01,
      -3.04000944e-01, 7.44743168e-01,  5.71086287e-01,  1.03133523e+00,
      -1.48439497e-01, 2.08975226e-01,  3.52554440e-01,  -6.23292625e-02,
      3.03311020e-01,  1.12914041e-01,  -3.08865309e-03, 1.18332565e+00,
      -1.00960344e-01, 5.05440831e-01,  -3.17133218e-01, 5.19645929e-01,
      -3.07856321e-01, 2.09997821e+00,  1.04662585e+00,  2.66153336e+00,
      1.58310151e+00,  3.77821898e+00,  2.28427911e+00,  2.96333909e+00,
      2.88989353e+00,  2.26741028e+00,  3.08325863e+00,  1.84274423e+00,
      1.77696204e+00,  1.44487035e+00,  4.88773632e+00,  8.57800603e-01,
      2.60697079e+00,  1.84528637e+00,  2.10181117e+00,  4.43402672e+00,
      -3.49317908e-01, -1.20361626e-01, -1.44471616e-01, -1.96910128e-02,
      -7.88453147e-02, 4.06361893e-02,  -2.67501414e-01, -3.96289825e-02,
      -8.47222507e-02, -6.91626817e-02, -2.54944086e-01, -3.88485104e-01,
      -2.72195488e-01, -1.64451107e-01, -8.14064592e-02, -3.40449512e-02,
      -9.14910287e-02, -7.35983998e-02, 1.00271679e-01,  -6.00603521e-02,
    ];
    utils.checkValue(result.outputs.output, expected);
  });

  it('instanceNormalization nhwc', async () => {
    const builder = new MLGraphBuilder(context);
    const inputShape = [2, 4, 5, 3];
    const input =
        builder.input('input', {dataType: 'float32', dimensions: inputShape});
    const desc = {dataType: 'float32', dimensions: [3]};
    const scale = builder.constant(
        desc, new Float32Array([0.55290383, -1.1786512, -0.12353817]));
    const bias = builder.constant(
        desc, new Float32Array([0.36079535, 2.3073995, -0.12267359]));
    const epsilon = 1e-2;
    const layout = 'nhwc';
    const output =
        builder.instanceNormalization(input, {scale, bias, epsilon, layout});
    utils.checkDataType(output.dataType(), input.dataType());
    utils.checkShape(output.shape(), input.shape());
    const graph = await builder.build({output});
    const inputs = {
      'input': new Float32Array([
        0.2399153,  -2.0593688, -0.2192519,
        -1.3108366, -0.6538451, -0.2869042,
        -0.8056796, -0.2512263, 2.0004241,
        -0.2089262, 0.406628,   -0.4133636,
        0.4869082,  0.6080689,  -0.6894233,
        0.6815107,  0.4410996,  -0.9513434,
        0.5888935,  0.928322,   -0.1410469,
        0.4594855,  -0.6405903, -0.7461762,
        -0.8850141, -1.123297,  1.1912495,
        1.9609013,  0.3936083,  -1.8508383,
        0.2151715,  0.2565014,  1.4370863,
        0.7427738,  -1.0688477, 1.4129546,
        0.853326,   -1.7464809, 2.4901733,
        -1.4071878, -1.4138917, 1.1550623,
        -0.2910667, -0.7542974, -0.6818049,
        -0.1153224, -0.0815873, 0.2117614,
        -0.6716852, 0.383852,   -0.4437168,
        -0.3015651, -0.1461001, -0.2630634,
        0.4574418,  1.0802624,  -0.0172854,
        0.2542642,  -0.6336054, 0.3161623,
        1.4783081,  2.239732,   1.9487013,
        -0.4958976, 0.113394,   0.1377157,
        1.5187141,  1.0436004,  0.3284195,
        -0.6327922, -0.3825105, -0.6585632,
        -0.7817453, 0.5698435,  -0.1906678,
        0.5844729,  -1.3686458, -1.1357359,
        0.3582469,  -0.0493605, 1.3015537,
        0.9578215,  -0.6490325, -0.500859,
        -0.5790926, -0.5841734, -0.1441827,
        -0.1134818, -0.0344637, -0.2672549,
        0.0735614,  -0.7549325, 1.2022284,
        -0.4669152, 0.3405552,  2.2585037,
        0.0094111,  0.3986468,  1.3386828,
        -0.2386225, 0.6919141,  0.4864522,
        -0.3897414, -2.3484509, -0.1704098,
        1.1558224,  1.2103504,  -0.5450272,
        -0.5172406, -0.3343266, -0.0906434,
        0.2727293,  0.3383102,  -0.2321695,
        -0.798853,  0.1117755,  -1.6074374,
        0.2912346,  -1.9477838, -0.339252,
      ]),
    };
    const outputs = {'output': new Float32Array(utils.sizeOfShape(inputShape))};
    const result = await context.compute(graph, inputs, outputs);
    const expected = [
      4.94363964e-01,  4.69082165e+00, -7.73530304e-02,
      -5.80250263e-01, 2.78269839e+00, -6.95866644e-02,
      -2.30195075e-01, 2.23610783e+00, -3.32167834e-01,
      1.83333233e-01,  1.34301233e+00, -5.50693423e-02,
      6.65521026e-01,  1.06953847e+00, -2.33782008e-02,
      8.00373435e-01,  1.29621410e+00, 6.68977946e-03,
      7.36193061e-01,  6.34766579e-01, -8.63308161e-02,
      6.46518111e-01,  2.76470399e+00, -1.68630555e-02,
      -2.85170883e-01, 3.42002106e+00, -2.39276052e-01,
      1.68694437e+00,  1.36068761e+00, 1.09950148e-01,
      4.77217466e-01,  1.54682255e+00, -2.67497659e-01,
      8.42826486e-01,  3.34610128e+00, -2.64727384e-01,
      9.19435143e-01,  4.26604843e+00, -3.88390154e-01,
      -6.47018194e-01, 3.81452894e+00, -2.35121816e-01,
      1.26412854e-01,  2.91907144e+00, -2.42527649e-02,
      2.48197228e-01,  2.00580788e+00, -1.26832575e-01,
      -1.37341797e-01, 1.37393284e+00, -5.15848622e-02,
      1.19137913e-01,  2.09338975e+00, -7.23235458e-02,
      6.45101905e-01,  4.28493977e-01, -1.00538410e-01,
      5.04307210e-01,  2.75522137e+00, -1.38817608e-01,
      1.43087399e+00,  -3.07856321e-01, -3.49317908e-01,
      -8.45769346e-02, 2.09997821e+00, -1.20361626e-01,
      1.46189058e+00,  1.04662585e+00, -1.44471616e-01,
      -1.89660758e-01, 2.66153336e+00, -1.96910128e-02,
      -3.04000944e-01, 1.58310151e+00, -7.88453147e-02,
      7.44743168e-01,  3.77821898e+00, 4.06361893e-02,
      5.71086287e-01,  2.28427911e+00, -2.67501414e-01,
      1.03133523e+00,  2.96333909e+00, -3.96289825e-02,
      -1.48439497e-01, 2.88989353e+00, -8.47222507e-02,
      2.08975226e-01,  2.26741028e+00, -6.91626817e-02,
      3.52554440e-01,  3.08325863e+00, -2.54944086e-01,
      -6.23292625e-02, 1.84274423e+00, -3.88485104e-01,
      3.03311020e-01,  1.77696204e+00, -2.72195488e-01,
      1.12914041e-01,  1.44487035e+00, -1.64451107e-01,
      -3.08865309e-03, 4.88773632e+00, -8.14064592e-02,
      1.18332565e+00,  8.57800603e-01, -3.40449512e-02,
      -1.00960344e-01, 2.60697079e+00, -9.14910287e-02,
      5.05440831e-01,  1.84528637e+00, -7.35983998e-02,
      -3.17133218e-01, 2.10181117e+00, 1.00271679e-01,
      5.19645929e-01,  4.43402672e+00, -6.00603521e-02,
    ];
    utils.checkValue(result.outputs.output, expected);
  });
});
