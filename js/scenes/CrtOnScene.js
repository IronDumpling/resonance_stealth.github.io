/**
 * CrtOnScene.js
 * CRT开启场景 - 开机动画
 */

class CrtOnScene extends Scene {
    constructor() {
        super(SCENES.CRT_ON);
        this.animationStarted = false;
        this.animationComplete = false;
    }
    
    enter(data) {
        super.enter(data);
        this.animationStarted = false;
        this.animationComplete = false;
        
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
        
        // 触发CRT开机动画
        if (crtDisplay) {
            if (!crtDisplay.isPoweredOn && !crtDisplay.isTransitioning) {
                crtDisplay.powerOn();
                this.animationStarted = true;
            } else if (crtDisplay.isPoweredOn && !crtDisplay.isTransitioning) {
                // 如果已经开机且不在过渡中，直接完成并切换
                this.animationComplete = true;
                this.animationStarted = true;
                // 延迟一帧切换，确保场景正确初始化
                setTimeout(() => {
                    if (sceneManager && sceneManager.getCurrentScene() === SCENES.CRT_ON) {
                        sceneManager.switchScene(SCENES.MONITOR_MENU, 'fade');
                    }
                }, 50);
            } else if (crtDisplay.isTransitioning) {
                this.animationStarted = true;
            }
        }
    }
    
    update(deltaTime) {
        // 检查开机动画是否完成
        if (crtDisplay && this.animationStarted && !this.animationComplete) {
            const isComplete = crtDisplay.isPoweredOn && !crtDisplay.isTransitioning;
            
            if (isComplete) {
                // 动画完成，自动跳转到主菜单
                this.animationComplete = true;
                // 使用 setTimeout 确保在下一帧切换，避免在同一帧中多次调用
                setTimeout(() => {
                    if (sceneManager && sceneManager.getCurrentScene() === SCENES.CRT_ON) {
                        sceneManager.switchScene(SCENES.MONITOR_MENU, 'fade');
                    }
                }, 50);
            }
        }
    }
    
    render(ctx, canvas) {
        // 开机动画由 crtDisplay 系统渲染
        // 这里只渲染黑色背景（动画会覆盖）
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    handleInput(event) {
        // 兼容处理：支持增强事件对象和原始事件对象
        const key = (event.key || (event.originalEvent && event.originalEvent.key) || '').toLowerCase();
        const action = event.action;
        
        // 允许按任意键（confirm action 或任意键）跳过动画，直接进入主菜单
        if (crtDisplay && crtDisplay.isTransitioning && (action === 'confirm' || key)) {
            // 如果动画正在进行，可以跳过
            if (sceneManager) {
                // 强制完成动画
                crtDisplay.isTransitioning = false;
                crtDisplay.isPoweredOn = true;
                crtDisplay.powerTransitionProgress = 1.0;
                sceneManager.switchScene(SCENES.MONITOR_MENU, 'fade');
            }
            return true;
        }
        return false;
    }
}

