import React, { FC, CSSProperties, createContext, useState, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';


type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
    /** 初始展开的SubMenu菜单项 */
    defaultOpenSubMenus?: string[];
    /** 初始选中的菜单项 */
    defaultIndex?: string; // 默认那个menuItem是高亮的
    /** 用户自定义的className */
    className?: string;
    /** 菜单类型，支持垂直、水平两种模式 */
    mode?: MenuMode;
    /** 根节点样式 */
    style?: CSSProperties;
    /** 点击MenuItem调用此函数 */
    onSelect?: SelectCallback;
    children?: any[];
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;    // 考虑到用户的使用习惯，在horizontal时，应该当鼠标悬停在sub-title上时，即可展示submenu
    defaultOpenSubMenus?: string[]
}


export const MenuContext = createContext<IMenuContext>({ index: '0' })
/**
 * **为页面和功能提供导航的菜单列表**
 */
export const Menu: FC<MenuProps> = (props) => {
    const {
        className,
        mode,
        style,
        children,
        defaultIndex,
        onSelect,
        defaultOpenSubMenus
    } = props;

    const [currentActive, setActive] = useState(defaultIndex)

    const classes = classNames('menu', className, {
        'menu-horizontal': mode === 'horizontal',
        'menu-vertical': mode !== 'horizontal'
    })

    const handleClick = (index: string) => {
        setActive(index);
        if (onSelect) {
            onSelect(index)
        }
    }

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            // FunctionComponentElement 就是 FunctionComponent实例
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index: index.toString() })
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem Component")
            }
        })
    }

    return (
        <ul
            className={classes}
            style={style}
            data-testid="test-menu"
        >
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}