import React, { FC, CSSProperties, createContext, useState, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';


type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: number) => void

export interface MenuProps {
    defaultIndex?: number; // 默认那个menuItem是高亮的
    className?: string;
    mode?: MenuMode;
    style?: CSSProperties;
    onSelect?: SelectCallback;
    children?: any[];
}

interface IMenuContext {
    index: number;
    onSelect?: SelectCallback;
}


export const MenuContext = createContext<IMenuContext>({ index: 0 })

export const Menu: FC<MenuProps> = (props) => {
    const {
        className,
        mode,
        style,
        children,
        defaultIndex,
        onSelect
    } = props;

    console.log(onSelect)

    const [currentActive, setActive] = useState(defaultIndex)

    const classes = classNames('menu', className, {
        'menu-horizontal': mode === 'horizontal',
        'menu-vertical': mode === 'vertical'
    })

    const handleClick = (index: number) => {
        setActive(index);
        if (onSelect) {
            onSelect(index)
        }
    }

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            // FunctionComponentElement 就是 FunctionComponent实例
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index })
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