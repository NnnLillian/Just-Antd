import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import Button from './button';

export default {
    title: 'Component/Button 按钮',
    component: Button,
    parameters: {
        actions: {
            handles: ['click']
        },
        docs: {
            description: {
                component: '**按钮用于开始一个即时操作**'
            },
        },
    },
    // 装饰文件
    decorators: [(Story: any) => <div style={{ textAlign: "center" }}><Story /></div>],
    // 自定义属性列表（在原有基础上添加）
    // argTypes: {
    //     disabled: {
    //       description: 'overwritten description',
    //       table: {
    //         type: { 
    //             summary: 'something short', 
    //             detail: 'something really really long' 
    //         },
    //       },
    //       control: {
    //         type: null,
    //       },
    //     },
    //   },
} as Meta;

export const Default = () => (
    <>
        <p>引入Button组件</p>
        <Button>Default</Button>
    </>
)
Default.story = {
    name: 'Button Header',
    parameters: {
        docs: {
            source: {
                code: "import Button from './button'"
            }
        }
    }
}

export const Style = () => (
    <>
        <Button btnType="danger">danger</Button>
        <Button btnType="primary">primary</Button>
    </>
)

Style.story = {
    name: "Style 风格",
    parameters: {
        docs: {
            description: {
                story: 'some story **markdown**'
            }
        }
    }
}

export const Size = () => (
    <div>
        <Button size="lg">Lager</Button>
        <Button size="sm">Small</Button>
    </div>
)
Size.story = {
    name: "Size 尺寸",
}