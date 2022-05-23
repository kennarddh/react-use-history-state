import { useState } from 'react'

const useHistoryState = initialState => {
	const [State, SetState] = useState(initialState)
	const [History, SetHistory] = useState([initialState])
	const [Pointer, SetPointer] = useState(0)

	const ChangeState = value => {
		if (value === History.at(-1)) return

		SetState(value)

		SetHistory(history => [...history, value])

		SetPointer(pointer => pointer + 1)
	}

	const Undo = () => {
		SetState(History[Pointer - 1])

		SetPointer(pointer => pointer - 1)
	}

	const Redo = () => {
		SetState(History[Pointer + 1])

		SetPointer(pointer => pointer + 1)
	}

	return [State, ChangeState, [History, Undo, Redo]]
}

export default useHistoryState
