import React, { FC, useState, ChangeEvent, ReactElement } from 'react';
import { InputProps, Input } from '../Input/input';

interface DataSourceObject {
    value: string
}
export type DataSourceType<T = {}> = T & DataSourceObject
interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestion: (value: string) => DataSourceType[]|Promise<DataSourceType[]>;
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
    // const [inputHistory, setHistory] = useState<string[]>(history)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.trim()
        setInputValue(value)
        if (value) {
            // const results = fetchSuggestion(value, inputHistory)
            const results = fetchSuggestion(value)
            if (results instanceof Promise) {
                results.then(data => {
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
            {suggestion.length > 0 && generateDropdown()}
        </div>
    )
}