import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Input } from './input';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export default {
    title: 'Component/Input 输入框',
    component: Input,
    parameters: {
        actions: {
            handles: ['change']
        }
    },
    // 装饰文件
    decorators: [(Story: any) => <div style={{ width: "300px", margin: "auto" }}><Story /></div>],
} as Meta;

export const Default = () => (
    <Input />
)
Default.story = {
    name: 'default 输入框',
}

export const disableInput = () => <Input placeholder="disabled input" disabled />
disableInput.story = {
    name: '被禁用的 Input',
}

export const iconInput = () => <Input icon="search" placeholder="input with icon" />
iconInput.story = {
    name: '带图标的 Input',
}

export const sizeInput = () => (
    <>
        <Input defaultValue="large size" size="lg" />
        <Input placeholder="small size" size="sm" />
    </>
)
sizeInput.story = {
    name: '不同尺寸的 Input'
}

export const pandInput = () => (
    <>
        <Input defaultValue="prepend text" prepend="https//" />
        <Input defaultValue="google" append=".com" />
    </>
)
pandInput.story = {
    name: '带前后缀的 Input'
}