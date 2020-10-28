import {Compilation} from './compilation';
import {NamedOperands} from './model_builder';
import {ConstantOperand, InputOperand, OutputOperand} from './operand';
import {Operation} from './operation';
import * as utils from './utils';

/**
 * [PowerPreference](https://webmachinelearning.github.io/webnn/#enumdef-powerpreference)
 */
export enum PowerPreference {
  'default' = 'default',
  'high-performance' = 'high-performance',
  'low-power' = 'low-power'
}

/**
 * [CompilationOptions](https://webmachinelearning.github.io/webnn/#dictdef-compilationoptions)
 */
export interface CompilationOptions {
  /** */
  powerPreference?: PowerPreference;
}

/**
 * [Model](https://webmachinelearning.github.io/webnn/#api-model)
 */
export class Model {
  private inputs_: Map<string, InputOperand> = new Map();
  private outputs_: Map<string, OutputOperand> = new Map();
  private constants_: ConstantOperand[] = [];

  get inputs(): Map<string, InputOperand> {
    return this.inputs_;
  }
  get outputs(): Map<string, OutputOperand> {
    return this.outputs_;
  }
  get constants(): ConstantOperand[] {
    return this.constants_;
  }

  constructor(outputs?: NamedOperands) {
    utils.assert(outputs !== undefined, 'Invalid argument');
    for (const name in outputs) {
      utils.assert(
          typeof name === 'string' && outputs[name] instanceof OutputOperand,
          'The outputs parameter is invalid.');
      this.outputs_.set(name, outputs[name] as OutputOperand);
    }
    utils.assert(this.outputs_.size !== 0, 'The outputs is empty');
    this.initialize();
  }

  /** */
  async compile(options: CompilationOptions): Promise<Compilation> {
    const compilation = await Compilation.createAndCompile(options, this);
    return compilation;
  }

  private initialize(): void {
    for (const output of this.outputs_.values()) {
      this.handleOperation(output.operation);
    }
  }

  private handleOperation(operation: Operation): void {
    for (const operand of operation.inputs) {
      if (operand instanceof InputOperand) {
        if (this.inputs_.has(operand.name)) {
          if (this.inputs_.get(operand.name) !== operand) {
            throw new Error('The name of this input is existed.');
          } else {
            continue;
          }
        }
        this.inputs_.set(operand.name, operand);
      } else if (operand instanceof ConstantOperand) {
        this.constants_.push(operand);
      } else if (operand instanceof OutputOperand) {
        this.handleOperation(operand.operation);
      }
    }
  }
}
