import React, { FC, useState, ChangeEvent } from 'react';
import { InputProps, Input } from '../Input/input';

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestion: (value: string) => string[];
    onSelect?: (item: string) => void;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        value,
        fetchSuggestion,
        onSelect,
        ...restProps
    } = props;

    const [suggestion, setSuggestion] = useState<string[]>([])
    const [inputValue, setInputValue] = useState(value)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.trim()
        setInputValue(value)
        if (value) {
            const results = fetchSuggestion(value)
            setSuggestion(results)
        } else {
            setSuggestion([])
        }
    }

    const generateDropdown = () => {
        return (
            <ul>
                {suggestion.map((item, index) => (
                    <li key={index}>
                        {item}
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
                {...restProps}
            />
            {suggestion.length>0 && generateDropdown()}
        </div>
    )
}