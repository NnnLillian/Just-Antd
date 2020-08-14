import React, { FC, useContext, FunctionComponentElement, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';


export interface SubMenuProps {
    index?: string;
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

    const context = useContext(MenuContext)

    const openedSubMenus = context.defaultOpenSubMenus as Array<string>

    const isOpened = (index && context.mode === "vertical") ? openedSubMenus.includes(index) : false

    const [submenuOpen, setMenuOpen] = useState(isOpened)


    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index
    })

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setMenuOpen(!submenuOpen)
    }

    // 为了使submenu的打开/关闭操作更加平滑，创建setTimeOut
    let timer: any
    // handleMouse:操控鼠标行为的回调函数 toggle用来评判打开还是关闭submenu
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault()
        timer = setTimeout(() => {
            setMenuOpen(toggle)
        }, 300)
    }

    const clickEvents = context.mode === 'vertical' ? { onClick: handleClick } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : {}

    // 渲染下拉菜单中的内容
    const renderChildren = () => {
        const subMenuClasses = classNames('submenu', { 'menu-opened': submenuOpen })
        const childrenComponent = React.Children.map(children, (child, i) => {
            // FunctionComponentElement 就是 FunctionComponent实例, 用as做类型断言
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, { index: `${index}-${i}` })
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
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = "SubMenu"