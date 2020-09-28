import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Menu, MenuProps } from './menu';
import { MenuItem } from './menuItem';
import { SubMenu } from './subMenu';

export default {
    title: 'Component/Menu 导航菜单',
    component: Menu,
    subcomponents: { SubMenu, MenuItem },
    parameters: {
        docs: {
            description: {
                component:
                    `
** 为页面和功能提供导航的菜单列表 **



<div style="font-size:1.2rem; margin-top: 4px;">何时使用</div>
<p>导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航</p>
<ul><li>顶部导航提供全局性的类目和功能</li><li>侧边导航提供多级结构来收纳和排列网站架构</li></ul>
<div style="font-size:1.2rem; margin-bottom: 4px;">引用方式</div>
<code>
import Menu from './Menu'\n
import SubMenu from './SubMenu'\n
import MenuItem from './MenuItem'\n
</code>

<h3 style="margin-top: 16px; margin-bottom: 0">代码演示</h3>
                `
            }
        }
    },
    argTypes: {
        className: {
            control: 'null'
        },
        onSelect: {
            control: 'null',
            table: {
                type: {
                    summary: 'function(selectedIndex: string)',
                    detail: '(selectedIndex: string) => void'
                }
            }
        },
        style: {
            control: 'null'
        }
    }

} as Meta;

const defaults: Story<MenuProps> = (args) => (
    <Menu {...args}>
        <MenuItem>Navigation One</MenuItem>
        <MenuItem disabled>Navigation Two</MenuItem>
        <SubMenu title="Navigation Three - Submenu">
            <MenuItem>Option 1</MenuItem>
        </SubMenu>
    </Menu>
)
export const Default = defaults.bind({})
Default.storyName = 'Default 导航菜单'

const defaultMenus: Story<MenuProps> = (args) => (
    <Menu onSelect={(index) => { alert(index) }} {...args}>
        <MenuItem>
            Home
           </MenuItem >
        <SubMenu title="Maps">
            <MenuItem>
                Google Maps
             </MenuItem>
            <MenuItem>
                Leaflet Maps
             </MenuItem>
        </SubMenu>
        <MenuItem>
            Detail
           </MenuItem>
        <MenuItem disabled>
            Pages
           </MenuItem>
        <MenuItem>
            Setting
           </MenuItem>
    </Menu>
)

export const Horizontal = defaultMenus.bind({})
Horizontal.args = {
    mode: 'horizontal'
}
Horizontal.storyName = "顶部导航栏"
Horizontal.parameters = {
    docs: {
        description: {
            story: '水平的顶部导航菜单'
        }
    },
    controls: { hideNoControlsWarning: true }
}

export const Vertical = defaultMenus.bind({})
Vertical.args = {
    mode: 'vertical'
}
Vertical.storyName = "侧边导航栏"
Vertical.parameters = {
    docs: {
        description: {
            story: '垂直菜单，子菜单内嵌在菜单区域'
        }
    },
    controls: { hideNoControlsWarning: true }
}
