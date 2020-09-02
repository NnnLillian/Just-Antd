import React, { FC, useState, ChangeEvent, ReactElement } from 'react';
import { InputProps, Input } from '../Input/input';

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestion: (value: string, list: string[]) => string[];
    onSelect?: (item: string) => void;
    renderOption?: (item: string) => ReactElement;
    history?: string[];
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        value,
        history = [],
        fetchSuggestion,
        onSelect,
        renderOption,
        ...restProps
    } = props;

    const [suggestion, setSuggestion] = useState<string[]>([])
    const [inputValue, setInputValue] = useState(value)
    const [inputHistory, setHistory] = useState<string[]>(history)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.trim()
        setInputValue(value)
        if (value) {
            const results = fetchSuggestion(value, inputHistory)
            setSuggestion([...results, value])
        } else {
            setSuggestion([])
        }
    }

    const handleSelect = (item: string) => {
        setInputValue(item)
        setSuggestion([])
        if (onSelect) {
            onSelect(item)
        }
    }

    const handleBlur = (item: any) => {
        console.log('blur--', item)
        if (item)
            setHistory([...inputHistory, item])
    }

    const renderTemplate = (item: string) => {
        return renderOption ? renderOption(item) : item
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
                onBlur={() => handleBlur(inputValue)}
                {...restProps}
            />
            {suggestion.length > 0 && generateDropdown()}
        </div>
    )
}