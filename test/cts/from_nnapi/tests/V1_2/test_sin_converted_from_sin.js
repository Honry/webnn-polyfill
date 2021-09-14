'use strict';
import * as utils from '../../../../utils.js';

/* eslint-disable max-len */
describe('CTS converted from NNAPI CTS', function() {
  const context = navigator.ml.createContext();

  it('test sin converted from sin test', function() {
    // Converted test case (from: V1_2/sin.mod.py)
    const builder = new MLGraphBuilder(context);
    const input0 = builder.input('input0', {type: 'float32', dimensions: [1, 2, 3, 4, 5]});
    const input0Data = new Float32Array([-6.0, -5.9, -5.8, -5.7, -5.6, -5.5, -5.4, -5.3, -5.2, -5.1, -5.0, -4.9, -4.8, -4.7, -4.6, -4.5, -4.4, -4.3, -4.2, -4.1, -4.0, -3.9, -3.8, -3.7, -3.6, -3.5, -3.4, -3.3, -3.2, -3.1, -3.0, -2.9, -2.8, -2.7, -2.6, -2.5, -2.4, -2.3, -2.2, -2.1, -2.0, -1.9, -1.8, -1.7, -1.6, -1.5, -1.4, -1.3, -1.2, -1.1, -1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9]);
    const expected = [0.27941549819892586, 0.373876664830236, 0.46460217941375737, 0.5506855425976376, 0.6312666378723216, 0.7055403255703919, 0.7727644875559871, 0.8322674422239013, 0.8834546557201531, 0.9258146823277325, 0.9589242746631385, 0.9824526126243325, 0.9961646088358407, 0.9999232575641008, 0.9936910036334644, 0.977530117665097, 0.951602073889516, 0.9161659367494549, 0.8715757724135882, 0.8182771110644103, 0.7568024953079282, 0.6877661591839738, 0.6118578909427189, 0.5298361409084934, 0.44252044329485246, 0.35078322768961984, 0.2555411020268312, 0.1577456941432482, 0.058374143427580086, -0.04158066243329049, -0.1411200080598672, -0.23924932921398243, -0.3349881501559051, -0.4273798802338298, -0.5155013718214642, -0.5984721441039565, -0.675463180551151, -0.7457052121767203, -0.8084964038195901, -0.8632093666488737, -0.9092974268256817, -0.9463000876874145, -0.9738476308781951, -0.9916648104524686, -0.9995736030415051, -0.9974949866040544, -0.9854497299884601, -0.963558185417193, -0.9320390859672263, -0.8912073600614354, -0.8414709848078965, -0.7833269096274834, -0.7173560908995228, -0.644217687237691, -0.5646424733950354, -0.479425538604203, -0.3894183423086505, -0.29552020666133955, -0.19866933079506122, -0.09983341664682815, 0.0, 0.09983341664682815, 0.19866933079506122, 0.29552020666133955, 0.3894183423086505, 0.479425538604203, 0.5646424733950354, 0.644217687237691, 0.7173560908995228, 0.7833269096274834, 0.8414709848078965, 0.8912073600614354, 0.9320390859672263, 0.963558185417193, 0.9854497299884601, 0.9974949866040544, 0.9995736030415051, 0.9916648104524686, 0.9738476308781951, 0.9463000876874145, 0.9092974268256817, 0.8632093666488737, 0.8084964038195901, 0.7457052121767203, 0.675463180551151, 0.5984721441039565, 0.5155013718214642, 0.4273798802338298, 0.3349881501559051, 0.23924932921398243, 0.1411200080598672, 0.04158066243329049, -0.058374143427580086, -0.1577456941432482, -0.2555411020268312, -0.35078322768961984, -0.44252044329485246, -0.5298361409084934, -0.6118578909427189, -0.6877661591839738, -0.7568024953079282, -0.8182771110644103, -0.8715757724135882, -0.9161659367494549, -0.951602073889516, -0.977530117665097, -0.9936910036334644, -0.9999232575641008, -0.9961646088358407, -0.9824526126243325, -0.9589242746631385, -0.9258146823277325, -0.8834546557201531, -0.8322674422239013, -0.7727644875559871, -0.7055403255703919, -0.6312666378723216, -0.5506855425976376, -0.46460217941375737, -0.373876664830236];
    const output0 = builder.sin(input0);
    const graph = builder.build({output0});
    const outputs = {output0: new Float32Array(utils.sizeOfShape([1, 2, 3, 4, 5]))};
    graph.compute({'input0': input0Data}, outputs);
    utils.checkValue(outputs.output0, expected, utils.ctsFp32RestrictAccuracyCriteria);
  });

  it('test sin converted from sin_relaxed test', function() {
    // Converted test case (from: V1_2/sin.mod.py)
    const builder = new MLGraphBuilder(context);
    const input0 = builder.input('input0', {type: 'float32', dimensions: [1, 2, 3, 4, 5]});
    const input0Data = new Float32Array([-6.0, -5.9, -5.8, -5.7, -5.6, -5.5, -5.4, -5.3, -5.2, -5.1, -5.0, -4.9, -4.8, -4.7, -4.6, -4.5, -4.4, -4.3, -4.2, -4.1, -4.0, -3.9, -3.8, -3.7, -3.6, -3.5, -3.4, -3.3, -3.2, -3.1, -3.0, -2.9, -2.8, -2.7, -2.6, -2.5, -2.4, -2.3, -2.2, -2.1, -2.0, -1.9, -1.8, -1.7, -1.6, -1.5, -1.4, -1.3, -1.2, -1.1, -1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9]);
    const expected = [0.27941549819892586, 0.373876664830236, 0.46460217941375737, 0.5506855425976376, 0.6312666378723216, 0.7055403255703919, 0.7727644875559871, 0.8322674422239013, 0.8834546557201531, 0.9258146823277325, 0.9589242746631385, 0.9824526126243325, 0.9961646088358407, 0.9999232575641008, 0.9936910036334644, 0.977530117665097, 0.951602073889516, 0.9161659367494549, 0.8715757724135882, 0.8182771110644103, 0.7568024953079282, 0.6877661591839738, 0.6118578909427189, 0.5298361409084934, 0.44252044329485246, 0.35078322768961984, 0.2555411020268312, 0.1577456941432482, 0.058374143427580086, -0.04158066243329049, -0.1411200080598672, -0.23924932921398243, -0.3349881501559051, -0.4273798802338298, -0.5155013718214642, -0.5984721441039565, -0.675463180551151, -0.7457052121767203, -0.8084964038195901, -0.8632093666488737, -0.9092974268256817, -0.9463000876874145, -0.9738476308781951, -0.9916648104524686, -0.9995736030415051, -0.9974949866040544, -0.9854497299884601, -0.963558185417193, -0.9320390859672263, -0.8912073600614354, -0.8414709848078965, -0.7833269096274834, -0.7173560908995228, -0.644217687237691, -0.5646424733950354, -0.479425538604203, -0.3894183423086505, -0.29552020666133955, -0.19866933079506122, -0.09983341664682815, 0.0, 0.09983341664682815, 0.19866933079506122, 0.29552020666133955, 0.3894183423086505, 0.479425538604203, 0.5646424733950354, 0.644217687237691, 0.7173560908995228, 0.7833269096274834, 0.8414709848078965, 0.8912073600614354, 0.9320390859672263, 0.963558185417193, 0.9854497299884601, 0.9974949866040544, 0.9995736030415051, 0.9916648104524686, 0.9738476308781951, 0.9463000876874145, 0.9092974268256817, 0.8632093666488737, 0.8084964038195901, 0.7457052121767203, 0.675463180551151, 0.5984721441039565, 0.5155013718214642, 0.4273798802338298, 0.3349881501559051, 0.23924932921398243, 0.1411200080598672, 0.04158066243329049, -0.058374143427580086, -0.1577456941432482, -0.2555411020268312, -0.35078322768961984, -0.44252044329485246, -0.5298361409084934, -0.6118578909427189, -0.6877661591839738, -0.7568024953079282, -0.8182771110644103, -0.8715757724135882, -0.9161659367494549, -0.951602073889516, -0.977530117665097, -0.9936910036334644, -0.9999232575641008, -0.9961646088358407, -0.9824526126243325, -0.9589242746631385, -0.9258146823277325, -0.8834546557201531, -0.8322674422239013, -0.7727644875559871, -0.7055403255703919, -0.6312666378723216, -0.5506855425976376, -0.46460217941375737, -0.373876664830236];
    const output0 = builder.sin(input0);
    const graph = builder.build({output0});
    const outputs = {output0: new Float32Array(utils.sizeOfShape([1, 2, 3, 4, 5]))};
    graph.compute({'input0': input0Data}, outputs);
    utils.checkValue(outputs.output0, expected, utils.ctsFp32RelaxedAccuracyCriteria);
  });
});
/* eslint-disable max-len */
