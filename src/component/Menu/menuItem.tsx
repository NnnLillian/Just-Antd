import React, { FC, CSSProperties, useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';

export interface MenuItemProps {
    /** 子菜单项标识 */
    index?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 用户自定义类名 */
    className?: string;
    /** 用户自定义样式 */
    style?: CSSProperties;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
    const {
        index,
        disabled,
        className,
        children,
        style
    } = props

    const context = useContext(MenuContext)

    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    })

    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index)
        }
    }

    return (
        <li className={classes}
            style={style}
            onClick={handleClick}>
            {children}
        </li>
    )
}

// displayName : React内置的静态属性，帮助我们判断类型
MenuItem.displayName = 'MenuItem'

MenuItem.defaultProps = {
    disabled: false
}