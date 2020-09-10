import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './autoComplete';

export default {
    title: 'Component/AutoComplete',
    component: AutoComplete,
} as Meta;

// const happy = ['sss', 'rrr', 'sdfa', 'vavwezs']
// const handleFetch = (query: string, list: string[]) => list.filter(name => name.includes(query))
interface GithubUserProps {
    login: string;
    url: string;
}
const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
        .then(
            res => {
                const clone = res.clone();
                return clone.json()
            }
        ).then(
            ({ items }) => {
                console.log(items)
                const f = items.slice(0, 10).map((item: { login: any; }) => ({ value: item.login, ...item }))
                return f;
            }
        )
}
const option = (item: DataSourceType) => {
    const items = item as DataSourceType<GithubUserProps>
    return (
        <>
            <h6>name:{items.login}</h6>
            <p>url:{items.url}</p>
        </>
    )
}

export const Default = () => (
    <AutoComplete
        fetchSuggestion={handleFetch}
        onSelect={action('selected')}
        renderOption={option}
    />
)