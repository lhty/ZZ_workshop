/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Typography from '.';

describe('Typography', () => {
  let container: Element | null = null;

  beforeEach(() => {
    container = window.document.createElement('div');
    window.document.body.appendChild(container);
  });

  afterEach(() => {
    if (container !== null) {
      unmountComponentAtNode(container);
      container.remove();
      container = null;
    }
  });

  it('render', () => {
    act(() => {
      render(<Typography />, container);
    });
    expect(container?.innerHTML).toBeDefined();
  });

  it('render with children', () => {
    act(() => {
      render(<Typography>Some text</Typography>, container);
    });
    expect(container?.textContent).toBe('Some text');
  });

  it('render with prop variant="h2"', () => {
    act(() => {
      render(
        <Typography variant="h2" size="l">
          Some text
        </Typography>,
        container,
      );
    });
    expect(container?.querySelector('h2')).not.toBeNull();
  });
});
