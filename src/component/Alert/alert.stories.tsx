import React from 'react';
import { Alert } from './alert';
import { Meta } from '@storybook/react/types-6-0';


export default {
    title: 'Component/Alert 警告提示',
    component: Alert,
    parameters: {
        docs: {
            description: {
                component:
                    `
** 警告提示，展现需要关注的信息 **



<div style="font-size:1.2rem; margin-top: 4px;">何时使用</div>
<ul><li>当某个页面需要想用户显示警告信息时。</li><li>非复层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。</li></ul>
<div style="font-size:1.2rem; margin-bottom: 4px;">引用方式</div>
<code>
import Alert from './Alert';
</code>

<h3 style="margin-top: 16px; margin-bottom: 0">代码演示</h3>
                `
            }
        }
    },
    decorators: [(Story: any) => <div style={{ textAlign: "center" }}><Story /></div>],
} as Meta;

export const Default = (args: any) => (
    <Alert title='this is alert!' {...args} />
)
Default.story = {
    name: 'Default 基本',
    parameters: {
        docs: {
            source: {
                code: "<Alert title='this is alert!'/>"
            }
        },
    },
    argTypes: {
        className: {
            control: 'null'
        },
    }
}

export const styleAlert = () => (
    <>
        <Alert alertType="success" description='success without close' />
        <Alert alertType="info" title='this is Info alert' />
        <Alert alertType="warning" title='Waring Waring Waring!' />
        <Alert alertType="danger" title='Danger！！！' />
    </>
)
styleAlert.story = {
    name: '不同样式的 Alter',
    parameters: {
        docs: {
            description: {
                story:
                    `
共有四种样式 \`success\`、\`info\`、\`waring\`、\`danger\`
                `
            }
        },
        controls: { hideNoControlsWarning: true }
    }
}

export const descAlert = () => <Alert alertType="danger" title='Danger' description='something is wrong' />
descAlert.story = {
    name: '添加描述的 Alert',
    parameters: {
        docs: {
            description: {
                story: '含有辅助性文字介绍的警告'
            }
        },
        controls: { hideNoControlsWarning: true }
    }
}

export const closeAlert = () => <Alert alertType="info" title='this alert can be closed' closable={true} />
closeAlert.story = {
    name: '可关闭的 Alert',
    parameters: {
        docs: {
            description: {
                story: '默认显示关闭按钮，点击可关闭警告提示'
            }
        },
        controls: { hideNoControlsWarning: true }
    }
}