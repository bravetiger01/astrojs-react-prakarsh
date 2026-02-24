import * as PIXI from 'pixi.js';
import { Resources } from '../ResourceManager';

export class PrakarshTitle extends PIXI.Container {
    constructor() {
        super();

        // 1. BASE (Static)
        // Coords: x=831, y=875, w=699, h=949
const prakarshTitle = Resources.getSubTexture(
  'spritesheet',
  0,
  0,
  4133,
  836
);
        this.prakarshTitleSprite = new PIXI.Sprite(prakarshTitle);
        
        // Anchor at bottom-center (0.5, 1.0)
        this.prakarshTitleSprite.anchor.set(0.5, 1);
        this.prakarshTitleSprite.x = 0;
        this.prakarshTitleSprite.y = 0;
            //   this.wingsSprite.scale.set(2);

        const titleCloud1 = Resources.getSubTexture('spritesheet', 891, 560, 720, 1200);
        this.titleCloud1Sprite = new PIXI.Sprite(titleCloud1);
        this.titleCloud1Sprite.zIndex = 5;
        this.titleCloud1Sprite.scale.set(1.5);
        
        // Anchor at bottom-center (0.5, 1.0)
        this.titleCloud1Sprite.anchor.set(0.5, 1);
        this.titleCloud1Sprite.x = 0;
        this.titleCloud1Sprite.y = 600;

                const titleCloud2 = Resources.getSubTexture('spritesheet', 0, 4089, 891, 1427);
        this.titleCloud2Sprite = new PIXI.Sprite(titleCloud2);
        this.titleCloud2Sprite.zIndex = 5;
        this.titleCloud2Sprite.scale.set(.75);
        
        // Anchor at bottom-center (0.5, 1.0)
        this.titleCloud2Sprite.anchor.set(0.5, 1);
        this.titleCloud2Sprite.x = 1400;
        this.titleCloud2Sprite.y = -300;

        const titleCloud3 = Resources.getSubTexture('spritesheet', 890, 4089, 707, 1427);
        this.titleCloud3Sprite = new PIXI.Sprite(titleCloud3);
        this.titleCloud3Sprite.zIndex = 5;
        this.titleCloud3Sprite.scale.set(1.3);
        
        // Anchor at bottom-center (0.5, 1.0)
        this.titleCloud3Sprite.anchor.set(0.5, 1);
        this.titleCloud3Sprite.x = -1400;
        this.titleCloud3Sprite.y = 0;

        // Add to container
        this.addChild(this.prakarshTitleSprite);
        this.addChild(this.titleCloud1Sprite);
        this.addChild(this.titleCloud2Sprite);
        this.addChild(this.titleCloud3Sprite);
    }

    // update(delta) {
    //     this.wingsSprite.rotation += 0.01 * delta;
    // }
}