import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Alert, AlertType } from './alert';

const successProps = {
    alertType: AlertType.Success,
    title: 'title',
}

const closeProps = {
    alertType: AlertType.Success,
    title: 'title',
    closeable: true,
    onClose: jest.fn()
}

describe('test Alert Component', () => {
    it('should render the correct success alert', () => {
        const { container, queryByText } = render(<Alert {...successProps} />)
        expect(queryByText('title')).toBeInTheDocument()
        expect(container.querySelector('.alt')).toHaveClass('alt-success')
    })

    it('should render the alert with close btn', () => {
        const { getByText } = render(<Alert {...closeProps} />)
        expect(getByText('+')).toBeInTheDocument()
        fireEvent.click(getByText('+'))
        expect(closeProps.onClose).toBeCalled()
    })
})