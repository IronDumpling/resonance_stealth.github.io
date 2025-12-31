/**
 * CrtOffScene.js
 * CRT关闭场景
 */

class CrtOffScene extends Scene {
    constructor() {
        super(SCENES.CRT_OFF);
    }
    
    enter(data) {
        super.enter(data);
        
        // 设置输入上下文为CRT_CONTROL
        if (typeof inputManager !== 'undefined' && inputManager !== null) {
            inputManager.setContext(INPUT_CONTEXTS.CRT_CONTROL);
        }
        
        // 确保无线电UI可见但禁用
        if (radioUI) {
            if (radioUI.container) {
                radioUI.container.style.display = 'flex';
            }
            radioUI.deactivate();
        }
        
        // 显示提示信息
        logMsg("PRESS [ENTER] TO RESTART");
    }
    
    update(deltaTime) {
        // 等待用户按键开机
    }
    
    render(ctx, canvas) {
        // 黑屏
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 显示微弱的待机指示灯
        const time = Date.now() / 1000;
        const pulse = Math.sin(time * 2) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(0, 255, 0, ${pulse * 0.3})`;
        ctx.beginPath();
        ctx.arc(20, 20, 5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    handleInput(event) {
        // 兼容处理：支持增强事件对象和原始事件对象
        const key = (event.key || (event.originalEvent && event.originalEvent.key) || '').toLowerCase();
        const action = event.action;
        
        // Enter键重启到BootScene
        if (action === 'confirm' || key === 'enter') {
            if (sceneManager) {
                sceneManager.switchScene(SCENES.BOOT, 'fade');
            }
            return true;
        }
        return false;
    }
}

