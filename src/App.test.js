import React from 'react'
import ReactDOM from 'react-dom'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

/** 
 This course is not designed to teach Test Driven Development. 
 Feel free to use this file to test your application, but it 
 is not required.
**/

describe('General app functionality', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  it('shows MyReads title', () => {
    render(<App />)
    expect(screen.getByText('MyReads')).toBeInTheDocument()
  })
  it('shows 3 shelves for books', () => {
    render(<App />)
    const bookshelves = document.getElementsByClassName('bookshelf')
    expect(bookshelves.length).toEqual(3)
  })
})

