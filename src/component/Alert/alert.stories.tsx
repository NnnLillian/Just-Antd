import React from 'react';
import { Alert, AlertType } from './alert';
import { Meta } from '@storybook/react/types-6-0';


export default {
    title: 'Component/Alert 警告提示',
    component: Alert,
    decorators: [(Story: any) => <div style={{ textAlign: "center" }}><Story /></div>],
} as Meta;

export const Default = () => (
    <Alert title='this is alert!' />
)
Default.story = {
    name: 'Default 基本'
}

export const styleAlert = () => (
    <>
        <Alert alertType={AlertType.Success} description='success without close' />
        <Alert alertType={AlertType.Info} title='this is Info alert' />
        <Alert alertType={AlertType.Warning} title='Waring Waring Waring!' />
        <Alert alertType={AlertType.Danger} title='Danger！！！' closable={false} />
    </>
)
styleAlert.story = {
    name: '不同样式的 Alter'
}

export const descAlert = () => (
    <>
        <Alert alertType={AlertType.Danger} title='Danger' description='something is wrong' />
    </>
)
descAlert.story = {
    name: '添加描述的 Alert'
}