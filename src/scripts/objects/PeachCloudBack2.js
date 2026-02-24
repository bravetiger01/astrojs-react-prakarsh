import * as PIXI from 'pixi.js';
import { Resources } from '../ResourceManager';

export class PeachCloudBack2 extends PIXI.Container {
    constructor() {
        super();

        // SubTexture
        const peachCloudBack2 = Resources.getSubTexture(
            'bigThing',
            0,
            1268,
            3066,
            1150
        );

        // Sprite
        this.peachCloudBackSprite = new PIXI.Sprite(peachCloudBack2);

        // Center anchor
        this.peachCloudBackSprite.anchor.set(0.5, 0.5);
        this.peachCloudBackSprite.x = 0;
        this.peachCloudBackSprite.y = 0;
        this.peachCloudBackSprite.zIndex = 10;
        this.addChild(this.peachCloudBackSprite);

        // -------------------
        // ✨ TEXT
        // -------------------

        const message = 
`Sometimes You Let Go...
Free-Falling Inside Evolution's Events...`;

this.text = new PIXI.Text(message, {
    fontFamily: 'Arial',
    fontSize: 42,
    fill: 0xF4A27E,

    stroke: 0x000000,     // outline color
    strokeThickness: 0.5,   // outline width

    dropShadow: true,
    dropShadowColor: 0xF4A27E,
    dropShadowBlur: 8,
    dropShadowAngle: Math.PI / 4,
    dropShadowDistance: 2,

    align: 'center',
    wordWrap: true,
    wordWrapWidth: 800,
});
        // Center text
        this.text.anchor.set(0.5,1);
        this.text.x = 0;
        this.text.y = 0;
        this.text.zIndex = 11;




        this.addChild(this.text);
    }
}