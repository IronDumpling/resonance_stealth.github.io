/**
 * 物品槽UI组件（统一管理物品图标显示）
 * Item Slot UI Component (unified item icon display)
 */

interface InventoryItem {
  type: string;
  coreType?: string;
  data?: unknown;
  id?: string;
}

export class ItemSlotUI {
  /**
   * 获取物品图标和颜色
   */
  static getItemIcon(item: InventoryItem | null): { icon: string; color: string } {
    if (!item) {
      return { icon: '', color: '#333333' };
    }

    switch (item.type) {
      case 'energy_bottle':
        return { icon: '⚡', color: '#00ff00' };
      case 'core_hot':
        return { icon: '◆', color: '#ff6600' };
      case 'core_cold':
        return { icon: '◇', color: '#8888ff' };
      case 'core':
        return { icon: '◉', color: '#ffaa00' };
      case 'signal_source':
        return { icon: '◍', color: '#ffaa00' };
      default:
        return { icon: '?', color: '#ffffff' };
    }
  }

  /**
   * 创建物品槽元素（用于InventoryUI）
   */
  static createInventorySlot(index: number, item: InventoryItem | null): HTMLElement {
    const slot = document.createElement('div');
    slot.className = 'inventory-slot';
    slot.id = `inv-slot-${index}`;
    
    const { icon, color } = this.getItemIcon(item);
    
    slot.style.cssText = `
      width: 50px;
      height: 50px;
      border: 2px solid ${item ? '#00ff00' : '#333333'};
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: ${color};
      box-shadow: inset 0 0 10px rgba(0, 255, 0, 0.3);
    `;
    
    slot.textContent = icon;
    
    return slot;
  }

  /**
   * 创建物品槽元素（用于RobotAssemblyScene的拖拽网格）
   */
  static createAssemblySlot(index: number, source: string, item: InventoryItem | null): HTMLElement {
    const slot = document.createElement('div');
    slot.className = 'item-slot';
    slot.dataset.index = index.toString();
    slot.dataset.source = source;
    
    if (item) {
      slot.classList.add('has-item');
      
      const { icon, color } = this.getItemIcon(item);
      
      // 根据物品类型设置背景色
      let backgroundColor = 'rgba(0, 0, 0, 0.3)';
      if (item.type === 'energy_bottle') {
        backgroundColor = 'rgba(0, 255, 0, 0.3)';
      } else if (item.type === 'core_hot') {
        backgroundColor = 'rgba(255, 100, 0, 0.3)';
      } else if (item.type === 'core_cold') {
        backgroundColor = 'rgba(136, 136, 255, 0.3)';
      } else if (item.type === 'core' || item.type === 'signal_source') {
        backgroundColor = 'rgba(255, 170, 0, 0.3)';
      }
      
      slot.style.background = backgroundColor;
      
      // 创建图标元素
      const iconElement = document.createElement('div');
      iconElement.className = 'item-icon';
      iconElement.textContent = icon;
      iconElement.style.cssText = `
        font-size: 24px;
        color: ${color};
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      `;
      slot.appendChild(iconElement);
    }
    
    return slot;
  }

  /**
   * 创建拖拽预览元素
   */
  static createDragPreview(item: InventoryItem, x: number, y: number): HTMLElement {
    const preview = document.createElement('div');
    preview.className = 'drag-preview';
    preview.style.left = (x - 25) + 'px';
    preview.style.top = (y - 25) + 'px';
    
    const { icon, color } = this.getItemIcon(item);
    
    const iconElement = document.createElement('div');
    iconElement.style.cssText = `
      font-size: 24px;
      color: ${color};
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
    `;
    iconElement.textContent = icon;
    
    preview.appendChild(iconElement);
    
    return preview;
  }

  /**
   * 更新物品槽显示（用于InventoryUI）
   */
  static updateInventorySlot(slot: HTMLElement, item: InventoryItem | null): void {
    const { icon, color } = this.getItemIcon(item);
    
    slot.textContent = icon;
    slot.style.color = color;
    slot.style.borderColor = item ? '#00ff00' : '#333333';
  }
}
