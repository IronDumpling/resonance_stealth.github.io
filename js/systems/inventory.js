/**
 * 背包系统管理
 */

// 仓库系统
let warehouse = {
    items: [],
    maxSize: 36
};

// 初始化仓库
function initWarehouse() {
    warehouse.items = new Array(36).fill(null);
    console.log('Warehouse initialized with 36 slots');
}

// 初始化玩家背包
function initPlayerInventory() {
    state.p.inventory = new Array(6).fill(null);
    // 初始拾荒者核心
    state.p.inventory[0] = {
        type: 'core',
        coreType: 'scavenger',
        data: CORE_TYPES.SCAVENGER
    };
    console.log('Player inventory initialized with Scavenger core');
}

// 添加物品到背包
function addToInventory(itemType) {
    if (state.p.inventory.length >= CFG.inventorySize) {
        logMsg("INVENTORY FULL");
        return false;
    }
    
    const item = {
        type: itemType,
        id: Math.random().toString(36).substr(2, 9)
    };
    
    state.p.inventory.push(item);
    
    // 更新UI
    if (typeof updateInventoryUI === 'function') {
        updateInventoryUI();
    }
    
    return true;
}

// 从背包移除物品（按类型，移除第一个匹配的）
function removeFromInventory(itemType) {
    const index = state.p.inventory.findIndex(item => item.type === itemType);
    if (index !== -1) {
        state.p.inventory.splice(index, 1);
        
        // 更新UI
        if (typeof updateInventoryUI === 'function') {
            updateInventoryUI();
        }
        
        return true;
    }
    return false;
}

// 获取背包中某类型物品的数量
function getInventoryCount(itemType) {
    return state.p.inventory.filter(item => item.type === itemType).length;
}

// 使用能量瓶
function useEnergyFlask() {
    if (getInventoryCount('energy_flask') === 0) {
        logMsg("NO ENERGY FLASK");
        return false;
    }
    
    if (state.p.en >= CFG.maxEnergy) {
        logMsg("ENERGY FULL");
        return false;
    }
    
    if (removeFromInventory('energy_flask')) {
        addEnergy(CFG.energyFlaskVal);
        logMsg(`ENERGY RESTORED (+${CFG.energyFlaskVal})`);
        spawnParticles(state.p.x, state.p.y, '#00ff00', 20);
        return true;
    }
    
    return false;
}

