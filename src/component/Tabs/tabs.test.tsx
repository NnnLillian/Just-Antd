import React from 'react';
import { render, RenderResult, getByText, fireEvent } from '@testing-library/react';
import { Tabs, TabProps } from './tabs';
import { TabsItem } from './tabsItem';

const testProps: TabProps = {
    defaultIndex: 1,
    onSelect: jest.fn()
}

let wrapper: RenderResult;
describe('test Tabs Component', () => {
    beforeEach(() => {
        wrapper = render(
            <Tabs {...testProps}>
                <TabsItem label="tab1">content1</TabsItem>
                <TabsItem label="tab2">content2</TabsItem>
                <TabsItem label="disabled" disabled>content3</TabsItem>
            </Tabs>
        )
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should render the correct default Tabs', () => {
        const { queryByText, container } = wrapper
        expect(container.querySelector('.tabs-nav')).toHaveClass('nav-card')
        const activeElement = queryByText('tab2')
        expect(activeElement).toBeInTheDocument()
        expect(activeElement).toHaveClass('is-active')
        expect(queryByText('tab1')).not.toHaveClass('is-active')
        expect(queryByText('content2')).toBeInTheDocument()
        expect(queryByText('content1')).not.toBeInTheDocument()
    })

    it('click tabItem should switch to content', () => {
        const { queryByText, getByText } = wrapper
        const clickElement = getByText('tab1')
        fireEvent.click(clickElement)
        expect(clickElement).toHaveClass('is-active')
        expect(queryByText('tab2')).not.toHaveClass('is-active')
        expect(testProps.onSelect).toBeCalledWith(0)
    })

    it('click disabled tabItem should not works', () => {
        const { getByText } = wrapper
        const disableElement = getByText('disabled')
        expect(disableElement).toHaveClass('is-disabled')
        fireEvent.click(disableElement)
        expect(disableElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalled()
    })
})