module.exports = {
    shadeBlend: (p, c0, c1) => {
        // http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
        let n = p < 0 ? p * -1 : p;

        if(c0.length > 7) {
            let f = c0.split(","),
                t = (c1 ? c1 : p < 0 ? "rgb(0,0,0)" : "rgb(255,255,255)").split(","),
                R = parseInt(f[0].slice(4)),
                G = parseInt(f[1]),
                B = parseInt(f[2]);

            return "rgb(" + (Math.round((parseInt(t[0].slice(4))-R)*n)+R)+","+(Math.round((parseInt(t[1])-G)*n)+G)+","+(Math.round((parseInt(t[2])-B)*n)+B)+")"
        } else {
            let f = parseInt(c0.slice(1), 16),
                t = parseInt((c1 ? c1 : p < 0 ? "#000000" : "#FFFFFF").slice(1), 16),
                R1 = f >> 16,
                G1 = f >> 8 & 0x00FF,
                B1 = f & 0x0000FF;

            return "#" + (0x1000000 + (Math.round(((t>>16)-R1)*n)+R1)*0x10000+(Math.round(((t>>8&0x00FF)-G1)*n)+G1)*0x100+(Math.round(((t&0x0000FF)-B1)*n)+B1)).toString(16).slice(1)
        }
    },
    getRandomHex: () => {
        return '#'+ ('000000' + (Math.random() * 0xFFFFFF << 0).toString(16)).slice(-6);
    }
};
