export type Templates = 'code' | 'link' | 'image' | 'table';

export type TemplateType = {
  code: Templates,
  link: Templates,
  image: Templates,
  table: Templates
}

export const TemplateType: TemplateType = {
  code: 'code',
  link: 'link',
  image: 'image',
  table: 'table'
};

export interface TemplateValue {
  code: string,
  link: string,
  image: string,
  table: string
}

export const TemplateValue: TemplateValue = {
  code: '\n```bash\n  npm run deploy\n```\n',
  link: '[The name goes here](Your link goes here)\n',
  image: '\n![Image name here](Image url here)\n',
  table: '\n| Syntax      | Description |\n| ----------- | ----------- |\n| Header      | Title       |\n| Paragraph   | Text        |\n',
};

