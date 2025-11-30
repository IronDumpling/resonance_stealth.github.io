// --- 配置参数 ---
const CFG = {
    // 玩家
    pSpeed: 3,
    pViewDist: 280,
    pViewAngle: Math.PI / 2.5,
    playerRadius: 14,          // 玩家碰撞半径（用于波纹命中与分割）
    maxHp: 60,
    maxEnergy: 100,         // 主能量上限
    healCost: 30,
    healVal: 30,
    energyFlaskVal: 50, // 能量瓶恢复量
    
    // 扫描与波
    forcedWaveCost: 15,
    overloadDmgRatio: 1.3,
    waveSpeed: 5,
    waveMaxDist: 1500,  // 增大扫描范围
    
    // 聚焦参数
    focusSpeed: 0.02,
    minSpread: 0.08, 
    maxSpread: Math.PI * 2,
    analyzeThreshold: 0.5,
    
    // 频率
    freqMin: 100,
    freqMax: 300,
    perfectResTol: 5,  // 完美共振容差（±5Hz）
    normalResTol: 15,  // 普通共振容差（±15Hz） 
    
    // 敌人
    eSpeedPatrol: 0.6,
    eSpeedChase: 1.5,
    stunTime: 400, 
    dmgVal: 20,
    dmgCD: 60,
    resCooldown: 120,
    
    // 波纹能量
    baseWaveEnergy: 10000,   // 波纹固定基础能量N
    energyThreshold: 0.1,    // 过载能量阈值比例
    initialRadius: 5,         // 初始半径
    
    // 信息等级阈值（基于totalEnergy）
    infoLevelClear: 500,      // 高于此值：清晰轮廓（低于则为模糊轮廓）
    infoLevelAnalyze: 2000,   // 高于此值：显示分析UI
    infoLevelLong: 8000,      // 高于此值：长期显示（低于则为短暂显示）
    
    // 阻挡物
    wallFreqs: [150, 200, 250],  // 墙壁频率选项
    wallColors: {              // 墙壁颜色映射
        150: '#333333',
        200: '#666666', 
        250: '#999999'
    },
    
    // 相机
    cameraFOV: 1.4,             // 视野缩放（1.0 = 正常，>1.0 = 放大，<1.0 = 缩小）
    cameraFollowSpeed: 0.1,     // 相机跟随速度（0-1，越大跟随越快）
    cameraSmoothing: true       // 是否启用平滑跟随
};

// --- Instruction 定义 ---
const INSTRUCTIONS = [
    { id: 0, text: "WASD移动\n鼠标移动转向", distance: 0 },
    { id: 1, text: "波纹生物都有自己的频率\n它们会被同频的波纹吸引", distance: 50 },
    { id: 2, text: "短按空格释放波，长按空格聚焦波\n波纹越聚焦，消耗能量越大", distance: 200 },
    { id: 3, text: "转动鼠标滚轮调整频率\n频率越高，消耗能量越大", distance: 350 },
    { id: 4, text: "低频会穿过\n高频会阻挡\n同频会共振", distance: 400 },
    { id: 5, text: "聚焦共振波能够使波纹生物过载\n利用这个机会靠近并解决它们", distance: 500 },
    { id: 6, text: "生物共振后会受迫释放波纹\n先消耗能量，然后是生命", distance: 600 },
    { id: 7, text: "随时捡起能量瓶\n按R使用备用能量", distance: 650 },
    { id: 8, text: "在危急时刻\n按F消耗能量，恢复生命", distance: 750 },
];

