
export const defaultStateStyles = {
    hover: {
        stroke: '#1879ff',
        lineDash: [2]
    },
    closest: {
        stroke: 'green'
    },
    active: {
        stroke: '#1879ff'
    }
}

export const defaultNodeStyle = {
    fill: '#ffffff',
    stroke: '#000000',
    radius: 5,
    lineWidth: 0.5
}

export const defaultEdgeStyle = {
    stroke: '#c1c6c9'
    // endArrow: {
    //   path: 'M 0,0 L 12, 6 L 9,0 L 12, -6 Z',
    //   fill: '#91d5ff',
    //   d: -20
    // }
}

export const defaultLayout = {
    type: 'compactBox',
    direction: 'LR',
    getId: function getId (d) {
        return d.id
    },
    getHeight: function getHeight () {
        return 16
    },
    getWidth: function getWidth () {
        return 16
    },
    getVGap: function getVGap () {
        return 40
    },
    getHGap: function getHGap () {
        return 70
    }
}

export const defaultLabelCfg = {
    style: {
        fill: '#565758',
        fontSize: 12
    }
}