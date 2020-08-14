import React, { FC, CSSProperties, createContext, useState, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';


type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
    defaultIndex?: string; // 默认那个menuItem是高亮的
    className?: string;
    mode?: MenuMode;
    style?: CSSProperties;
    onSelect?: SelectCallback;
    children?: any[];
    defaultOpenSubMenus?: string[]
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;    // 考虑到用户的使用习惯，在horizontal时，应该当鼠标悬停在sub-title上时，即可展示submenu
    defaultOpenSubMenus?: string[]
}


export const MenuContext = createContext<IMenuContext>({ index: '0' })

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

    console.log(onSelect)

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
    defaultOpenSubMenus:[]
}