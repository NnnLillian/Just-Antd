import React from 'react';
import { render, RenderResult, fireEvent, cleanup, wait } from '@testing-library/react';

import { Menu, MenuProps } from './menu';
import { MenuItem } from './menuItem';
import { SubMenu } from './subMenu';

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    mode: 'vertical',
    defaultOpenSubMenus: ['2']
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <SubMenu title="No.3">
                <MenuItem>
                    sub Item
                </MenuItem>
            </SubMenu>
            <MenuItem>No.4</MenuItem>
        </Menu>
    )
}

const createStyleFile = () => {
    const cssFile: string = `
        .submenu{
            display: none;
        }   
        .submenu.menu-opened{
            display: block;
        }
    `
    const style = document.createElement('style')
    style.type = "text/css"
    style.innerHTML = cssFile
    return style
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('test Menu and MenuItem component', () => {
    // beforeEach 这个钩子函数就表示在每个unit case开始前都会运行
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })

    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('menu test')
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })
    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('No.4')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('3')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup()
        const wrapper = render(generateMenu(testVerProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when hover on subMenu', async () => {
        expect(wrapper.queryByText('sub Item')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('No.3')
        fireEvent.mouseEnter(dropdownElement)
        await wait(() => {
            expect(wrapper.queryByText('sub Item')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('sub Item'))
        expect(testProps.onSelect).toBeCalledWith('2-0')
        fireEvent.mouseLeave(dropdownElement)
        await wait(() => {
            expect(wrapper.queryByText('sub Item')).not.toBeVisible()
        })
    })
})

let wrapper2: RenderResult

describe('test Menu and MenuItem component in vertical mode', () => {
    beforeEach(() => {
        wrapper2 = render(generateMenu(testVerProps))
        wrapper2.container.append(createStyleFile())
    })

    it('should render vertical mode when mode is set to vertical', () => {
        const menuElement = wrapper2.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })

    it('should show dropdown items when defaultOpenSubMenus contains SubMenu index subMenu for vertical mode', () => {
        const dropdownItem = wrapper2.getByText('sub Item')
        fireEvent.click(dropdownItem)
        expect(testVerProps.onSelect).toBeCalledWith('2-0')
    })

    it('should hide dropdown items when first click and show dropdown items when second click on subMenu for vertical mode',()=>{
        const dropdownItem = wrapper2.getByText('sub Item')
        // first click
        fireEvent.click(wrapper2.getByText('No.3'))
        expect(dropdownItem).not.toBeVisible()
        // second click
        fireEvent.click(wrapper2.getByText('No.3'))
        expect(dropdownItem).toBeVisible()
    })
})