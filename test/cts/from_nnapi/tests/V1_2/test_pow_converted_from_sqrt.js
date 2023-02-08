'use strict';
import * as utils from '../../../../utils.js';

/* eslint-disable max-len */
describe('CTS converted from NNAPI CTS', () => {
  let context;
  before(async () => {
    context = await navigator.ml.createContext();
  });

  it('test pow converted from sqrt test', async () => {
    // Converted test case (from: V1_2/sqrt.mod.py)
    const builder = new MLGraphBuilder(context);
    const input0 = builder.input('input0', {type: 'float32', dimensions: [1, 2, 3, 4, 5]});
    const input0Data = new Float32Array([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6.0, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7.0, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8.0, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 9.0, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10.0, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 11.0, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9]);
    const expected = [0.0, 0.31622776601683794, 0.4472135954999579, 0.5477225575051661, 0.6324555320336759, 0.7071067811865476, 0.7745966692414834, 0.8366600265340756, 0.8944271909999159, 0.9486832980505138, 1.0, 1.0488088481701516, 1.0954451150103321, 1.140175425099138, 1.1832159566199232, 1.224744871391589, 1.2649110640673518, 1.3038404810405297, 1.3416407864998738, 1.378404875209022, 1.4142135623730951, 1.449137674618944, 1.4832396974191326, 1.51657508881031, 1.5491933384829668, 1.5811388300841898, 1.61245154965971, 1.6431676725154984, 1.6733200530681511, 1.70293863659264, 1.7320508075688772, 1.760681686165901, 1.7888543819998317, 1.816590212458495, 1.8439088914585775, 1.8708286933869707, 1.8973665961010275, 1.9235384061671346, 1.9493588689617927, 1.9748417658131499, 2.0, 2.0248456731316584, 2.04939015319192, 2.073644135332772, 2.0976176963403033, 2.1213203435596424, 2.1447610589527217, 2.16794833886788, 2.1908902300206643, 2.2135943621178655, 2.23606797749979, 2.258317958127243, 2.280350850198276, 2.3021728866442674, 2.32379000772445, 2.345207879911715, 2.3664319132398464, 2.3874672772626644, 2.4083189157584592, 2.4289915602982237, 2.449489742783178, 2.4698178070456938, 2.4899799195977463, 2.5099800796022267, 2.5298221281347035, 2.5495097567963922, 2.569046515733026, 2.588435821108957, 2.6076809620810595, 2.6267851073127395, 2.6457513110645907, 2.6645825188948455, 2.6832815729997477, 2.701851217221259, 2.7202941017470885, 2.7386127875258306, 2.756809750418044, 2.7748873851023217, 2.792848008753788, 2.8106938645110393, 2.8284271247461903, 2.8460498941515415, 2.8635642126552705, 2.8809720581775866, 2.898275349237888, 2.9154759474226504, 2.932575659723036, 2.949576240750525, 2.9664793948382653, 2.9832867780352594, 3.0, 3.0166206257996713, 3.03315017762062, 3.0495901363953815, 3.0659419433511785, 3.082207001484488, 3.0983866769659336, 3.1144823004794873, 3.1304951684997055, 3.146426544510455, 3.1622776601683795, 3.1780497164141406, 3.1937438845342623, 3.2093613071762426, 3.22490309931942, 3.24037034920393, 3.255764119219941, 3.271085446759225, 3.286335345030997, 3.3015148038438356, 3.3166247903554, 3.331666249791536, 3.3466401061363023, 3.361547262794322, 3.3763886032268267, 3.391164991562634, 3.40587727318528, 3.420526275297414, 3.4351128074635335, 3.449637662132068];
    const exponent = builder.constant({type: 'float32', dimensions: [1]}, new Float32Array([0.5]));
    const output0 = builder.pow(input0, exponent);
    const graph = await builder.build({output0});
    const outputs = {output0: new Float32Array(utils.sizeOfShape([1, 2, 3, 4, 5]))};
    const computeResult = await context.compute(graph, {'input0': input0Data}, outputs);
    utils.checkValue(computeResult.outputs.output0, expected, utils.ctsFp32RestrictAccuracyCriteria);
  });

  it('test pow converted from sqrt_relaxed test', async () => {
    // Converted test case (from: V1_2/sqrt.mod.py)
    const builder = new MLGraphBuilder(context);
    const input0 = builder.input('input0', {type: 'float32', dimensions: [1, 2, 3, 4, 5]});
    const input0Data = new Float32Array([0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6.0, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7.0, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8.0, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 9.0, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10.0, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 11.0, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9]);
    const expected = [0.0, 0.31622776601683794, 0.4472135954999579, 0.5477225575051661, 0.6324555320336759, 0.7071067811865476, 0.7745966692414834, 0.8366600265340756, 0.8944271909999159, 0.9486832980505138, 1.0, 1.0488088481701516, 1.0954451150103321, 1.140175425099138, 1.1832159566199232, 1.224744871391589, 1.2649110640673518, 1.3038404810405297, 1.3416407864998738, 1.378404875209022, 1.4142135623730951, 1.449137674618944, 1.4832396974191326, 1.51657508881031, 1.5491933384829668, 1.5811388300841898, 1.61245154965971, 1.6431676725154984, 1.6733200530681511, 1.70293863659264, 1.7320508075688772, 1.760681686165901, 1.7888543819998317, 1.816590212458495, 1.8439088914585775, 1.8708286933869707, 1.8973665961010275, 1.9235384061671346, 1.9493588689617927, 1.9748417658131499, 2.0, 2.0248456731316584, 2.04939015319192, 2.073644135332772, 2.0976176963403033, 2.1213203435596424, 2.1447610589527217, 2.16794833886788, 2.1908902300206643, 2.2135943621178655, 2.23606797749979, 2.258317958127243, 2.280350850198276, 2.3021728866442674, 2.32379000772445, 2.345207879911715, 2.3664319132398464, 2.3874672772626644, 2.4083189157584592, 2.4289915602982237, 2.449489742783178, 2.4698178070456938, 2.4899799195977463, 2.5099800796022267, 2.5298221281347035, 2.5495097567963922, 2.569046515733026, 2.588435821108957, 2.6076809620810595, 2.6267851073127395, 2.6457513110645907, 2.6645825188948455, 2.6832815729997477, 2.701851217221259, 2.7202941017470885, 2.7386127875258306, 2.756809750418044, 2.7748873851023217, 2.792848008753788, 2.8106938645110393, 2.8284271247461903, 2.8460498941515415, 2.8635642126552705, 2.8809720581775866, 2.898275349237888, 2.9154759474226504, 2.932575659723036, 2.949576240750525, 2.9664793948382653, 2.9832867780352594, 3.0, 3.0166206257996713, 3.03315017762062, 3.0495901363953815, 3.0659419433511785, 3.082207001484488, 3.0983866769659336, 3.1144823004794873, 3.1304951684997055, 3.146426544510455, 3.1622776601683795, 3.1780497164141406, 3.1937438845342623, 3.2093613071762426, 3.22490309931942, 3.24037034920393, 3.255764119219941, 3.271085446759225, 3.286335345030997, 3.3015148038438356, 3.3166247903554, 3.331666249791536, 3.3466401061363023, 3.361547262794322, 3.3763886032268267, 3.391164991562634, 3.40587727318528, 3.420526275297414, 3.4351128074635335, 3.449637662132068];
    const exponent = builder.constant({type: 'float32', dimensions: [1]}, new Float32Array([0.5]));
    const output0 = builder.pow(input0, exponent);
    const graph = await builder.build({output0});
    const outputs = {output0: new Float32Array(utils.sizeOfShape([1, 2, 3, 4, 5]))};
    const computeResult = await context.compute(graph, {'input0': input0Data}, outputs);
    utils.checkValue(computeResult.outputs.output0, expected, utils.ctsFp32RelaxedAccuracyCriteria);
  });
});
/* eslint-disable max-len */
