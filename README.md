# React useHistoryState

Undo or redo changes in state

## Installation

```bash
npm install @kennarddh/react-use-history-state
```

## Usage

```js
import React from 'react'

import { useHistoryState } from '@kennarddh/react-use-history-state'

const App = () => {
	const [Count, SetCount, [Undo, Redo, History]] = useHistoryState(1)

	return (
		<>
			<p>Count: {Count}</p>
			<p>History Length: {History.length}</p>
			<button onClick={() => SetCount(Count + 1)}>increment</button>
			<button onClick={() => SetCount(Count - 1)}>decrement</button>
			<button onClick={Undo}>Undo</button>
			<button onClick={Redo}>Redo</button>
		</>
	)
}

export default App
```

## License

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contributing

![Contributors](https://img.shields.io/badge/Contributors-1-blue.svg)
