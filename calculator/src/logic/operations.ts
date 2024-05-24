export enum Operations {
    ADD,
    SUBTRACT,
    MULTIPLY,
    DIVIDE
}

export enum Type {
    OPERAND,
    OPERATOR
}

export type ComputationStack = {
    type: Type,
    value: Operations | number
}
