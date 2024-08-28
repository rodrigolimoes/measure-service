import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';


export const appMiddleware = (app: Express): void => {
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));
};