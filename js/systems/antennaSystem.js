/**
 * Antenna System
 * 天线接收系统 - 检测和接收反弹波
 */

class AntennaSystem {
    constructor() {
        // 天线参数（跟随玩家）
        this.direction = 0;  // 天线方向（弧度，跟随鼠标）
        this.range = 280;    // 接收半径
        this.angle = Math.PI / 2.5;  // 扇形角度
        
        // 接收记录
        this.receivedReflections = [];  // 当前帧接收到的反弹波
        this.reflectionHistory = [];    // 历史记录（用于统计和显示）
        
        // 性能优化：限制处理的波纹数量
        this.maxHistorySize = 1000;
    }
    
    /**
     * 更新天线方向（跟随玩家朝向/鼠标）
     * @param {number} angle - 角度（弧度）
     */
    updateDirection(angle) {
        this.direction = angle;
    }
    
    /**
     * 检测天线范围内的反弹波
     * @param {array} allWaves - 所有波纹数组
     * @param {number} playerX - 玩家X坐标
     * @param {number} playerY - 玩家Y坐标
     * @returns {array} 检测到的反弹波数组
     */
    detectReflectedWaves(allWaves, playerX, playerY) {
        // 清空当前帧的接收记录
        this.receivedReflections = [];
        
        if (!allWaves || allWaves.length === 0) return [];
        
        // 遍历所有波纹，找出反弹波
        for (const wave of allWaves) {
            // 只检测反弹波
            if (!wave.isReflectedWave) continue;
            
            // 检查距离（波纹中心到玩家的距离）
            const dx = wave.x - playerX;
            const dy = wave.y - playerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // 波纹是否在接收范围内（考虑波纹半径）
            if (distance - wave.r > this.range) continue;
            
            // 检查角度：波纹是否在扇形范围内
            const angleToWave = Math.atan2(dy, dx);
            const angleDiff = this.normalizeAngle(angleToWave - this.direction);
            
            if (Math.abs(angleDiff) > this.angle / 2) continue;
            
            // 检查波纹是否正在扩散中（避免检测已经过去的波纹）
            // 如果波纹边缘到玩家的距离在一定范围内，认为正在接触
            const edgeDistance = Math.abs(distance - wave.r);
            if (edgeDistance > CFG.waveSpeed * 3) continue;  // 允许3帧的误差
            
            // 通过所有检测，记录这个反弹波
            const reflection = {
                wave: wave,
                distance: distance,
                angle: angleToWave,
                timestamp: Date.now(),
                // 记录反弹波的起点（原始碰撞点），而不是反弹波碰撞到玩家的点
                collisionPoint: {
                    x: wave.reflectionOriginX || wave.x,
                    y: wave.reflectionOriginY || wave.y
                }
            };
            
            this.receivedReflections.push(reflection);
            
            // 标记波纹已被接收（避免重复处理）
            if (!wave._receivedByAntenna) {
                wave._receivedByAntenna = true;
                this.recordToHistory(reflection);
            }
        }
        
        return this.receivedReflections;
    }
    
    /**
     * 计算碰撞点（反弹波与天线范围的交点）
     * @param {object} wave - 波纹对象
     * @param {number} playerX - 玩家X坐标
     * @param {number} playerY - 玩家Y坐标
     * @returns {object} 碰撞点 {x, y}
     */
    calculateCollisionPoint(wave, playerX, playerY) {
        // 简化：使用波纹边缘最接近玩家的点作为碰撞点
        const dx = playerX - wave.x;
        const dy = playerY - wave.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance === 0) {
            return { x: wave.x, y: wave.y };
        }
        
        // 波纹边缘上最接近玩家的点
        const ratio = wave.r / distance;
        return {
            x: wave.x + dx * ratio,
            y: wave.y + dy * ratio
        };
    }
    
    /**
     * 记录反弹波到历史
     * @param {object} reflection - 反弹波记录
     */
    recordToHistory(reflection) {
        this.reflectionHistory.push(reflection);
        
        // 限制历史大小
        if (this.reflectionHistory.length > this.maxHistorySize) {
            this.reflectionHistory.shift();
        }
    }
    
    /**
     * 获取最近接收到的反弹波
     * @param {number} limit - 返回数量限制
     * @returns {array} 反弹波数组
     */
    getRecentReflections(limit = 10) {
        return this.reflectionHistory.slice(-limit);
    }
    
    /**
     * 规范化角度到 [-PI, PI] 范围
     * @param {number} angle - 角度（弧度）
     * @returns {number} 规范化后的角度
     */
    normalizeAngle(angle) {
        while (angle > Math.PI) angle -= Math.PI * 2;
        while (angle < -Math.PI) angle += Math.PI * 2;
        return angle;
    }
    
    /**
     * 清空历史记录
     */
    clearHistory() {
        this.reflectionHistory = [];
    }
    
    /**
     * 检查某个点是否在天线范围内
     * @param {number} x - 点的X坐标
     * @param {number} y - 点的Y坐标
     * @param {number} playerX - 玩家X坐标
     * @param {number} playerY - 玩家Y坐标
     * @returns {boolean} 是否在范围内
     */
    isInRange(x, y, playerX, playerY) {
        const dx = x - playerX;
        const dy = y - playerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > this.range) return false;
        
        const angleToPoint = Math.atan2(dy, dx);
        const angleDiff = this.normalizeAngle(angleToPoint - this.direction);
        
        return Math.abs(angleDiff) <= this.angle / 2;
    }
}

// 创建全局实例
let antennaSystem = null;

/**
 * 初始化天线系统
 */
function initAntennaSystem() {
    antennaSystem = new AntennaSystem();
    console.log('Antenna System initialized');
    return antennaSystem;
}

