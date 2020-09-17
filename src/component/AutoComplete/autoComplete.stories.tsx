import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions'
import { AutoComplete, DataSourceType } from './autoComplete';


export default {
    title: 'Component/AutoComplete 自动补全输入框',
    // component: AutoComplete,
    argTypes: {
        disable: {
            description: '输入框失效状态',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' }
            },
            control: {
                type: 'boolean'
            }
        },
        size: {
            description: '设置输入框大小',
            table: {
                type: { summary: 'lg|sm' },
                defaultValue: { summary: 'sm' }
            },
            control: {
                type: 'select',
                options: ['lg', 'sm']
            }
        },
        fetchSuggestion: {
            description: '获取提示数据源方法',
            type: {
                required: true,
            },
            table: {
                type: {
                    summary: 'function(query:string)',
                    detail: '(query: string) => DataSourceType[] | Promise<DataSourceType[]>;'
                },
            },
            control: {
                type: 'null'
            }
        },
        onSelect: {
            description: '被选中时调用，参数为选中项',
            table: {
                type: {
                    summary: 'function(item: DataSourceType)',
                    detail: '(item: DataSourceType) => void;'
                },
            }
        },
        renderOption: {
            description: '自定义提示样式',
            table: {
                type: {
                    summary: 'function(item: DataSourceType)',
                    detail: '(item: DataSourceType) => ReactElement;'
                },
            }
        }
    },
    parameters: {
        docs: {
            description: { component: '**输入框自动完成功能**' },
            source: {
                code:
                    `
import { AutoComplete, DataSourceType } from './component/AutoComplete';

interface GithubUserProps {
    login: string;
    url: string;
}

const fetchFetch = (query: string) => {
    return fetch(\`https://api.github.com/search/users?q=\$\{query\}\`)
        .then(
            res => res.clone().json()
        ).then(
            ({ items }) => (items.slice(0, 10).map((item: { login: any; }) => ({ value: item.login, ...item }))
        )
    }

const renderOption = (item: DataSourceType) => {
    const items = item as DataSourceType<GithubUserProps>
    return (
        <>
            <h6>name:{items.login}</h6>
            <p>url:{items.url}</p>
        </>
    )
}

() => (
    <AutoComplete
        fetchSuggestion={fetchFetch}
        renderOption={renderOption}
    />
)   
`
            }
        }
    },
    decorators: [(Story: any) => <div style={{ width: "600px" }}><Story /></div>]
} as Meta;

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

const autoCompleteInput = (args: any) => (
    <AutoComplete
        fetchSuggestion={handleFetch}
        onSelect={action('selected')}
        renderOption={option}
        {...args}
    />
)

export const Default = autoCompleteInput.bind({})