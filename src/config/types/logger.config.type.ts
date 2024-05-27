export type LoggerConfigType = {
     log: LogConfigType;
     logStash: ILogStash;
     fluentBit: IFluentBit;
};

export type LogConfigType = {
     logLevel: string[];
     logFileEnabled: boolean;
     maxFilesLog: string;
     sizeLog: string;
     fileName: string
};

export interface ILogStash {
     enabled: boolean;
     host: string;
     port: number;
     protocol: string;
}

export interface IFluentBit extends ILogStash {
     prefix: string;
}
