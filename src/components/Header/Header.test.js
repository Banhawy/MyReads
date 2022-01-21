import React from 'react'
import ReactDOM from 'react-dom'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from './index'

describe('Header functionality', () => {
    it('should display app name', () => {
        render(<Header />)
        expect(screen.getByText('MyReads')).toBeInTheDocument()
    })
})