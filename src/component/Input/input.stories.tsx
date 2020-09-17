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
            description: { component: '**通过鼠标或键盘输入内容，基础表单域的包装**' }
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
}

// export const disableInput = () => <Input placeholder="disabled input" disabled />
export const disableInput = InputStory.bind({})
// disableInput.story = {
//     name: '被禁用的 Input',
// }
disableInput.parameters = {
    docs: {
        source: {
            code: "import Input from './input' \n \n <Input disabled/>"
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
            code: "import Input from './input' \n \n <Input icon='search' placeholder='input with icon' />"
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
                code: "import Input from './input' \n \n <Input defaultValue='large size' size='lg' /> \n <Input placeholder='small size' size='sm' />"
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
                code: "import Input from './input' \n \n <Input defaultValue='prepend text' prepend='https//' /> \n <Input defaultValue='google' append='.com' />"
            }
        },
        controls: { hideNoControlsWarning: true }
    }
}