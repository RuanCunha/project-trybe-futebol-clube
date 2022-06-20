import { Application as App } from 'express';

const Routes = (app: App) => {
  app.get('/', (req, res) => res.status(200).json('Digdim'));
}

export default Routes;
