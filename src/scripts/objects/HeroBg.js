import * as PIXI from 'pixi.js';
import { Resources } from '../ResourceManager';

export class HeroBg extends PIXI.Container {
    constructor() {
        super();

        // 1. BASE (Static)
        // Coords: x=831, y=875, w=699, h=949
const HeroBg = Resources.getSubTexture(
  'bg',
  0,
  0,
  1920,
  1080
);

        this.HeroBgSprite = new PIXI.Sprite(HeroBg);
        
        // Anchor at bottom-center (0.5, 1.0)
        this.HeroBgSprite.anchor.set(0, 0);
        this.HeroBgSprite.x = 0;
        this.HeroBgSprite.y = 0;
        this.HeroBgSprite.zIndex = 5;
        this.HeroBgSprite.scale.set(2);
            //   this.wingsSprite.scale.set(2);
const stars = Resources.getSubTexture(
    'spritesheet',
    4171,
    1208,
    3818,
    1457
);
        this.starsSprite = new PIXI.Sprite(stars);
        
        // Anchor at bottom-center (0.5, 1.0)
        this.starsSprite.anchor.set(0, 0);
        this.starsSprite.x = 0;
        this.starsSprite.y = 0;
        this.starsSprite.zIndex = 6;
         

        // Add to container
        this.addChild(this.HeroBgSprite);
        this.addChild(this.starsSprite);
    }

    // update(delta) {
    //     this.wingsSprite.rotation += 0.01 * delta;
    // }
}