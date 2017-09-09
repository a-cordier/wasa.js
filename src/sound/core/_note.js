export const DURATIONS = Object.freeze({
	WHOLE: 1,
	HALF: 1 / 2,
	QUARTER: 1 / 4,
	EIGHTH: 1 / 8,
})

export const Note = ({ note, octave, duration }) => ({
	getNote() {
		return note
	},
	getOctave() {
		return octave
	},
	getDuration() {
		return DURATIONS[duration] || duration
	},
})

export const getFrequency = (note, octave) => {
	const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
	let keyIndex = notes.indexOf(note)
	keyIndex = keyIndex + ((octave - 1) * 12) + 1
	const base = (keyIndex - 49) / 12
	return 440 * (base ** 2)
}
