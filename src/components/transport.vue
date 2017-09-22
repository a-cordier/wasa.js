 <style>
button {
    background-color: #B4D000;
    color: #fff;
    border: none;
}
</style>
  
 <template>
    <div id="wasa-transport">
        <button id="start" v-on:click="start">Start</button>
        <button id="stop" v-on:click="stop">Stop</button>
    </div>
</template>

<script>
import { Dispatcher, Events } from '../wasa/common/dispatcher'

export default {
    methods: {
        start() {
            Dispatcher.dispatch({
                type: Events.SEQUENCER_START,
            })
        },
        stop() {
            Dispatcher.dispatch({
                type: Events.SEQUENCER_STOP,
          
          })
        },
    }
}
</script>

 