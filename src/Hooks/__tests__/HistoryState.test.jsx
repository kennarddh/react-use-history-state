import { renderHook, act } from '@testing-library/react-hooks/dom'

import useHistoryState from '../HistoryState'

describe('history state', () => {
	it('should return the current state', () => {
		const { result } = renderHook(() => useHistoryState('foo'))

		expect(result.current[0]).toBe('foo')
	})

	it('should change the state', () => {
		const { result } = renderHook(() => useHistoryState('foo'))

		act(() => {
			result.current[1]('bar')
		})

		expect(result.current[0]).toBe('bar')
	})

	it('should change the state and add it to the history', () => {
		const { result } = renderHook(() => useHistoryState('foo'))

		act(() => {
			result.current[1]('bar')
		})

		expect(result.current[0]).toBe('bar')
		expect(result.current[2][3]).toEqual(['foo', 'bar'])
	})

	it('should undo the last state change', () => {
		const { result } = renderHook(() => useHistoryState('foo'))

		act(() => {
			result.current[1]('bar')
		})

		act(() => {
			result.current[2][0]()
		})

		expect(result.current[0]).toBe('foo')

		expect(result.current[2][3]).toEqual(['foo', 'bar'])
	})

	it('should redo the last state change', () => {
		const { result } = renderHook(() => useHistoryState('foo'))

		act(() => {
			result.current[1]('bar')
		})

		act(() => {
			result.current[2][0]()
		})

		expect(result.current[0]).toBe('foo')

		act(() => {
			result.current[2][1]()
		})

		expect(result.current[0]).toBe('bar')
	})

	it('should clear the history', () => {
		const { result } = renderHook(() => useHistoryState('foo'))

		act(() => {
			result.current[1]('bar')
		})

		act(() => {
			result.current[2][2]()
		})

		expect(result.current[0]).toBe('bar')

		expect(result.current[2][3]).toEqual(['bar'])
	})

	it('should not change the state if the new state is the same as the current state', () => {
		const { result } = renderHook(() => useHistoryState('foo'))

		act(() => {
			result.current[1]('foo')
		})

		expect(result.current[0]).toBe('foo')

		expect(result.current[2][3]).toEqual(['foo'])
	})

	it('should return the current history', () => {
		const { result } = renderHook(() => useHistoryState('foo'))

		expect(result.current[2][3]).toEqual(['foo'])
	})
})
