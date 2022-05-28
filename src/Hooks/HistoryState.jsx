import { useState, useCallback } from 'react'

const useHistoryState = (initialState, options = {}) => {
	const [State, SetState] = useState(initialState)
	const [History, SetHistory] = useState([initialState])
	const [Pointer, SetPointer] = useState(0)

	const ChangeState = useCallback(
		value => {
			if (value === History[History.length - 1]) return false

			SetState(value)

			SetHistory(history => {
				if (Pointer === history.length - 1) return [...history, value]

				return [...history.slice(0, Pointer + 1), value]
			})

			SetPointer(pointer => pointer + 1)

			if (options.onChangeState) {
				options.onChangeState(History[Pointer], value)
			}

			return true
		},
		[History, options, Pointer]
	)

	const Undo = useCallback(() => {
		if (Pointer === 0) return false

		SetState(History[Pointer - 1])

		SetPointer(pointer => pointer - 1)

		if (options.onUndo) {
			options.onUndo(History[Pointer], History[Pointer - 1])
		}

		return true
	}, [History, Pointer, options])

	const Redo = useCallback(() => {
		if (Pointer === History.length - 1) return false

		SetState(History[Pointer + 1])

		SetPointer(pointer => pointer + 1)

		if (options.onRedo) {
			options.onRedo(History[Pointer], History[Pointer + 1])
		}

		return true
	}, [History, Pointer, options])

	const ClearHistory = useCallback(() => {
		SetHistory([State])
		SetPointer(0)

		if (options.onClearHistory) {
			options.onClearHistory(History, [State])
		}

		return true
	}, [History, State, options])

	return [State, ChangeState, [Undo, Redo, ClearHistory, History]]
}

export default useHistoryState
