import React, { ReactNode, FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Warning = 'warning',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children?: ReactNode;
    href?: string
}

// 将<button>和<a>原有的onClick等属性初始化到props中
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
// <button>和<a>中有些属性是互不相通的，<button>的一些属性<a>是没办法用的，所以需要将ButtonProps的这些属性都设置为可选的
// 所以选择 Partial<>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;


const Button: FC<ButtonProps> = (props) => {
    const {
        btnType,
        className,
        disabled,
        size,
        children,
        href,
        ...restProps
    } = props;

    const classes = classNames('btn',className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    })

    if (btnType === ButtonType.Link && href) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            > {children} </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button;