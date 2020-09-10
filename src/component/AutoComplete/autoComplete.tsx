import React, { FC, useState, ChangeEvent, ReactElement } from 'react';
import { InputProps, Input } from '../Input/input';
import { Icon } from '../Icon/icon';

interface DataSourceObject {
    value: string
}
export type DataSourceType<T = {}> = T & DataSourceObject
interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
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
    const [inputValue, setInputValue] = useState(value)
    const [loading, setLoading] = useState(false) // 是否显示loading
    // const [inputHistory, setHistory] = useState<string[]>(history)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.trim()
        setInputValue(value)
        if (value) {
            // const results = fetchSuggestion(value, inputHistory)
            const results = fetchSuggestion(value)
            if (results instanceof Promise) {
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSuggestion(data)
                })
            } else {
                setSuggestion(results)
            }
        } else {
            setSuggestion([])
        }
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setSuggestion([])
        if (onSelect) {
            onSelect(item)
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
            <ul>
                {suggestion.map((item, index) => (
                    <li key={index} onClick={() => handleSelect(item)}>
                        {renderTemplate(item)}
                    </li>
                ))}
            </ul>
        )
    }

    return (
        <div className="auto-complete">
            <Input
                value={inputValue}
                onChange={handleChange}
                // onBlur={() => handleBlur(inputValue)}
                {...restProps}
            />
            {loading && <ul><Icon icon="spinner" spin /></ul>}
            {suggestion.length > 0 && generateDropdown()}
        </div>
    )
}