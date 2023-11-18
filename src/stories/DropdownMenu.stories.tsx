import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { type Meta, type StoryObj } from '@storybook/react';

import DropdownMenu from '../components/dropdownMenu';
import Icon from '../components/icon';

const meta = {
  title: 'Components/Dropdown Menu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    items: [],
    trigger: <Icon icon={faEllipsisH} />,
  },
};

export const WithItems: Story = {
  args: {
    items: [
      {
        key: 'list_delete',
        label: 'Delete List',
        handleClick: () => {
          alert('Handle Deleting List');
        },
      },
      {
        key: 'list_update',
        label: 'Update List',
        handleClick: () => {
          alert('Handle Updating List');
        },
      },
    ],
    trigger: <Icon icon={faEllipsisH} />,
  },
};

export const WithHrefItems: Story = {
  args: {
    items: [
      {
        href: 'https://google.com',
        key: 'list_delete',
        label: 'Go to Google',
      },
      {
        href: 'https://react.dev',
        key: 'list_update',
        label: 'Go to React Docs',
      },
    ],
    trigger: <Icon icon={faEllipsisH} />,
  },
};
