 <style lang="sass" scoped>
 #transport {
    button {
        display: inline-block;
        position: relative;
        width: 4vw;
        height: 3vw;
        // line-height: 18px;
        border: none;
        background-color: #444;
        color: #8ab9b5;
        margin: 5px 5px 0px 0px;
        transition: 0.2s;
        transition-delay: 0.2s;
        box-shadow: 0 1px 2px 0 rgba(0, 12, 12, .2);
        cursor: pointer;
        :focus {
            outline: 0;
        }
        i {
            font-size: 1.2vw;
        }
    }
}
</style>
  
 <template>
    <div id="transport">
        <button id="start" @click="start">
            <i class="fa fa-play" aria-hidden="true"></i>
        </button>
        <button id="stop" @click="stop">
            <i class="fa fa-stop" aria-hidden="true"></i>
        </button>
    </div>
</template>

<script>
import { Dispatcher, Events } from 'wasa'
import Knob from './knob'

export default {
    components: {
        Knob,
    },
    methods: {
        start() {
            Dispatcher.dispatch(Events.SEQUENCER_START)
        },
        stop() {
            Dispatcher.dispatch(Events.SEQUENCER_STOP)
        },
    }
}
</script>

 