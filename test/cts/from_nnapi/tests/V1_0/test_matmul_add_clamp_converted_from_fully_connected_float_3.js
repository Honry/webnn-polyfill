'use strict';
import * as utils from '../../../../utils.js';

/* eslint-disable max-len */
describe('CTS converted from NNAPI CTS', function() {
  const context = navigator.ml.createContext();

  it('test matmul + add + clamp converted from fully_connected_float_3 test', async function() {
    // Converted test case (from: V1_0/fully_connected_float_3.mod.py)
    const builder = new MLGraphBuilder(context);
    const op1 = builder.input('op1', {type: 'float32', dimensions: [2, 2]});
    const op1Data = new Float32Array([1, 2, 2, 1]);
    const op2 = builder.constant({type: 'float32', dimensions: [2, 1]}, new Float32Array([2, 4]));
    const b0 = builder.constant({type: 'float32', dimensions: [1]}, new Float32Array([1]));
    const expected = [11, 9];
    const interOut0 = builder.matmul(op1, op2);
    const interOut1 = builder.add(interOut0, b0);
    const op3 = builder.clamp(interOut1);
    const graph = await builder.build({op3});
    const outputs = await graph.compute({'op1': {data: op1Data}});
    utils.checkValue(outputs.op3.data, expected, utils.ctsFp32RestrictAccuracyCriteria);
  });
});
/* eslint-disable max-len */
