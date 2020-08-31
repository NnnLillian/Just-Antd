import React from 'react';
import { InputProps, Input } from './input';
import { render, fireEvent } from '@testing-library/react';


const defaultProps: InputProps = {
    onChange: jest.fn(),
    placeholder: 'test-input'
}

describe('test Input component', () => {
    it('should render the correct default Input', () => {
        const wrapper = render(<Input {...defaultProps} />)
        const testNode = wrapper.getByPlaceholderText('test-input') as HTMLInputElement
        expect(testNode).toBeInTheDocument()
        expect(testNode).toHaveClass('input-inner')
        fireEvent.change(testNode, { target: { value: '123' } })
        expect(defaultProps.onChange).toBeCalled()
        expect(testNode.value).toEqual('123')
    })

    it('should render the disabled Input on disabled property', () => {
        const wrapper = render(<Input disabled placeholder="disabled" />)
        const testNode = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
        expect(testNode.disabled).toBeTruthy()
    })

    it('should render different input sizes on size property', () => {
        const wrapper = render(<Input placeholder="size" size="lg" />)
        const testNod = wrapper.container.querySelector('.input')
        expect(testNod).toHaveClass('input-size-lg')
    })

    it('should render prepend and append element on prepend or append property', () => {
        const { queryByText, container } = render(<Input placeholder="pre" prepend="http://" append=".com" />)
        const testContainer = container.querySelector('.input')
        expect(testContainer).toHaveClass('input-group-prepend input-group')
        expect(queryByText('http://')).toBeInTheDocument()
        expect(queryByText('.com')).toBeInTheDocument()
    })
})