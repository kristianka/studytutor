import type {Meta, StoryObj} from "@storybook/react";

import { Button } from "./button";

import { action } from "@storybook/addon-actions";
import exp from "constants";
import { serialize } from "v8";

const meta: Meta<typeof Button> = {
  title: "Components/ui/button",
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      description: "Button variants",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ]
    },
    size: {
      control: "select",
      description: "Button sizes",
      options: ["default", "sm", "lg", "icon"],
    },

  }

};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    size: 'sm',
    disabled: false,
    onClick: action("default click"),
    children: "Default button",
    className: "shadow-lg",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: 'sm',
    disabled: false,
    onClick: action("default click"),
    children: "Destructive button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    size: 'sm',
    disabled: false,
    onClick: action("default click"),
    children: "Outline button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: 'sm',
    disabled: false,
    onClick: action("default click"),
    children: "Secondary button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: 'sm',
    disabled: false,
    onClick: action("default click"),
    children: "Ghost button",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    size: 'sm',
    disabled: false,
    onClick: action("default click"),
    children: "Link button",
  },
};