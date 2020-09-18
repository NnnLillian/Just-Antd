import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import { Button, ButtonType } from './button';
export default {
    title: 'Component/Button 按钮',
    component: Button,
    parameters: {
        actions: {
            handles: ['click']
        },
        docs: {
            description: {
                component:
                    `
** 按钮用于开始一个即时操作 **



<div style="font-size:1.2rem; margin-top: 4px;">何时使用</div>
<p>标记了一个（或封装一组）操作明亮，相应用户点击行为，触发相应的业务逻辑。</p>
<div style="font-size:1.2rem; margin-bottom: 4px;">引用方式</div>
<code>
import Button from './Button';
</code>

<h3 style="margin-top: 16px; margin-bottom: 0">代码演示</h3>
                `
            }
        },
    },
    // 装饰文件
    decorators: [(Story: any) => <div style={{ textAlign: "center" }}><Story /></div>],
} as Meta;

export const Default = (args: any) => <Button {...args}>Primary</Button>

Default.story = {
    name: 'Default 按钮',
    parameters: {
        docs: {
            source: {
                code: "<Button>Primary</Button>"
            }
        },
        backgrounds: {
            default: 'primary',
            values: [
                { name: 'primary', value: '#806d9e' },
                { name: 'light', value: '#fff' },
            ],
        },
    },
    argTypes: {
        btnType: {
            control: {
                type: 'select',
                options: ["primary", "danger", "warning", "link", "default"]
            },
        },
        className: {
            control: 'null',
            table: {
                defaultValue: { summary: '.btn' }
            }
        },
    },

}

const styleButton: any = (type: ButtonType, marginLeft: string) => {
    let btnName = type.replace(/^\S/, s => s.toUpperCase())
    return (
        <Button btnType={type} style={{ margin: marginLeft }}>{btnName}</Button>
    )
}

export const Style = () => (
    <>
        {styleButton("primary", "10px")}
        {styleButton("danger", "10px")}
        {styleButton("warning", "10px")}
        {styleButton("default", "10px")}
        <Button btnType="primary" disabled style={{ margin: "10px 20px 10px 10px" }}>Disabled</Button>
        <Button btnType="link" href="http://www.baidu.com" children="Baidu" />
    </>
)
Style.story = {
    name: "Type 种类",
    parameters: {
        docs: {
            description: {
                story: '六种按钮样式，设置`disabled`之后，该按钮将不可使用'
            },
            source: {
                code:
                    ` 
<Button btnType="primary">Primary</Button>
<Button btnType="danger">Danger</Button>
<Button btnType="warning">Warning</Button>
<Button btnType="primary" disabled>Disabled</Button>
<Button btnType="link" href="http://www.baidu.com" children="Baidu" />
                `
            }
        },
        controls: {
            hideNoControlsWarning: true,
        }
    },
    decorators: [(Story: any) => <div><Story /></div>]
}

export const Size = () => (
    <>
        <Button size="lg" style={{ margin: "10px" }}>Lager</Button>
        <Button size="sm">Small</Button>
    </>
)
Size.story = {
    name: "Size 尺寸",
    parameters: {
        docs: {
            description: {
                story: '按钮有大、小两中尺寸。通过设置`size`为`lg` `sm`分别把按钮设为大，小尺寸。若不设置`size`，则尺寸为小 '
            },
            source: {
                code: `
<Button size="lg">Lager</Button>
<Button size="sm">Small</Button>
                `
            }
        },
        controls: {
            hideNoControlsWarning: true,
        }
    }
}