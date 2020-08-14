import React, { FC, FunctionComponentElement, useState } from 'react';
import classNames from 'classnames';
import { TabsItemProps } from './tabsItem';


export interface TabProps {
    defaultIndex?     : number;                           // 当前选中tab的index，默认为0
    customClassName?  : string;                           //自定义className
    type?             : 'line' | 'card';                  //Tabs的样式类型
    onSelect?         : (selectedIndex: number) => void   //点击Tab触发的回调函数
}

export const Tabs: FC<TabProps> = (props) => {
    const {
        defaultIndex,
        customClassName,
        type,
        onSelect,
        children
    } = props

    const [activeItem, setActiveItem] = useState(defaultIndex)

    const navClasses = classNames('tabs-nav', {
        'nav-line': type === 'line',
        'nav-card': type !== 'line'
    })

    const renderNavLinks = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<TabsItemProps>;
            const { label, disabled } = childElement.props
            const itemClasses = classNames('tabs-nav-item', {
                "is-disabled": disabled,
                "is-active": index === activeItem
            })
            return (
                <li
                    className={itemClasses}
                    key={`nav-item-${index}`}
                    onClick={(e: React.MouseEvent) => { handleClick(index, disabled) }}
                >
                    {label}
                </li>
            )
        })
    }

    const renderNavContent = () => {
        return React.Children.map(children, (child, index) => {
            if (index === activeItem)
                return child
        })
    }

    const handleClick = (index: number, disabled: boolean | undefined) => {
        if (!disabled) {
            setActiveItem(index);
            if (onSelect)
                onSelect(index)
        }
    }

    return (
        <div className={`tabs ${customClassName}`}>
            <ul className={navClasses}>
                {renderNavLinks()}
            </ul>
            <div className="tabs-content">
                {renderNavContent()}
            </div>
        </div>

    )
}

Tabs.defaultProps = {
    defaultIndex: 0,
    type: 'card'
}