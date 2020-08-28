import React, { ReactElement, FC, InputHTMLAttributes } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import { Icon } from '../Icon/icon';

type InputSize = 'lg' | 'sm'

/**
 * 通过鼠标或键盘输入内容，基础表单域的包装
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /** 输入框失效状态 */
    disabled?: boolean;
    /** 用户自定义的className */
    className?: string;
    /** 设置输入框大小 */
    size?: InputSize;
    /** 带有后缀图标的input */
    icon?: IconProp;
    /** 带标签的input，设置前置标签 */
    prepend?: string | ReactElement;
    /** 带标签的input，设置后置标签 */
    append?: string | ReactElement;
}

export const Input: FC<InputProps> = (props) => {
    const {
        disabled,
        size,
        icon,
        prepend,
        append,
        style,
        className,
        ...restProps
    } = props;

    const classes = classNames('input', className, {
        'disabled': disabled,
        [`input-size-${size}`]: size,
        'input-group': prepend || append,
        'input-group-append': append,
        'input-group-prepend': prepend,
    })

    return (
        <div className={classes} style={style}>
            {prepend && <div className="input-prepend">{prepend}</div>}
            {icon && <div className="input-icon"> <Icon icon={icon} /> </div>}
            <input
                className="input-inner"
                disabled={disabled}
                {...restProps}
            />
            {append && <div className="input-append">{append}</div>}
        </div>
    )
}