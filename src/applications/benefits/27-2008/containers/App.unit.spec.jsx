import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import sinon from 'sinon';
import App from './App';

// Minimal stub for RoutedSavableApp
const mockFormConfig = { formId: '27-2008' };
let stub;

beforeEach(() => {
  stub = sinon.stub(
    require('platform/forms/save-in-progress/RoutedSavableApp'),
    'default',
  ).callsFake(({ children }) => <div data-testid="routed-savable">{children}</div>);
});

afterEach(() => {
  stub.restore();
});

describe('App container', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <App location={{ pathname: '/introduction' }}>
        <div data-testid="child">child</div>
      </App>,
    );
    expect(container).to.exist;
  });

  it('renders children', () => {
    const { getByTestId } = render(
      <App location={{ pathname: '/introduction' }}>
        <div data-testid="child-content">child</div>
      </App>,
    );
    expect(getByTestId('child-content')).to.exist;
  });
});