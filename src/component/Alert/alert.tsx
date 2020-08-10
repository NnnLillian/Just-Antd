import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

export enum AlertType {
    Success = 'success',
    Info = 'info',
    Danger = 'danger',
    Warning = 'warning'
}

interface BaseAlertProps {
    title?: string;
    description?: string;
    className?: string;
    alterType?: AlertType;
    onClose?: () => void;  // 关闭alert时触发的事件
    closable?: boolean;     // 是否显示“关闭”
}

export const Alert: FC<BaseAlertProps> = (props) => {

    const [hide, setHide] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const {
        title,
        description,
        className, // 用户自定义的className
        alterType,
        onClose,
        closable
    } = props;

    const classes = classNames('alt', className, {
        [`alt-${alterType}`]: alterType
    })

    const titleClass = classNames({
        'alt-description': !description,
        'alt-title': description
    })

    const handleClose = (e: React.MouseEvent) => {
        if (onClose) {
            onClose()
        } else {
            setHide(true)
        }
    }

    return (
        <div style={{ display: "block" }}>
            {showButton && <span className="alt-show-btn" onClick={() => { setHide(false) }}>Show Alert</span>}
            {console.log(showButton)}
            <CSSTransition
                in={!hide}
                timeout={400}
                unmountOnExit
                onEnter={() => { setShowButton(false) }}
                onExited={() => setShowButton(true)}
            >
                <div className={classes} >
                    <div className="alt-message">
                        <span className={titleClass}> {title} </span>
                        {description && <span className="alt-description"> {description} </span>}
                    </div>
                    {closable && <button className="alt-close-button" onClick={handleClose}> + </button>}
                </div>
            </CSSTransition>
        </div>
    )
}

Alert.defaultProps = {
    alterType: AlertType.Info,
    closable: true,
}