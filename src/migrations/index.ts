import * as migration_20260105_201500_initial from './20260105_201500_initial';
import * as migration_20260123_005652_add_size_field from './20260123_005652_add_size_field';
import * as migration_20260123_014835 from './20260123_014835';

export const migrations = [
  {
    up: migration_20260105_201500_initial.up,
    down: migration_20260105_201500_initial.down,
    name: '20260105_201500_initial',
  },
  {
    up: migration_20260123_005652_add_size_field.up,
    down: migration_20260123_005652_add_size_field.down,
    name: '20260123_005652_add_size_field',
  },
  {
    up: migration_20260123_014835.up,
    down: migration_20260123_014835.down,
    name: '20260123_014835'
  },
];
