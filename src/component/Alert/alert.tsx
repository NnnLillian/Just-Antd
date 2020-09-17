import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';

type AlertType = "success" | "info" | "danger" | "warning";

interface BaseAlertProps {
    /** 警告提示文字 */
    title?: string;
    /** 警告提示的辅助性文字 */
    description?: string;
    /** 自定义类名 */
    className?: string;
    /** 警告样式 */
    alertType?: AlertType;
    /** 关闭alert时触发的事件 */
    onClose?: () => void;
    /** 是否显示“关闭” */
    closable?: boolean;
}

/** 
 * 警告提示，展现需要关注的信息 
 **/
export const Alert: FC<BaseAlertProps> = (props) => {

    const [hide, setHide] = useState(false);
    const [showButton, setShowButton] = useState(false);

    const {
        title,
        description,
        className, // 用户自定义的className
        alertType,
        onClose,
        closable
    } = props;

    const classes = classNames('alt', className, {
        [`alt-${alertType}`]: alertType
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
    alertType: "info",
    closable: false,
}