new Vue({
    el: "#app",
    delimiters: ["<%", "%>"],
    data() {
        return {
            flags: window.flags,
            boards : {},
            mapinfo : {},
            bid : 0,
            sid : 0,
            mods : 'vn',
            mode : 'std',
            sort : 'pp',
            load : false,
            no_player : false, // soon
        };
    },
    created() {
        this.LoadData(bid, sid, mode, mods);
        this.LoadBeatmap(sort, mode, mods);
    },
    methods: {
        LoadData(bid, sid, mode, mods) {
            this.$set(this, 'mode', mode);
            this.$set(this, 'mods', mods);
            this.$set(this, 'bid', bid);
            this.$set(this, 'sid', sid);
        },
        LoadBeatmap(sort, mode, mods) {
            if (window.event)
                window.event.preventDefault();

            // window.history.replaceState('', document.title, `/beatmapsets/${sid}#${mode}/${bid}/${mods}`)
            this.$set(this, 'mode', mode);
            this.$set(this, 'mods', mods);
            this.$set(this, 'bid', bid);
            this.$set(this, 'sid', sid);
            this.$set(this, 'load', true);
            //score
            this.$axios.get(`${window.location.protocol}//api.${domain}/v1/get_map_scores`, { params: {
                mode: this.StrtoGulagInt(),
                scope: 'best',
                id: bid,
                // sort: this.sort
            }}).then(res => {
                this.boards = res.data.scores;
            });

            
            this.$axios.get(`${window.location.protocol}//api.${domain}/v1/get_map_info`, { params: {
                id: bid,
            }}).then(res => {
                this.mapinfo = res.data.map;
            });

            this.$set(this, 'load', false);
        },
        LoadScores(bid, sid, mods, mode) {
            if (window.event)
                window.event.preventDefault();

            // window.history.replaceState('', document.title, `/beatmapsets/${sid}#${mode}/${bid}/${mods}`)
        },
        scoreFormat(score) {
            var addCommas = this.addCommas;
            if (score > 1000 * 1000) {
                if (score > 1000 * 1000 * 1000)
                    return `${addCommas((score / 1000000000).toFixed(2))} billion`;
                return `${addCommas((score / 1000000).toFixed(2))} million`;
            }
            return addCommas(score);
        },
        addCommas(nStr) {
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        },
        StrtoGulagInt() {
            console.log(this.mode + "|" + this.mods)
            switch (this.mode + "|" + this.mods) {
                case 'std|vn': return 0;
                case 'taiko|vn': return 1;
                case 'catch|vn': return 2;
                case 'mania|vn': return 3;
                case 'std|rx': return 4;
                case 'taiko|rx': return 5;
                case 'catch|rx': return 6;
                case 'std|ap': return 8;
                default: return -1;
            }
        },
        StrtoModeInt() {
            switch (this.mode) {
                case 'std':
                    return 0;
                case 'taiko':
                    return 1;
                case 'catch':
                    return 2;
                case 'mania':
                    return 3;
            }
        },
        InttoModeStr() {
            switch (this.mode) {
                case 0:
                    return 'osu';
                case 1:
                    return 'taiko';
                case 2:
                    return 'catch';
                case 3:
                    return 'mania';
            }
        },
        getScoreMods(m, plus=true){
            /* eslint-disable */ 
            var NoFail = 1, Easy = 2, NoVideo = 4,  Hidden = 8,  HardRock = 16,  SuddenDeath = 32,  DoubleTime = 64,  Relax = 128,  HalfTime = 256,  Nightcore = 512, Flashlight = 1024,  Autoplay = 2048,  SpunOut = 4096,  Relax2 = 8192,  Perfect = 16384,  Key4 = 32768,  Key5 = 65536,  Key6 = 131072,  Key7 = 262144,  Key8 = 524288,  keyMod = 1015808,  FadeIn = 1048576,  Random = 2097152,  LastMod = 4194304,  Key9 = 16777216,  Key10 = 33554432,  Key1 = 67108864,  Key3 = 134217728,  Key2 = 268435456,  SCOREV2 = 536870912, r = [], hasNightcore = false, hasPF = false;

            if (m & NoFail) {
                r.push('NF');
            }
            if (m & Easy) {
                r.push('EZ');
            }
            if (m & NoVideo) {
                r.push('TD');
            }
            if (m & Hidden) {
                r.push('HD');
            }
            if (m & Nightcore) {
                r.push('NC');
                hasNightcore = true;
            }
            if (!hasNightcore && (m & DoubleTime)) {
                r.push('DT');
            }
            if (m & HardRock) {
                r.push('HR');
            }
            if (m & Perfect) {
                r.push('PF');
                hasPF = true;
            }
            if (m & Relax) {
                r.push('RX');
            }
            if (m & HalfTime) {
                r.push('HT');
            }
            if (m & Flashlight) {
                r.push('FL');
            }
            if (m & Autoplay) {
                r.push('AP');
            }
            if (m & SpunOut) {
                r.push('SO');
            }
            if (m & Relax2) {
                r.push('AP');
            }
            if (!hasPF && (m & SuddenDeath)) {
                r.push('SD');
            }
            if (m & Key4) {
                r.push('4K');
            }
            if (m & Key5) {
                r.push('5K');
            }
            if (m & Key6) {
                r.push('6K');
            }
            if (m & Key7) {
                r.push('7K');
            }
            if (m & Key8) {
                r.push('8K');
            }
            if (m & keyMod) {
                r.push('');
            }
            if (m & FadeIn) {
                r.push('FD');
            }
            if (m & Random) {
                r.push('RD');
            }
            if (m & LastMod) {
                r.push('CN');
            }
            if (m & Key9) {
                r.push('9K');
            }
            if (m & Key10) {
                r.push('10K');
            }
            if (m & Key1) {
                r.push('1K');
            }
            if (m & Key3) {
                r.push('3K');
            }
            if (m & Key2) {
                r.push('2K');
            }
            if (m & SCOREV2) {
                r.push('V2');
            }
            if (r.length > 0) {
                if (!plus) return r
                return "+ "+r;

            } else {
                return ['NM'];
            }
        },
        convertModsToFull(mods) {
            var result;
            switch(mods){
                default:
                case 'HD':
                    result = "Hidden"
                    break;
                case 'NF':
                    result = "No Fail"
                    break;
                case 'DT':
                    result = "Double Time"
                    break;
                case 'NC':
                    result = "Night Core"
                    break;
                case 'EZ':
                    result = "Easy"
                    break;
                case 'HR':
                    result = "Hard Rock"
                    break;
                case 'PF':
                    result = "Perfect"
                    break;
                case 'RX':
                    result = "Relax"
                    break;
                case 'HT':
                    result = "Half Time"
                    break;
                case 'FL':
                    result = "Flashlight"
                    break;
                case 'AUTO':
                    result = "Autoplay"
                    break;
                case 'SO':
                    result = "Spun Out"
                    break;
                case 'AP':
                    result = "AutoPliot"
                    break;
                case 'SD':
                    result = "Sudden Death"
                    break;
                case 'K4':
                    result = "4 Keys"
                    break;
                case 'K5':
                    result = "5 Keys"
                    break;
                case 'K6':
                    result = "6 Keys"
                    break;
                case 'K7':
                    result = "7 Keys"
                    break;
                case 'K8':
                    result = "8 Keys"
                    break;
                case 'K9':
                    result = "9 Keys"
                    break;
                case 'K10':
                    result = "10 Keys"
                    break;
                case 'K1':
                    result = "1 Keys"
                    break;
                case 'K2':
                    result = "2 Keys"
                    break;
                case 'K3':
                    result = "3 Keys"
                    break;
                case 'V2':
                    result = "Score V2"
                    break;
                case 'RANDOM':
                    result = "Random"
                    break;
                case 'FD':
                    result = "Fade In"
                    break;
                case 'NM':
                    result = "No Mod"
                    break;
            }
            return result; 
        },
    },
    computed: {}
});
