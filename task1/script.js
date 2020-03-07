class MultiSel {
    
    check = false;
    createCheck = false; 
    opts = {};
    size = 0;

    constructor(sel) {
        this.sel = sel;
    }

    init() {
        if (this.check) {
            return;
        }
        $('.control').css({'display':'flex'});
        $('.content').append('<select id="rightMS" multiple></select>');
        let result = {};
        let items = this.sel && this.sel.options;
        let count = 0;
        for (let i=0; i<items.length; i++) {
            let opt = items[i];
            result[count] = {};
            result[count].name = opt.text;
            result[count].value = opt.value;
                if (opt.selected) {
                    if (result[count].selected === 'selected') {
                        delete result[count].selected;
                    } else {
                        result[count].selected = 'selected';
                    } 
                }
            count++;
        }
        this.opts = Object.assign({}, result);
        this.size = Object.keys(this.opts).length;
        this.drawAgain();
        this.check = true;

        $('#leftMS').dblclick(function(event) {
            let target = event.target;
            if (target.tagName !== 'OPTION') {
                return;
            }
            for (let i = 0; i < this.size; i++) {
                if (this.opts[i].name === target.textContent) {
                    this.opts[i].selected = 'selected';
                }
            }
            this.drawAgain();
        }.bind(this));

        $('#rightMS').dblclick(function(event) {
            let target = event.target;
            if (target.tagName !== 'OPTION') {
                return;
            } 
            for (let i = 0; i < this.size; i++) {
                if (this.opts[i].name === target.textContent) {
                    delete this.opts[i].selected;
                }       
            }
            this.drawAgain();
        }.bind(this));


        $('#toRight').click(function(){
            let values = $('#leftMS').val();
            for (let i = 0; i < this.size; i++) {
                if (values.includes(this.opts[i].value)) {
                    this.opts[i].selected = 'selected';
                }
            }
            this.drawAgain();
        }.bind(this));

        $('#toLeft').click(function(){
            let values = $('#rightMS').val();
            for (let i = 0; i < this.size; i++) {
                if (values.includes(this.opts[i].value)) {
                    delete this.opts[i].selected;
                }
            }
            this.drawAgain();
        }.bind(this));

        $('#allToLeft').click(function() {
            for (let i = 0; i < this.size; i++) {
                if (this.opts[i].selected === 'selected') {
                    delete this.opts[i].selected;
                }
            }
            this.drawAgain();
        }.bind(this));

        $('#allToRight').click(function(){
            for (let i = 0; i < this.size; i++) {
                if (this.opts[i].selected !== 'selected') {
                    this.opts[i].selected = 'selected';
                }
            }
            this.drawAgain();
        }.bind(this));

        $('#sent').click(function() {
            for (let i = 0; i < this.size; i++) {
                if (this.opts[i].selected === 'selected') {
                    console.log(this.opts[i].name);
                }
            }
        }.bind(this));
    }

    create() {
        if (!this.check || this.createCheck) {
            return
        }
        let count = this.size;
        $.getJSON('appendix_1.json', function(data) {  
            let size1 = data.data.length;
            for (let i = 0; i < size1; i++) {
                this.opts[count] = data.data[i];
                count++;
            }
            this.size = Object.keys(this.opts).length;
            this.drawAgain();
            this.createCheck = true;
        }.bind(this));
    }


    drawAgain() {
        $('#rightMS').html('');
        $('#leftMS').html('');
        for (let i = 0; i < this.size; i++) {
            if (this.opts[i].selected === 'selected') {
                $('#rightMS').append(`<option value='${this.opts[i].value}' selected='selected'>${this.opts[i].name}</option>`);
            } else {
                $('#leftMS').append(`<option value='${this.opts[i].value}'>${this.opts[i].name}</option>`);
            }
        }
    }
}

let leftMS = document.querySelector('#leftMS');
let rightMS = document.querySelector('#rightMS');

let twoSide = new MultiSel(leftMS);