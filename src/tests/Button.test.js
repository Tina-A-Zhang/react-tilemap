import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Button from '../components/Button';

describe("", () => {
    test('zoom-in button content', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<Button ButtonType="zoom-in" />);
        const result = renderer.getRenderOutput();
        expect(result.type).toBe('button');
        expect(result.props.children).toEqual("+");
    });

    test('zoom-out button content', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<Button ButtonType="zoom-out" />);
        const result = renderer.getRenderOutput();
        expect(result.type).toBe('button');
        expect(result.props.children).toEqual("-");
    });

});
