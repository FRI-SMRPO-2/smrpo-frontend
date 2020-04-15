// TODO - niso vsi fieldi - spremeni tests in tasks v test[] in task[]
export interface Story {
  id: number;
  name: string;
  text: string;
  tests: any[];
  tasks: any[];
  business_value: number;
  priority: {id: number, name: string};
  project_id: number;
}

