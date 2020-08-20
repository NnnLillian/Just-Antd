import React from 'react';
import { action } from '@storybook/addon-actions';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import Button from './button';


export default {
    title: 'Component/Button 按钮',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta;

export const Style = () => (
    <div>
        <Button btnType="danger" onClick={action('clicked')}>danger</Button>
        <Button btnType="primary" onClick={() => { }}>primary</Button>
    </div>
)

Style.story = {
    name: "Style 风格",
    parameters: {},
    decorators: [(Story: any) => <div style={{ margin: '50px' }}><Story /></div>]
}

export const Size = () => (
    <div>
        <Button  size="lg">Lager</Button>
        <Button size="sm">Small</Button>
    </div>
)

Size.story = {
    name: "Size 尺寸"
}