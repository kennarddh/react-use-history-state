import { useState, useCallback } from 'react'

const useHistoryState = initialState => {
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

			return true
		},
		[Pointer, History]
	)

	const Undo = useCallback(() => {
		if (Pointer === 0) return false

		SetState(History[Pointer - 1])

		SetPointer(pointer => pointer - 1)

		return true
	}, [History, Pointer])

	const Redo = useCallback(() => {
		if (Pointer === History.length - 1) return false

		SetState(History[Pointer + 1])

		SetPointer(pointer => pointer + 1)

		return true
	}, [History, Pointer])

	return [State, ChangeState, [Undo, Redo, History]]
}

export default useHistoryState
