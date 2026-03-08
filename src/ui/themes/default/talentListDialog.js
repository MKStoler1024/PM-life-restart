export default class TalentListDialog extends Laya.Dialog {
    constructor() {
        super();
        this.size(950, 1800);
        this.mouseEnabled = true;
        this.isPopupCenter = true;

        const bg = new Laya.Box();
        bg.size(950, 1800);
        bg.graphics.drawRect(0, 0, 950, 1800, '#1c1c1e'); // 纯色不透明背景
        bg.graphics.drawRect(0, 0, 950, 1800, null, '#b17cff', 6); // 紫色边框
        this.addChild(bg);

        const title = new Laya.Label();
        title.text = $lang.UI_Talent_List || '天赋图鉴';
        title.fontSize = 60;
        title.font = 'SimHei';
        title.color = '#ffffff';
        title.centerX = 0;
        title.y = 50;
        this.addChild(title);

        const closeBtn = new Laya.Box();
        closeBtn.size(300, 80);
        closeBtn.centerX = 0;
        closeBtn.bottom = 50;
        closeBtn.graphics.drawRect(0, 0, 300, 80, '#393e46'); // 按钮底色
        closeBtn.graphics.drawRect(0, 0, 300, 80, null, '#eeeeee', 2);
        const closeLabel = new Laya.Label();
        closeLabel.text = $lang.UI_Close || '关闭';
        closeLabel.fontSize = 45;
        closeLabel.font = 'SimHei';
        closeLabel.color = '#ffffff';
        closeLabel.centerX = 0;
        closeLabel.centerY = 0;
        closeBtn.addChild(closeLabel);
        closeBtn.on(Laya.Event.CLICK, this, this.close);
        this.addChild(closeBtn);

        const list = new Laya.List();
        list.size(850, 1450);
        list.centerX = 0;
        list.y = 160;
        list.vScrollBarSkin = '';
        
        class TalentItem extends Laya.Box {
            constructor() {
                super();
                this.size(850, 150);
                const nameLabel = new Laya.Label();
                nameLabel.name = 'nameLabel';
                nameLabel.fontSize = 38;
                nameLabel.font = 'SimHei';
                nameLabel.y = 10;
                nameLabel.x = 10;
                const descLabel = new Laya.Label();
                descLabel.name = 'descLabel';
                descLabel.fontSize = 28;
                descLabel.font = 'SimHei';
                descLabel.leading = 10; // 增加行间距
                descLabel.y = 65;
                descLabel.x = 10;
                descLabel.color = '#cccccc';
                descLabel.wordWrap = true;
                descLabel.height = 80; // 限制高度并允许两到三行
                descLabel.width = 830;
                this.addChild(nameLabel);
                this.addChild(descLabel);
            }
        }
        list.itemRender = TalentItem;

        list.renderHandler = new Laya.Handler(this, (cell, index) => {
            const data = list.array[index];
            const nameLab = cell.getChildByName('nameLabel');
            const descLab = cell.getChildByName('descLabel');
            nameLab.text = `[${data.id}] ${data.name} ${data.exclusive ? '(名人专属)' : ''}`;
            descLab.text = data.description;
            
            const colors = ['#ffffff', '#55fffe', '#b17cff', '#ffce45', '#ff4d4d', '#feea1b'];
            nameLab.color = colors[data.grade] || '#ffffff';

            if (data.grade === 5) {
                nameLab.stroke = 4;
                nameLab.strokeColor = '#ff00ff';
            } else {
                nameLab.stroke = 0;
            }
        });

        this.addChild(list);

        const talents = [];
        core.request(core.Module.TALENT).forEach(talent => {
            talents.push(talent);
        });
        talents.sort((a, b) => {
            if(b.grade !== a.grade) return b.grade - a.grade;
            return a.id - b.id;
        });
        
        list.array = talents;
    }
}