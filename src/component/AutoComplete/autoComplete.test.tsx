import { fireEvent, render, RenderResult, wait } from '@testing-library/react';
import React from 'react';
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete';

const testArray = [
  { value: 'ab', number: 1 },
  { value: 'abc', number: 13 },
  { value: 'b', number: 2 },
  { value: 'c', number: 3 }
]

interface testArrayProps {
  number: number
}

const myOption = (item: DataSourceType) => {
  const items = item as DataSourceType<testArrayProps>
  return (
    <>
      <h6>name:{items.value}</h6>
      <p>number:{items.number}</p>
    </>
  )
}

const testProps: AutoCompleteProps = {
  fetchSuggestion: jest.fn((query) => (testArray.filter(item => item.value.includes(query)))),
  onSelect: jest.fn(),
  placeholder: 'auto-complete'
}

const testPropsWithOption: AutoCompleteProps = {
  renderOption: myOption,
  ...testProps,
  placeholder: 'auto-complete-custom-option'
}

const testPropsWithPromise: AutoCompleteProps = {
  ...testProps,
  fetchSuggestion: jest.fn((query) => (Promise.resolve(testArray.filter(item => item.value.includes(query))))),
  placeholder: 'auto-complete-promise'
}



let wrapper: RenderResult, inputNode: HTMLInputElement
describe('test AutoComplete component', () => {
  beforeEach(async () => {
    wrapper = render(<AutoComplete {...testProps} />)
    inputNode = wrapper.getByPlaceholderText('auto-complete') as HTMLInputElement
    // input change
    fireEvent.change(inputNode, { target: { value: 'a' } })
    // show dropdown, 因为debounce是setTimeout, 所以用了异步函数
    await wait(() => {
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
  })
  afterEach(() => {
    // after select the dropdown close
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
  it('test basic AutoComplete behavior', () => {
    // should have two suggestion items
    expect(wrapper.container.querySelectorAll('.suggestion-item').length).toEqual(2)
    // click the first item
    fireEvent.click(wrapper.getByText('ab'))
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 1 })
    // fill the input
    expect(inputNode.value).toBe('ab')
  })
  it('should provide de keyboard support', () => {
    const firstResult = wrapper.queryByText('ab')
    const secondResult = wrapper.queryByText('abc')

    // press keyboard down and highlight item
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(firstResult).toHaveClass('highlight-item')

    // press keyboard down again and highlight the second item
    fireEvent.keyDown(inputNode, { keyCode: 40 })
    expect(secondResult).toHaveClass('highlight-item')

    // press keyboard up and highlight the first item
    fireEvent.keyDown(inputNode, { keyCode: 38 })
    expect(firstResult).toHaveClass('highlight-item')

    // press keyboard enter and select the first item
    fireEvent.keyDown(inputNode, { keyCode: 13 })
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: 'ab', number: 1 })
    // fill the input
    expect(inputNode.value).toBe('ab')
  })
  it('press keyboard esc and close dropdown', () => {
    fireEvent.keyDown(inputNode, { keyCode: 27 })
  })
  it('click outside should hide the dropdown', () => {
    fireEvent.click(document)
    expect(wrapper.queryByText('ab')).not.toBeInTheDocument()
  })
})

describe('test auto complete with option', () => {
  it('renderOption should generate the right template', async () => {
    const wrapper = render(<AutoComplete {...testPropsWithOption} />)
    const inputNode = wrapper.getByPlaceholderText('auto-complete-custom-option') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await wait(() => {
      expect(wrapper.queryByText('name:ab')).toBeInTheDocument()
    })
  })
})

describe('test auto complete with async', () => {
  it('async fetchSuggestion should works fine', async () => {
    const wrapper = render(<AutoComplete {...testPropsWithPromise} />)
    const inputNode = wrapper.getByPlaceholderText('auto-complete-promise') as HTMLInputElement
    fireEvent.change(inputNode, { target: { value: 'a' } })
    await wait(() => {
      expect(testPropsWithPromise.fetchSuggestion).toHaveBeenCalled()
      expect(wrapper.queryByText('ab')).toBeInTheDocument()
    })
  })
})