import React, { FC, useState } from 'react'
import classNames from 'classnames'
import { Input } from '../Input/input'
import { Transition } from '../Transition/transition';


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

  // 下拉菜单的开合状态
  const [menuOpen, setOpen] = useState(false)

  // 更改下拉菜单开合状态的事件
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!disabled) {
      setOpen(!menuOpen)
      if (onVisibleChange) {
        onVisibleChange(!menuOpen)
      }
    }
  }

  return (
    <div>
      {/* 输入框 */}
      <div onClick={handleClick}>
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
        <Transition
          in={menuOpen}
          animation="zoom-in-top"
          timeout={300}
        >
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          </ul>
        </Transition>

      </div>
    </div>
  )
}