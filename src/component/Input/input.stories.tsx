import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Input, InputProps } from './input';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export default {
    title: 'Component/Input 输入框',
    component: Input,
    parameters: {
        actions: {
            handles: ['change']
        },
        docs: {
            description: {
                component:
                    `
** 通过鼠标或键盘输入内容，基础表单域的包装 **



<div style="font-size:1.2rem; margin-top: 4px;">何时使用</div>
<ul><li>需要用户输入表单域内容时。</li><li>提供组合型输入框，带搜索的输入框，还可以进行大小选择</li></ul>
<div style="font-size:1.2rem; margin-bottom: 4px;">引用方式</div>
<code>
import Input from './input'
</code>

<h3 style="margin-top: 16px; margin-bottom: 0">代码演示</h3>
            `
            }
        }
    },
    // 装饰文件
    decorators: [(Story: any) => <div style={{ width: "300px" }}><Story /></div>],
} as Meta;

const InputStory: Story<InputProps> = (args) => (
    <Input {...args} />
)

export const Default = InputStory.bind({})
Default.storyName = "Default 输入框"
Default.argTypes = {
    placeholder: {
        description: '输入框提示性文字',
        control: 'text',
    },
    icon: {
        control: 'text'
    },
    className: {
        control: 'text',
        table: { defaultValue: { summary: 'input' } }
    },
    disabled: {
        table: { defaultValue: { summary: 'false' } }
    },
    prepend: {
        control: 'text',
        table: { type: { summary: 'string' } }
    },
    append: {
        control: 'text',
        table: { type: { summary: 'string' } }
    }
}
Default.args = {
    placeholder: 'default'
}
Default.parameters = {
    backgrounds: {
        default: 'primary',
        values: [
            { name: 'primary', value: '#806d9e' },
            { name: 'light', value: '#fff' },
        ],
    },
    docs: {
        source: {
            code: "<Input />"
        }
    }
}

// export const disableInput = () => <Input placeholder="disabled input" disabled />
export const disableInput = InputStory.bind({})
// disableInput.story = {
//     name: '被禁用的 Input',
// }
disableInput.parameters = {
    docs: {
        source: {
            code: "<Input disabled/>"
        }
    },
    controls: {
        hideNoControlsWarning: true,
    }
}

export const iconInput = () => <Input icon="search" placeholder="input with icon" />
iconInput.story = {
    name: '带图标的 Input',
}
iconInput.parameters = {
    docs: {
        source: {
            code: "<Input icon='search' placeholder='input with icon' />"
        }
    },
    controls: { hideNoControlsWarning: true }
}

export const sizeInput = () => (
    <>
        <Input defaultValue="large size" size="lg" />
        <Input placeholder="small size" size="sm" />
    </>
)
sizeInput.story = {
    name: '不同尺寸的 Input',
    parameters: {
        docs: {
            source: {
                code: "<Input defaultValue='large size' size='lg' /> \n<Input placeholder='small size' size='sm' />"
            }
        },
        controls: { hideNoControlsWarning: true }
    }
}

export const pandInput = () => (
    <div>
        <Input defaultValue="prepend text" prepend="https//" />
        <Input defaultValue="google" append=".com" />
    </div>
)
pandInput.story = {
    name: '带前后缀的 Input',
    parameters: {
        docs: {
            source: {
                code: "<Input defaultValue='prepend text' prepend='https//' /> \n <Input defaultValue='google' append='.com' />"
            }
        },
        controls: { hideNoControlsWarning: true }
    }
}