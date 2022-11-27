import { DataSource, DataSourceOptions } from 'typeorm';
import * as ormconfig from '../../../ormconfig.json';

export default new DataSource(ormconfig as DataSourceOptions);
