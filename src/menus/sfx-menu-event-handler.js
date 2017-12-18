import { remote } from 'electron'
import { Dispatcher } from 'wasa'
import { menuEvents } from './menu-events'

export const SfxMenuEventHandler = ({ sfxController }) => ({
	handleMenuEvent() {
		const menu = new remote.Menu()
		menu.append(new remote.MenuItem({
			label: 'destination',
			submenu: [
				{
					label: 'delay',
					click() {
						Dispatcher.dispatch(menuEvents.SFX_KNOB_TO_DELAY, sfxController)
					},
				},
			],
		}))
		menu.popup(remote.getCurrentWindow(), { async: true })
	},
})

