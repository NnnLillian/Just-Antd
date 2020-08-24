import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Menu } from './menu';
import { MenuItem } from './menuItem';
import { SubMenu } from './subMenu';

export default {
    title: 'Component/Menu 导航菜单',
    component: Menu,

} as Meta;

export const Default = () => (
    <Menu>
        <MenuItem>Navigation One</MenuItem>
        <MenuItem disabled>Navigation Two</MenuItem>
        <SubMenu title="Navigation Three - Submenu">
            <MenuItem>Option 1</MenuItem>
        </SubMenu>
    </Menu>
)

const menus = (mode: "horizontal" | "vertical") => (() => (
    <div>
        <h4>{mode}</h4>
        <Menu onSelect={(index) => { alert(index) }} mode={mode}>
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
    </div>
))

export const Horizontal = menus("horizontal")

export const Vertical = menus("vertical")