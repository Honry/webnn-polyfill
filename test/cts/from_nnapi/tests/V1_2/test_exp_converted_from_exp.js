'use strict';
import * as utils from '../../../../utils.js';

/* eslint-disable max-len */
describe('CTS converted from NNAPI CTS', function() {
  const context = navigator.ml.createContext();

  it('test exp converted from exp test', async function() {
    // Converted test case (from: V1_2/exp.mod.py)
    const builder = new MLGraphBuilder(context);
    const input0 = builder.input('input0', {type: 'float32', dimensions: [1, 2, 3, 4, 5]});
    const input0Data = new Float32Array([-6.0, -5.9, -5.8, -5.7, -5.6, -5.5, -5.4, -5.3, -5.2, -5.1, -5.0, -4.9, -4.8, -4.7, -4.6, -4.5, -4.4, -4.3, -4.2, -4.1, -4.0, -3.9, -3.8, -3.7, -3.6, -3.5, -3.4, -3.3, -3.2, -3.1, -3.0, -2.9, -2.8, -2.7, -2.6, -2.5, -2.4, -2.3, -2.2, -2.1, -2.0, -1.9, -1.8, -1.7, -1.6, -1.5, -1.4, -1.3, -1.2, -1.1, -1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9]);
    const expected = [0.0024787521766663585, 0.0027394448187683684, 0.0030275547453758153, 0.003345965457471272, 0.003697863716482932, 0.004086771438464067, 0.004516580942612666, 0.004991593906910217, 0.0055165644207607716, 0.006096746565515638, 0.006737946999085467, 0.007446583070924338, 0.00822974704902003, 0.009095277101695816, 0.010051835744633586, 0.011108996538242306, 0.012277339903068436, 0.013568559012200934, 0.014995576820477703, 0.016572675401761255, 0.01831563888873418, 0.02024191144580439, 0.0223707718561656, 0.024723526470339388, 0.02732372244729256, 0.0301973834223185, 0.03337326996032608, 0.036883167401240015, 0.04076220397836621, 0.0450492023935578, 0.049787068367863944, 0.05502322005640723, 0.06081006262521797, 0.06720551273974976, 0.07427357821433388, 0.0820849986238988, 0.09071795328941251, 0.10025884372280375, 0.11080315836233387, 0.1224564282529819, 0.1353352832366127, 0.14956861922263506, 0.16529888822158653, 0.18268352405273466, 0.20189651799465538, 0.22313016014842982, 0.2465969639416065, 0.2725317930340126, 0.30119421191220214, 0.33287108369807955, 0.36787944117144233, 0.4065696597405991, 0.44932896411722156, 0.4965853037914095, 0.5488116360940264, 0.6065306597126334, 0.6703200460356393, 0.7408182206817179, 0.8187307530779818, 0.9048374180359595, 1.0, 1.1051709180756477, 1.2214027581601699, 1.3498588075760032, 1.4918246976412703, 1.6487212707001282, 1.8221188003905089, 2.0137527074704766, 2.225540928492468, 2.45960311115695, 2.718281828459045, 3.0041660239464334, 3.3201169227365472, 3.6692966676192444, 4.0551999668446745, 4.4816890703380645, 4.953032424395115, 5.4739473917272, 6.0496474644129465, 6.6858944422792685, 7.38905609893065, 8.166169912567652, 9.025013499434122, 9.974182454814718, 11.023176380641601, 12.182493960703473, 13.463738035001692, 14.879731724872837, 16.444646771097048, 18.17414536944306, 20.085536923187668, 22.197951281441636, 24.532530197109352, 27.112638920657883, 29.96410004739701, 33.11545195869231, 36.59823444367799, 40.4473043600674, 44.701184493300815, 49.40244910553017, 54.598150033144236, 60.34028759736195, 66.68633104092515, 73.69979369959579, 81.45086866496814, 90.01713130052181, 99.48431564193378, 109.94717245212352, 121.51041751873485, 134.28977968493552, 148.4131591025766, 164.0219072999017, 181.27224187515122, 200.33680997479166, 221.40641620418717, 244.69193226422038, 270.42640742615254, 298.8674009670603, 330.2995599096486, 365.0374678653289];
    const output0 = builder.exp(input0);
    const graph = await builder.build({output0});
    const outputs = await graph.compute({'input0': {data: input0Data}});
    utils.checkValue(outputs.output0.data, expected, utils.ctsFp32RestrictAccuracyCriteria);
  });

  it('test exp converted from exp_relaxed test', async function() {
    // Converted test case (from: V1_2/exp.mod.py)
    const builder = new MLGraphBuilder(context);
    const input0 = builder.input('input0', {type: 'float32', dimensions: [1, 2, 3, 4, 5]});
    const input0Data = new Float32Array([-6.0, -5.9, -5.8, -5.7, -5.6, -5.5, -5.4, -5.3, -5.2, -5.1, -5.0, -4.9, -4.8, -4.7, -4.6, -4.5, -4.4, -4.3, -4.2, -4.1, -4.0, -3.9, -3.8, -3.7, -3.6, -3.5, -3.4, -3.3, -3.2, -3.1, -3.0, -2.9, -2.8, -2.7, -2.6, -2.5, -2.4, -2.3, -2.2, -2.1, -2.0, -1.9, -1.8, -1.7, -1.6, -1.5, -1.4, -1.3, -1.2, -1.1, -1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9]);
    const expected = [0.0024787521766663585, 0.0027394448187683684, 0.0030275547453758153, 0.003345965457471272, 0.003697863716482932, 0.004086771438464067, 0.004516580942612666, 0.004991593906910217, 0.0055165644207607716, 0.006096746565515638, 0.006737946999085467, 0.007446583070924338, 0.00822974704902003, 0.009095277101695816, 0.010051835744633586, 0.011108996538242306, 0.012277339903068436, 0.013568559012200934, 0.014995576820477703, 0.016572675401761255, 0.01831563888873418, 0.02024191144580439, 0.0223707718561656, 0.024723526470339388, 0.02732372244729256, 0.0301973834223185, 0.03337326996032608, 0.036883167401240015, 0.04076220397836621, 0.0450492023935578, 0.049787068367863944, 0.05502322005640723, 0.06081006262521797, 0.06720551273974976, 0.07427357821433388, 0.0820849986238988, 0.09071795328941251, 0.10025884372280375, 0.11080315836233387, 0.1224564282529819, 0.1353352832366127, 0.14956861922263506, 0.16529888822158653, 0.18268352405273466, 0.20189651799465538, 0.22313016014842982, 0.2465969639416065, 0.2725317930340126, 0.30119421191220214, 0.33287108369807955, 0.36787944117144233, 0.4065696597405991, 0.44932896411722156, 0.4965853037914095, 0.5488116360940264, 0.6065306597126334, 0.6703200460356393, 0.7408182206817179, 0.8187307530779818, 0.9048374180359595, 1.0, 1.1051709180756477, 1.2214027581601699, 1.3498588075760032, 1.4918246976412703, 1.6487212707001282, 1.8221188003905089, 2.0137527074704766, 2.225540928492468, 2.45960311115695, 2.718281828459045, 3.0041660239464334, 3.3201169227365472, 3.6692966676192444, 4.0551999668446745, 4.4816890703380645, 4.953032424395115, 5.4739473917272, 6.0496474644129465, 6.6858944422792685, 7.38905609893065, 8.166169912567652, 9.025013499434122, 9.974182454814718, 11.023176380641601, 12.182493960703473, 13.463738035001692, 14.879731724872837, 16.444646771097048, 18.17414536944306, 20.085536923187668, 22.197951281441636, 24.532530197109352, 27.112638920657883, 29.96410004739701, 33.11545195869231, 36.59823444367799, 40.4473043600674, 44.701184493300815, 49.40244910553017, 54.598150033144236, 60.34028759736195, 66.68633104092515, 73.69979369959579, 81.45086866496814, 90.01713130052181, 99.48431564193378, 109.94717245212352, 121.51041751873485, 134.28977968493552, 148.4131591025766, 164.0219072999017, 181.27224187515122, 200.33680997479166, 221.40641620418717, 244.69193226422038, 270.42640742615254, 298.8674009670603, 330.2995599096486, 365.0374678653289];
    const output0 = builder.exp(input0);
    const graph = await builder.build({output0});
    const outputs = await graph.compute({'input0': {data: input0Data}});
    utils.checkValue(outputs.output0.data, expected, utils.ctsFp32RelaxedAccuracyCriteria);
  });
});
/* eslint-disable max-len */
