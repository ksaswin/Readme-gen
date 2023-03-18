export type Templates = 'code' | 'link' | 'image' | 'table';

export const TemplateType = {
  code: 'code',
  link: 'link',
  image: 'image',
  table: 'table'
};

export type TemplateType = typeof TemplateType[keyof typeof TemplateType];

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

