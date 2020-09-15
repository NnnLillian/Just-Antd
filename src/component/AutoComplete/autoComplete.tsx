import React, { FC, useState, ChangeEvent, ReactElement, KeyboardEvent, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { InputProps, Input } from '../Input/input';
import { Icon } from '../Icon/icon';
import useDebounce from '../../hooks/useDebounce';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import useClickOutside from '../../hooks/useClickOutside';
library.add(fas)

interface DataSourceObject {
    value: string
}
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestion: (value: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
    fetchFetch?: any
    // fetchSuggestion: (value: string, list: string[]) => string[];
    // history?: string[];
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        value,
        // history = [],
        fetchSuggestion,
        onSelect,
        renderOption,
        ...restProps
    } = props;

    const [suggestion, setSuggestion] = useState<DataSourceType[]>([])
    const [inputValue, setInputValue] = useState(value as string)
    const [loading, setLoading] = useState(false) // 是否显示loading
    const debouncedValue = useDebounce(inputValue, 500) // 延时数据
    const [highlightIndex, setHighlightIndex] = useState(-1)
    // useRef 在多次渲染中保持相同的引用, triggerSearch表示现在是否触发搜索功能
    const triggerSearch = useRef(false)

    // 这个ref指向组件整个的dom节点
    const componentRef = useRef<HTMLDivElement>(null)
    useClickOutside(componentRef, () => { setSuggestion([]) })
    // const [inputHistory, setHistory] = useState<string[]>(history)

    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            // const results = fetchSuggestion(value, inputHistory)
            setSuggestion([])
            const results = fetchSuggestion(debouncedValue)
            if (results instanceof Promise) {
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSuggestion(data)
                    if (data.length > 0) {
                    }
                })
            } else {
                setSuggestion(results)
            }
        } else {
            setSuggestion([])
        }
        setHighlightIndex(-1)
    }, [debouncedValue, fetchSuggestion])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.trim()
        setInputValue(value)
        // 在input内容还在改变时，suggestion的搜索状态为true
        triggerSearch.current = true;
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestion([])
        if (onSelect) {
            onSelect(item)
        }
        // 当选择完毕之后，suggestion的搜索状态为false, 避免了二次重复搜索
        triggerSearch.current = false
    }

    /**
     * 控制上下键的活动范围
     * 当前highlightIndex比0小的时候，再按向上键也没有用
     * 当highlightIndex大于展示长度时候，再按向下键也没用 */
    const highlight = (index: number) => {
        if (index < 0) index = 0;
        if (index >= suggestion.length) index = suggestion.length - 1;
        setHighlightIndex(index)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13: // 回车键
                if (suggestion[highlightIndex]) {
                    handleSelect(suggestion[highlightIndex]);
                }
                break;
            case 38: // 向上
                highlight(highlightIndex - 1)
                break;
            case 40: // 向下
                highlight(highlightIndex + 1)
                break;
            case 27: // esc
                setSuggestion([])
                break;
            default:
                break;

        }
    }

    // const handleBlur = (item: any) => {
    //     console.log('blur--', item)
    //     if (item)
    //         setHistory([...inputHistory, item])
    // }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }

    const generateDropdown = () => {
        return (
            <ul className="suggestion-list">
                {loading && <div className="suggestion-loading-icon"><Icon icon="spinner" spin /></div>}
                {suggestion.map((item, index) => {
                    const cnames = classNames('suggestion-item', {
                        'highlight-item': index === highlightIndex
                    })
                    return (<li key={index} className={cnames} onClick={() => handleSelect(item)}>
                        {renderTemplate(item)}
                    </li>)
                })}
            </ul >
        )
    }

    return (
        <div className="auto-complete" ref={componentRef}>
            {/* {loading && <div className="suggestion-loading-icon"><Icon icon="spinner" spin /></div>} */}
            <Input
                value={inputValue || ''}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                // onBlur={() => handleBlur(inputValue)}
                {...restProps}
            />
            {generateDropdown()}
        </div>
    )
}