// 玩家相关逻辑

// 聚焦逻辑
function updateFocus() {
    if(state.keys.space) {
        if(!state.isCharging) {
            state.isCharging = true;
            state.focusLevel = 0;
        }
        if(state.isCharging) {
            state.focusLevel = Math.min(1, state.focusLevel + 0.02);
        }
    }
}

// 释放扫描
function releaseScan() {
    if(!state.isCharging) return;
    
    // 计算当前角度（弧度）
    const currentSpread = lerp(CFG.maxSpread, CFG.minSpread, state.focusLevel);
    
    // 能量消耗公式（0~10）：频率越高、角度越聚焦，消耗越大
    const freqNorm = (state.freq - CFG.freqMin) / (CFG.freqMax - CFG.freqMin); // 0~1
    const focusNorm = clamp(1 - currentSpread / CFG.maxSpread, 0, 1);          // 0~1（360°=0，极窄≈1）
    const rawCost = 5 * freqNorm + 5 * focusNorm;                              // 理论范围约0~10
    const energyCost = clamp(Math.round(rawCost), 0, 10);
    
    // 检查能量是否足够（检查最大消耗长按能量）
    if(state.p.en < energyCost) {
        logMsg("LOW ENERGY - CANNOT EMIT");
        state.isCharging = false;
        state.focusLevel = 0;
        return;
    }

    state.p.en -= energyCost;
    
    emitWave(state.p.x, state.p.y, state.p.a, currentSpread, state.freq, 'player');
    
    state.isCharging = false; 
    state.focusLevel = 0; 
    updateUI();
}

// 增加能量（拾取或奖励）
function gainEnergy(amount) {
    let remaining = amount;
    
    // 1. 先填主能量
    const spaceInMain = CFG.maxEnergy - state.p.en;
    const toMain = Math.min(spaceInMain, remaining);
    state.p.en += toMain;
    remaining -= toMain;
    
    // 2. 溢出部分存入备用
    if (remaining > 0) {
        state.p.reserveEn += remaining;
    }
}

// 统一交互逻辑 (拾取 + 处决)
function tryInteract() {
    // 1. 优先尝试处决
    const enemies = state.entities.enemies.filter(e => e.state === 'stunned' && dist(e.x,e.y,state.p.x,state.p.y) < 60);
    if(enemies.length > 0) {
        const e = enemies[0];
        state.entities.enemies = state.entities.enemies.filter(x => x !== e);
        if(e.uiElement) e.uiElement.remove();
        
        // 根据共振类型给予不同奖励
        if (e.isPerfectStun) {
            // 完美共振：能量回满
            const energyGain = CFG.maxEnergy;
            gainEnergy(energyGain);
            logMsg("PERFECT SIPHON - FULL ENERGY RESTORED");
            spawnParticles(e.x, e.y, '#00ff00', 50); // 绿色粒子
        } else {
            // 普通共振：能量+50%
            const energyGain = CFG.maxEnergy * 0.5;
            gainEnergy(energyGain);
            logMsg(`CORE SIPHONED (+${Math.floor(energyGain)} ENERGY)`);
            spawnParticles(e.x, e.y, '#00ffff', 40); // 青色粒子
        }
        
        setTimeout(spawnEnemy, 4000);
        updateUI();
        return;
    }

    // 2. 尝试拾取
    const items = state.entities.items.filter(i => dist(i.x, i.y, state.p.x, state.p.y) < 40 && i.visibleTimer > 0);
    if(items.length > 0) {
        const item = items[0];
        if(item.type === 'energy') {
            gainEnergy(CFG.energyFlaskVal);
            logMsg(`ENERGY RESTORED (+${CFG.energyFlaskVal})`);
            spawnParticles(item.x, item.y, '#00ff00', 20);
            // 移除物品
            state.entities.items = state.entities.items.filter(i => i !== item);
            updateUI();
        }
        return;
    }
}

// 玩家治疗
function updateHeal() {
    if(state.keys.f && state.p.hp < CFG.maxHp && state.p.en >= CFG.healCost) {
        state.p.en -= CFG.healCost; state.p.hp = Math.min(CFG.maxHp, state.p.hp + CFG.healVal);
        state.keys.f = false; spawnParticles(state.p.x, state.p.y, '#00ff00', 15);
        logMsg("SYSTEM REPAIRED"); updateUI();
    }
}

// 使用备用能量补充主能量（R键）
function updateReserveEnergy() {
    if (state.keys.r && state.p.reserveEn > 0 && state.p.en < CFG.maxEnergy) {
        const needed = CFG.maxEnergy - state.p.en;
        const used = Math.min(needed, state.p.reserveEn);
        state.p.en += used;
        state.p.reserveEn -= used;
        state.keys.r = false;
        logMsg(`RESERVE TRANSFERRED (+${Math.floor(used)} ENERGY)`);
        spawnParticles(state.p.x, state.p.y, '#33ccff', 15);
        updateUI();
    }
}

// 更新玩家状态
function updatePlayer() {
    updateFocus(); 
    updateHeal();
    updateReserveEnergy();
    
    // 移动
    let dx=0, dy=0;
    if(state.keys.w) dy-=1; if(state.keys.s) dy+=1;
    if(state.keys.a) dx-=1; if(state.keys.d) dx+=1;
    if(dx||dy) {
        const len = Math.hypot(dx,dy);
        const spd = state.isCharging ? CFG.pSpeed * 0.3 : CFG.pSpeed;
        const nx = state.p.x + (dx/len)*spd; const ny = state.p.y + (dy/len)*spd;
        if(!checkWall(nx, state.p.y)) state.p.x = nx;
        if(!checkWall(state.p.x, ny)) state.p.y = ny;
    }
    
    // 角度跟随鼠标
    state.p.a = Math.atan2(state.mouse.y - state.p.y, state.mouse.x - state.p.x);
    
    // 冷却时间
    if(state.p.invuln > 0) state.p.invuln--;
    if(state.p.resCool > 0) state.p.resCool--;
}

