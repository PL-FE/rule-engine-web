export default {
    id: 'root',
    label: '开始',
    nodeType: 'start',
    children: [
        {
            id: 'c1',
            label: '规则节点',
            nodeType: 'rule',
            children: [
                {
                    id: 'c1-1',
                    label: 'c1-1',
                    nodeType: 'rule',
                },
                {
                    id: 'c1-2',
                    label: 'c1-2',
                    nodeType: 'rule',
                    children: [
                        {
                            id: 'c1-2-1',
                            label: 'c1-2-1',
                            nodeType: 'rule',
                        },
                        {
                            id: 'c1-2-2',
                            label: 'c1-2-2',
                            nodeType: 'rule',
                        }
                    ]
                }
            ]
        },
        {
            id: 'c2',
            label: '评分卡',
            nodeType: 'rating',
        },
        {
            id: 'c3',
            label: '条件节点',
            nodeType: 'gateway',
            children: [
                {
                    id: 'c3-1',
                    label: 'c3-1',
                    nodeType: 'rule',
                },
                {
                    id: 'c3-2',
                    label: 'c3-2',
                    nodeType: 'rule',
                    children: [
                        {
                            id: 'c3-2-1',
                            label: 'c3-2-1',
                            nodeType: 'rule',
                        },
                        {
                            id: 'c3-2-2',
                            label: 'c3-2-2',
                            nodeType: 'rule',
                        },
                        {
                            id: 'c3-2-3',
                            label: 'c3-2-3',
                            nodeType: 'rule',
                        }
                    ]
                },
                {
                    id: 'c3-3',
                    label: 'c3-3',
                    nodeType: 'rule',
                }
            ]
        }
    ]
}