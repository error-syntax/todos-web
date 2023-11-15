import { type Meta, type StoryObj } from '@storybook/react';
import ListMenu from '../components/listMenu/ListMenu';

const meta = {
  title: 'Components/List Menu',
  component: ListMenu,
} satisfies Meta<typeof ListMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const empty: Story = {
  args: {
    lists: [],
  },
};

export const withItems: Story = {
  args: {
    lists: [
      {
        id: '1',
        name: 'Personal',
      },
      {
        id: '2',
        name: 'Work',
      },
      {
        id: '3',
        name: 'Projects',
      },
      {
        id: '4',
        name: 'Groceries',
      },
      {
        id: '5',
        name: 'Bugs',
      },
      {
        id: '6',
        name: 'Meetings',
      },
      {
        id: '7',
        name: 'Games',
      },
    ],
  },
};
