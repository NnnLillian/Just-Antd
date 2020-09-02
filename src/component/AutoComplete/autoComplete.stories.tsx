import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions'
import { AutoComplete } from './autoComplete';

export default {
    title: 'Component/AutoComplete',
    component: AutoComplete,
} as Meta;

const happy = ['sss', 'rrr', 'sdfa', 'vavwezs']
const handleFetch = (query: string) => happy.filter(name => name.includes(query))


export const Default = () => (
    <AutoComplete
        fetchSuggestion={handleFetch}
        onSelect={action('selected')}
    />
)