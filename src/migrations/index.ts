import * as migration_20260105_201500_initial from './20260105_201500_initial';
import * as migration_20260123_005652_add_size_field from './20260123_005652_add_size_field';
import * as migration_20260123_014835 from './20260123_014835';
import * as migration_20260123_020000_add_stikktittel_field from './20260123_020000_add_stikktittel_field';
import * as migration_20260123_021000_add_front_editor from './20260123_021000_add_front_editor';
import * as migration_20260127_120000_add_theme_color_field from './20260127_120000_add_theme_color_field';
import * as migration_20260127_121000_add_front_editor_theme_color_override from './20260127_121000_add_front_editor_theme_color_override';
import * as migration_20260307_173000_add_student_activities from './20260307_173000_add_student_activities';
import * as migration_20260307_183000_add_student_activity_tips from './20260307_183000_add_student_activity_tips';

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
  {
    up: migration_20260123_020000_add_stikktittel_field.up,
    down: migration_20260123_020000_add_stikktittel_field.down,
    name: '20260123_020000_add_stikktittel_field',
  },
  {
    up: migration_20260123_021000_add_front_editor.up,
    down: migration_20260123_021000_add_front_editor.down,
    name: '20260123_021000_add_front_editor',
  },
  {
    up: migration_20260127_120000_add_theme_color_field.up,
    down: migration_20260127_120000_add_theme_color_field.down,
    name: '20260127_120000_add_theme_color_field',
  },
  {
    up: migration_20260127_121000_add_front_editor_theme_color_override.up,
    down: migration_20260127_121000_add_front_editor_theme_color_override.down,
    name: '20260127_121000_add_front_editor_theme_color_override',
  },
  {
    up: migration_20260307_173000_add_student_activities.up,
    down: migration_20260307_173000_add_student_activities.down,
    name: '20260307_173000_add_student_activities',
  },
  {
    up: migration_20260307_183000_add_student_activity_tips.up,
    down: migration_20260307_183000_add_student_activity_tips.down,
    name: '20260307_183000_add_student_activity_tips',
  },
];
