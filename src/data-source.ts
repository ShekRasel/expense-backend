import { DataSource } from 'typeorm';
import { Feedback } from 'src/entity/feedback.entity';
import { User } from 'src/entity/user.entity';
import { Expense } from 'src/entity/expense.entity';
import { Guest } from 'src/entity/guest.entity';
import { Admin } from 'src/entity/admin.entity';
import { Maintenance } from './entity/maintenance';

const config = new DataSource({
  type: 'postgres',
  host: 'yamabiko.proxy.rlwy.net',
  port: 54282,
  username: 'postgres',
  password: 'njlpfTwbxZhGkfuNNpGKykcJoFwTimtO',
  database: 'railway',
  entities: [User, Expense, Feedback, Guest, Admin, Maintenance],
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
});

export default config;
