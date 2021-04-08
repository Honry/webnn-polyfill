'use strict';
import * as utils from '../../../../utils.js';

/* eslint-disable max-len */
describe('CTS converted from NNAPI CTS', function() {
  const context = navigator.ml.createContext();

  it('test mul + relu converted from mul_relu test', async function() {
    // Converted test case (from: V1_0/mul_relu.mod.py)
    const builder = new MLGraphBuilder(context);
    const op1 = builder.input('op1', {type: 'float32', dimensions: [1, 2, 2, 1]});
    const op1Data = new Float32Array([2, -4, 8, -16]);
    const op2 = builder.input('op2', {type: 'float32', dimensions: [1, 2, 2, 1]});
    const op2Data = new Float32Array([32, -16, -8, 4]);
    const expected = [64, 64, 0, 0];
    const interOut0 = builder.mul(op1, op2);
    const op3 = builder.relu(interOut0);
    const graph = await builder.build({op3});
    const outputs = await graph.compute({'op1': {data: op1Data}, 'op2': {data: op2Data}});
    utils.checkValue(outputs.op3.data, expected, utils.ctsFp32RestrictAccuracyCriteria);
  });
});
/* eslint-disable max-len */
