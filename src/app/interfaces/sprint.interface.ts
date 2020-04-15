import { Story } from './story.interface';

export interface Sprint {
  id: number;
  start_date: string;
  end_date: string;
  expected_speed: number;
  project_id: number;
  created_by: string;
  created: Date;
  updated: Date;
  stories: Story[];
}
