import React, { FC, CSSProperties, createContext, useState } from 'react';
import classNames from 'classnames';


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

    return (
        <ul
            className={classes}
            style={style}
        >
            <MenuContext.Provider value={passedContext}>
                {children}
            </MenuContext.Provider>
        </ul>
    )
}