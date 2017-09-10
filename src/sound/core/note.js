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

/**
 * Computes the frequency value of the given note in the given octave
 * @param {string} note - Note in scale (english notation)
 * @param {number} octave - Octave value for note
 */
export const getFrequency = (note, octave) => {
	const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
	const base = 4 // base octave
	const n = notes.indexOf(note)
	const f0 = 440 // base frequency
	const a = 2 ** (1 / 12)
	const m = octave - base >= 0 ? ((octave - base) + 1) : 1 / ((base - octave) + 1) // multiplier
	return f0 * (a ** n) * m
}
