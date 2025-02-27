import { DataSource } from 'typeorm';
import { Feedback } from 'src/entity/feedback.entity';
import { User } from 'src/entity/user.entity';
import { Expense } from 'src/entity/expense.entity';
import { Guest } from 'src/entity/guest.entity';
import { Admin } from 'src/entity/admin.entity';
import { Maintenance } from './entity/maintenance';

const config = new DataSource({
  type: 'postgres',
  host: 'dpg-cuvsvqbtq21c738ud4jg-a.oregon-postgres.render.com',
  port: 5432,
  username: 'my_post_gres',
  password: 'RS6arUiPRN26HbtApSafagrGYsjvlXx4',
  database: 'dev_u9qg',
  entities: [User, Expense, Feedback, Guest, Admin, Maintenance],
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: true,
});

export default config;
