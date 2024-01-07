import React from 'react'
import '@testing-library/jest-dom'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import { HashRouter } from 'react-router-dom'
import App from "../App"

const mockUseRoutes = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useRoutes: () => mockUseRoutes,
}));

test("Renders the main page", async () => {
    render(<HashRouter><App /></HashRouter>)
    expect(screen.getByText("Loading...")).toBeInTheDocument();
})