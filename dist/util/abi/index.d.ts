export declare const methodData: (method: Record<string, any>, params: any[]) => string;
export declare const decodeOutput: (outputTypes: any[], outputData: any) => any;
export declare const parseEvent: (currentAbi: any[], eventObject: Record<string, any>) => Record<string, any>;
export declare const encodeArray: (params: any[]) => any[];
export declare const deployData: (bytecode: string, method: any, params: any[]) => string;
export declare const findFunctionFromAbi: (abi: any[], type?: string, name?: string) => any;
