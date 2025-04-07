import * as winston from "winston";

const customFormat = winston.format.printf(({level,message, timestamp}) => {
    return `${timestamp} : ${level} : ${message}`
});

export const winstonConfig: winston.LoggerOptions = {
    format: winston.format.combine(
        winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        customFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs/combined.log',
        })
    ]
}