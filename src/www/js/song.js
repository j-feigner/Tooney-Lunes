function Song() {
    this.title = "";
    this.tracks = [];
    this.tempo = null;
    this.master_gain_level = 1.0;
    this.gain_node = null;

    // Loop through all beat data matrices and set buffer source nodes with proper delays
    this.play = function(audio_ctx) {
        var current_time = audio_ctx.currentTime;

        this.tracks.forEach((track) => {
            track.beat_data.forEach((beat, beat_index) => {
                var delay = 60 / this.tempo * beat_index;

                beat.forEach((note) => {
                    var source = audio_ctx.createBufferSource();
                    source.buffer = track.sounds[note];
                    source.connect(audio_ctx.destination);
                    source.start(current_time + delay);
                })
            })
        })
    }

    this.readGrids = function(grids) {
        grids.forEach((grid, track_index) => {
            this.tracks[track_index].beat_data = grid.getData();
        })
    }
}

function SongTrack(instrument) {
    this.instrument = instrument;
    this.sounds = [];
    this.beat_data = [];
    this.gain_level = 1.0;
    this.gain_node = null;

    loadInstrument(instrument, this.sounds);
}