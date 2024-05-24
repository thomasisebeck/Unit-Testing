export enum Operations {
    ADD,
    SUBTRACT,
    MULTIPLY,
    DIVIDE
}

export type ComputationStack = {
    value: string
    operation: Operations | null
}
