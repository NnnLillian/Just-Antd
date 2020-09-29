import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { Input } from '../Input/input'


export interface SelectProps {
  /** 指定默认选中的条目 */
  defaultValue?: string | string[];
  /** 选择框默认文字 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否支持多选 */
  multiple?: boolean;
  /** select input的name属性 */
  name?: string;
  /** 选中值发生变化时触发 */
  onChange?: (selectedValue: string, selectedValues: string[]) => void;
  /** 下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void;
}

export const Select: FC<SelectProps> = (props) => {
  const {
    defaultValue,
    placeholder,
    multiple,
    disabled,
    name,
    onChange,
    onVisibleChange
  } = props;

  return (
    <div>
      {/* 输入框 */}
      <div>
        <Input
          readOnly
          name={name}
          placeholder={placeholder}
          icon="angle-down"
          disabled={disabled}
        />
      </div>
      {/* 下拉列表 */}
      <div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </div>
  )
}