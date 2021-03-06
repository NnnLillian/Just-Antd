import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button, ButtonProps } from './button';


const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: "primary",
    size: "lg",
    className: 'test-class'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

describe('test Button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        expect(element.disabled).toBe(false)
        fireEvent.click(element)
        expect(defaultProps.onClick).toBeCalled()
    })

    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Nice</Button>)
        const element = wrapper.getByText('Nice')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn-primary btn-lg test-class')
    })

    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button btnType={"link"} href="http://wwww.baidu.com">Link</Button>)
        const element = wrapper.getByText('Link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })

    it('should render disabled button when disable set to true', () => {
        const wrapper = render(<Button {...disabledProps}>Disabled</Button>)
        const element = wrapper.getByText('Disabled') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBe(true)
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toBeCalled()
    })
})