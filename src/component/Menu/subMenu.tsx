import React, { FC, useContext, FunctionComponentElement, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';


export interface SubMenuProps {
    index?: number;
    title: string;
    className?: string;
}

export const SubMenu: FC<SubMenuProps> = (props) => {
    const {
        index,
        title,
        children,
        className
    } = props

    const [submenuOpen, setMenuOpen] = useState(false)

    const context = useContext(MenuContext)

    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index
    })

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setMenuOpen(!submenuOpen)
    }

    // 渲染下拉菜单中的内容
    const renderChildren = () => {
        const subMenuClasses = classNames('submenu', { 'menu-opened': submenuOpen })
        const childrenComponent = React.Children.map(children, (child, index) => {
            // FunctionComponentElement 就是 FunctionComponent实例, 用as做类型断言
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type
            if (displayName === 'MenuItem') {
                return childElement
            } else {
                console.error("Warning: Menu has a child which is not a MenuItem Component")
            }
        })
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }

    return (
        <li key={index} className={classes}>
            <div className="submenu-title" onClick={handleClick}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = "SubMenu"