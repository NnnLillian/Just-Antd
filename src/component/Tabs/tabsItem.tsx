import React, { FC } from 'react';

export interface TabsItemProps {
    label?     : string|React.ReactElement;   //选项上面的文字
    disabled?  : boolean;                     //选项是否被禁用
}

export const TabsItem: FC<TabsItemProps> = (props) => {
    const { children } = props;
    return (
        <div className="tab-panel">
            {children}
        </div>
    )
}