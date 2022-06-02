import { renderHook, act } from '@testing-library/react-hooks/dom'

import useHistoryState from '../HistoryState'

describe('history state', () => {
	it('should return the current state', () => {
		expect.assertions(1)

		const { result } = renderHook(() => useHistoryState('foo'))

		expect(result.current[0]).toBe('foo')
	})

	it('should change the state', () => {
		expect.assertions(1)

		const { result } = renderHook(() => useHistoryState('foo'))

		act(() => {
			result.current[1]('bar')
		})

		expect(result.current[0]).toBe('bar')
	})

	it('should change the state and add it to the history', () => {
		expect.assertions(2)

		const { result } = renderHook(() => useHistoryState('foo'))

		act(() => {
			result.current[1]('bar')
		})

		expect(result.current[0]).toBe('bar')
		expect(result.current[2][3]).toStrictEqual(['foo', 'bar'])
	})

	it('should undo the last state change', () => {
		expect.assertions(2)

		const { result } = renderHook(() => useHistoryState('foo'))

		act(() => {
			result.current[1]('bar')
		})

		act(() => {
			result.current[2][0]()
		})

		expect(result.current[0]).toBe('foo')

		expect(result.current[2][3]).toStrictEqual(['foo', 'bar'])
	})

	it('should redo the last state change', () => {
		expect.assertions(2)

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
		expect.assertions(2)

		const { result } = renderHook(() => useHistoryState('foo'))

		act(() => {
			result.current[1]('bar')
		})

		act(() => {
			result.current[2][2]()
		})

		expect(result.current[0]).toBe('bar')

		expect(result.current[2][3]).toStrictEqual(['bar'])
	})

	it('should not change the state if the new state is the same as the current state', () => {
		expect.assertions(2)

		const { result } = renderHook(() => useHistoryState('foo'))

		act(() => {
			result.current[1]('foo')
		})

		expect(result.current[0]).toBe('foo')

		expect(result.current[2][3]).toStrictEqual(['foo'])
	})

	it('should return the current history', () => {
		expect.assertions(1)

		const { result } = renderHook(() => useHistoryState('foo'))

		expect(result.current[2][3]).toStrictEqual(['foo'])
	})

	it('should call the onChangeState callback', () => {
		expect.assertions(1)

		const onChangeState = jest.fn()

		const { result } = renderHook(() =>
			useHistoryState('foo', { onChangeState })
		)

		act(() => {
			result.current[1]('bar')
		})

		expect(onChangeState).toHaveBeenCalledWith('foo', 'bar')
	})
})
