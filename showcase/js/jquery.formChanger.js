// ==ClosureCompiler==
// @output_file_name jquery.formChanger.min.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// ==/ClosureCompiler==

/**
 * jQuery FormChanger Plugin 2.1
 *
 * Demo: http://ebanzi.ru/projects/formChanger/index.html
 * Source: http://code.google.com/p/jquery-form-changer/
 *
 * Copyright (c) 2011 Vladimir Axyonov - sketch43@gmail.com
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($){

    var OFormChanger = {
        debug: false,
        basePrefix: '',
        themeClass: '',
        common: { // наследуется всеми
            options: {
                wraps: 2,
                wrapsIn: true
            },
            classes: {
                wrap: 'Wrap',
                hover: 'Hover',
                pressed: 'Press',
                focused: 'Focus',
                filled: 'Filled',
                placeholder: 'Place',
                readonly: 'Readonly',
                disabled: 'Disabled',
                invalid: 'Invalid',
                title: 'Title',
                state: 'State'
            }
        },
        settings: {
            form: {
                classes: {
                    base: 'Form'
                }
            },
            text: {
                classes: {
                    base: 'Text'
                }
            },
            textarea: {
                classes: {
                    base: 'Textarea'
                }
            },
            button: {
                classes: {
                    base: 'Button',
                    icon: "Icon"
                }
            },
            check: {
                options: {
                    checkboxFlag: '',
                    radioFlag: ''
                },
                classes: {
                    baseCheckbox: 'Checkbox',
                    baseRadio: 'Radio',
                    checked: 'Checked',
                    label: 'Label'
                }
            },
            select: {
                options: {
                    lists: 2,
                    listsIn: true
                },
                classes: {
                    base: 'Select',
                    arrow: 'Arrow',
                    list: 'List',
                    listin:'ListIn',
                    optgroup: 'OptGroup',
                    option: 'Option',
                    selected: 'Selelected',
                    open: 'Open'
                }
            },
            file: {
                options: {
                    useBtn: true,
                    useTextBox: true,
                    buttonValue: 'загрузить'
                },
                classes: {
                    base: 'File',
                    btn: 'Button',
                    field: 'Field'
                }
            }
        },
        /*
         * Принимает в качестве параметров объект поля,
         * базовый класс для текущего поля,
         * и обертку поля
         */
        copyAttrs: function(field, base, wrap){
            if (field[0].id)
                wrap.attr('id', base + 'Id-' + field[0].id);
            if (field[0].className){
                var clsArr = field[0].className.split(' ');
                for(var j = 0, l = clsArr.length; j < l; j++)
                    if($.trim(clsArr[j])) wrap.addClass(base + 'Class-' + clsArr[j]);
            }
        },
        createWraps: function(hash, cls,  opts){
            //создаем обертки
            for(var i = 1; i <= opts.wraps; i++){
                if(i == 1) {
                    var wraps = [];
                    wraps[i] = hash.data.wrap.addClass(this.themeClass); // добавление класса для тем
                    hash.field.before(wraps[i]);
                    wraps[i].append(hash.field);
                    this.copyAttrs(hash.field, OFormChanger.basePrefix+cls.base,  hash.data.wrap);
                    continue;
                }
                wraps[i] = $('<span/>', {'class' : cls.wrap + i + ' ' + cls.wrap + 's'});
                if(opts.wrapsIn){
                    wraps[i-1].append(wraps[i]); //создаем остальные обертки
                    wraps[i].append(hash.field);
                }
                else hash.field.before(wraps[i]);
            }
            return wraps;
        },
        setCommons: function(commons){
            for(var set in this.settings){
                $.extend(true, this.settings[set], this.common);
            }
        },
        setDefaults: function(settings){
            $.extend(true, this.settings, settings || {});

            if(this.settings.all)
                for(var stg in this.settings) if(stg != 'form') {
                    var cacheStgs = {};
                    $.extend(true, cacheStgs, settings[stg]);
                    $.extend(true, this.settings[stg], settings.all);
                    $.extend(true, this.settings[stg], cacheStgs);
                }
        },
        extendOptions: function(type, settings){
            if(!settings) settings ={};
            return {
                cls: $.extend($.extend({}, this.settings[type].classes), settings.classes || {}),
                opts: $.extend($.extend({}, this.settings[type].options), settings.options || {})
            }
        },
        addBase: function(cls){
            for(var cl in cls)
                if(cl != 'base') cls[cl] = this.basePrefix + cls.base + cls[cl];
        },
        checkEnabled: function(field, etype){
            var events = {
                enable: 1,
                disable: 1,
                chEnable: 1,
                chDisable: 1,
                chFocusout: 1,
                pull: 1
            }

            return !(field[0].disabled && !(etype in events));
        }
    };

    $.formChanger = OFormChanger;
    OFormChanger.setCommons();

    $.extend($.fn, {
        changerDisabled: function(disable){
            this.filter(':input').each(function(){
                var self = $(this);
                if(disable)
                    self.attr({disabled: 'disabled'})
                        .trigger('disable');
                else
                    self.removeAttr('disabled')
                        .trigger('enable');
            });
            return this;
        },

        changerChecked: function(check){
            this.filter('input:checkbox, input:radio').each(function(){
                var self = $(this);
                if(check)
                    self.attr({checked: 'checked'})
                        .trigger('pull');
                else
                    self.removeAttr('checked')
                        .trigger('pull');
            });
            return this;
        },

        changerReadonly: function(readonly){
            this.filter('input:text, input:password, textarea').each(function(){
                var self = $(this);
                if(readonly)
                    self.attr({readonly: 'readonly'})
                        .trigger('readonly');
                else
                    self.removeAttr('readonly')
                        .trigger('notReadonly');
            });
            return this;
        },

        changerText: function(settings){
            this.filter('input:text, input:password, textarea, input[type=email], input[type=url], input[type=number], input[type=date]').each(function(){
                if(!$(this).data().changer) init($(this));
            });

            function init(field){
                var is_textarea = field.is('textarea'),
                    stgs = OFormChanger.extendOptions(is_textarea?'textarea':'text', settings),
                    cls = stgs.cls,
                    opts = stgs.opts;

                OFormChanger.addBase(cls);

                opts.wraps = opts.wraps < 0?1:opts.wraps;

                var hash = {
                    field: field,
                    data: (field.data().changer = {
                        wrap: $('<span/>', {'class' : cls.wrap + ' ' + cls.wrap + 's'}),
                        placeHolder: field.attr('data-placeholder'),
                        label: $('label[for="'+field[0].id+'"]').attr('role','Label')
                    }),
                    placeHolder: $('<span/>', {'class' : cls.placeholder, 'role': 'Place'}),
                    pI: false
                };

                var wraps =  OFormChanger.createWraps(hash, cls, opts);

                if(is_textarea){
                    hash.list = wraps[wraps.length-1].addClass(cls.wrap+'Inner');
                    hash.listin = field;

                    hash.listin.scrollBox();
                }

                hash.data.wrap.bind('change pull click mouseover mouseout focus focusin blur focusout disable enable input readonly notReadonly mousedown mouseup press unpress invalid valid chFocusout chDisable chEnable chReadonly chNotReadonly', function(e){

                    if(!OFormChanger.checkEnabled(hash.field, e.type)) return false;

                    var self = $(e.target);

                    switch (e.type) {
                        case 'change':
                        case 'pull':
                            //if(!opts.placeAnimate)
                            hash.data.wrap[hash.field.val()?'addClass':'removeClass'](cls.filled);
                            /*else {
                             opts.placeAnimate[hash.field.val()?'hide':'show'](hash.placeHolder);
                             }*/
                            hash.placeHolder.text(hash.field.data().changer.placeHolder);
                            if(!hash.pI && hash.field.data().changer.placeHolder)
                                hash.field.before(hash.placeHolder);
                            break;
                        case 'click':
                            hash.field.trigger('focus');
                            break;
                        case 'input':
                            if(is_textarea) hash.listin.data().scrollBox.scrollToBottom();
                            break;
                        case 'focus':
                        case 'focusin':
                            //if(opts.placeAnimate) opts.placeAnimate.hide(hash.placeHolder);

                            //if(opts.focusedAnimate) opts.focusedAnimate.focus(hash.data.wrap);
                            break;
                        case 'blur':
                        case 'focusout':
                            //if(opts.placeAnimate && !hash.field.val()) opts.placeAnimate.show(hash.placeHolder);

                            //if(opts.focusedAnimate) opts.focusedAnimate.blur(hash.data.wrap);
                            break;
                        default:
                            break;
                    }

                    if(opts.animate && typeof opts.animate[e.type] == 'function') opts.animate[e.type](hash);

                    actions(self,hash.data.wrap, e, cls); //действия для обертки
                    actions(false,self.not(hash.field.add('.'+ cls.wrap + 's')), e, cls); //действия для таргета события
                    actions(false,hash.data.label, e, cls);//действия для его лэйбла
                });

                hash.data.wrap.triggerHandler('pull');
                hash.data.wrap.triggerHandler('chFocusout');
                hash.data.wrap.triggerHandler(hash.field[0].disabled?'chDisable':'chEnable');
                hash.data.wrap.triggerHandler(hash.field.attr('readonly')?'chReadonly':'chNotReadonly');
            }

            return this;
        },

        changerButton: function(settings){
            var stgs = OFormChanger.extendOptions('button', settings),
                cls = stgs.cls,
                opts = stgs.opts;

            OFormChanger.addBase(cls);

            opts.wraps = opts.wraps < 0?1:opts.wraps;

            this.filter('input:submit, input:button, input:reset, button, a, span').each(function(){
                if(!$(this).data().changer) init($(this));
            });

            function init(field){

                var hash = {
                    field: field,
                    data: (field.data().changer = {
                        wrap: $('<span/>', {'class' : cls.wrap + ' ' + cls.wrap + 's'}),
                        title: $('<span class="'+cls.title+'" role="Title">'+ (field.val() || field.text()) +'</span>'),
                        icon: $('<span />', {"class": cls.icon, "role": "Icon"}),
                        href: field.data('href')
                    })
                };

                if(hash.field.attr('type') == 'reset') resetHandler(hash);

                OFormChanger.createWraps(hash, cls, opts);

                if(hash.field.data('icon')) hash.data.icon.addClass(hash.field.data('icon'));

                hash.field.before(hash.data.icon);
                hash.field.before(hash.data.title);

                hash.field.bind('pull click mouseover mouseout focus focusin blur focusout disable enable mousedown mouseup press unpress chFocusout chDisable chEnable chReadonly chNotReadonly', function(e){

                    if(!OFormChanger.checkEnabled(hash.field, e.type)) return false;

                    var self = $(e.target);

                    if(e.type == 'click' && hash.data.href) location = hash.data.href;

                    if(opts.animate && typeof opts.animate[e.type] == 'function') opts.animate[e.type](hash);

                    actions(self,hash.data.wrap, e, cls); //действия для обертки
                });

                hash.data.wrap.triggerHandler('pull');
                hash.data.wrap.triggerHandler(hash.field[0].disabled?'chDisable':'chEnable');
            }

            return this;
        },

        changerCheck: function(settings){
            var stgs = OFormChanger.extendOptions('check', settings),
                cls = stgs.cls,
                opts = stgs.opts;

            opts.wraps = opts.wraps < 0?1:opts.wraps;

            this.filter('input:radio, input:checkbox').each(function(){
                if(!$(this).data().changer) init($(this));
            });

            function init(field){


                var typeAttr = field.attr('type'),
                    type = typeAttr.substring(0,1).toUpperCase()+typeAttr.substring(1);
                cls.base = cls['base'+type];

                OFormChanger.addBase(cls);

                var hash = {
                    field: field,
                    type: type,
                    data: (field.data().changer = {
                        wrap: $('<span/>', {'class' : cls.wrap + ' ' +  cls.wrap + 's'}),
                        state: $('<span/>', {'class':cls.state, 'role':'State'}),
                        label: $('label[for="'+field[0].id+'"]').attr('role','Label').addClass(cls.label)
                    })
                };

                OFormChanger.createWraps(hash, cls, opts);

                hash.field.before(hash.data.state.text(opts[typeAttr+'Flag']));

                hash.data.wrap.bind('change pull click mouseover mouseout focus focusin blur focusout disable enable mousedown mouseup press unpress invalid valid chDisable chEnable', function(e){

                    if(!OFormChanger.checkEnabled(hash.field, e.type)) return false;

                    var self = $(e.target),
                        checked = e.target.checked;

                    switch (e.type) {
                        case 'change':
                        case 'click':
                        case 'pull':
                            hash.data.wrap[checked?'addClass':'removeClass'](cls.checked);
                            hash.data.label[checked?'addClass':'removeClass'](cls.checked+'Label');
                            if(checked && hash.type == 'Radio'){
                                var uncheckEls = $('input:radio[name='+self.attr('name')+']').not(self);
                                uncheckEls.each(function(){
                                    var self = $(this);
                                    if(self.data().changer)
                                        self.data().changer.wrap.removeClass(cls.checked);
                                    $('label[for="'+self[0].id+'"]').removeClass(cls.checked+'Label');
                                });
                            }
                            break;
                        default:
                            break;
                    }

                    actions(self,hash.data.wrap, e, cls); //действия для обертки
                    actions(false,self.not(hash.field.add('.'+ cls.wrap + 's')), e, cls); //действия для таргета события
                    actions(false,hash.data.label, e, cls);//действия для его лэйбла
                });

                hash.field.trigger('pull');
                hash.field.trigger(hash.field[0].disabled?'chDisable':'chEnable');
            }

            return this;
        },

        changerFile: function(settings){
            var stgs = OFormChanger.extendOptions('file', settings),
                cls = stgs.cls,
                opts = stgs.opts;

            OFormChanger.addBase(cls);

            opts.wraps = opts.wraps < 0?1:opts.wraps;

            this.filter('input:file').each(function(){
                if(!$(this).data().changer) init($(this));
            });

            function init(field){

                var hash = {
                    field: field,
                    data: (field.data().changer = {
                        wrap: $('<span/>', {'class' : cls.wrap + ' ' + cls.wrap + 's'}),
                        state: opts.useTextBox?$('<input />', {'type': 'text', 'tabindex': '-1'}).changerText():$('<span/>', {'class':cls.state, 'role':'State'}),
                        btn: opts.useBtn?$('<input />', {'type': 'button', 'tabindex': '-1', 'value': opts.buttonValue}).changerButton():$('<span class="'+cls.btn+'" role="Btn">'+opts.buttonValue+'</span>'),
                        placeHolder: field.attr('data-placeholder'),
                        label: $('label[for="'+field[0].id+'"]').attr('role','Label')
                    })
                };

                OFormChanger.createWraps(hash, cls, opts);

                hash.field.before(opts.useTextBox?hash.data.state.data().changer.wrap:hash.data.state);
                hash.field.before(opts.useBtn?hash.data.btn.data().changer.wrap:hash.data.btn);
                hash.field.addClass(cls.field);

                hash.data.btn.add(hash.data.state)
                    .click(function(){
                        // Opera не пропускает из соображений безопасности клик
                        hash.field.click();
                    });

                hash.field.bind('change pull', function(e){
                    hash.data.wrap[hash.field.val()?'addClass':'removeClass'](cls.filled);

                    if(hash.data.placeHolder) hash.data.state[opts.useTextBox?'val':'text'](hash.data.placeHolder);

                    var val = hash.field.val();
                    if(val) {
                        var val1 = val.substring(val.lastIndexOf('\\')+1);
                        hash.data.state[opts.useTextBox?'val':'text'](val1);
                        hash.data.wrap.attr('title',val);
                    }
                });

                hash.data.wrap.bind('click mouseover mouseout focus focusin blur focusout mousedown mouseup pull disable enable press unpress invalid valid chDisable chEnable chFocusout',  function(e){

                    if(!OFormChanger.checkEnabled(hash.field, e.type)) return false;

                    var self = $(e.target);

                    if(opts.animate && typeof opts.animate[e.type] == 'function') opts.animate[e.type](hash);

                    actions(self,hash.data.wrap, e, cls); //действия для обертки
                    actions(false,self.not(hash.field.add('.'+ cls.wrap + 's')), e, cls); //действия для таргета события
                    actions(false,hash.data.label, e, cls);//действия для его лэйбла
                });

                hash.field.triggerHandler('pull');
                hash.data.wrap.triggerHandler('chFocusout');
                hash.data.wrap.triggerHandler(hash.field[0].disabled?'chDisable':'chEnable');
            }

            return this;
        },

        changerSelect: function(settings){
            var stgs = OFormChanger.extendOptions('select', settings),
                cls = stgs.cls,
                opts = stgs.opts;

            OFormChanger.addBase(cls);

            opts.wraps = opts.wraps < 0?1:opts.wraps;

            this.filter('select').each(function(){
                if(!$(this).data().changer) init($(this));
            });

            function init(field){
                var hash = {
                    field: field,
                    data: (field.data().changer = {
                        wrap: $('<span/>', {'class' : cls.wrap + ' ' + cls.wrap + 's'}),
                        state: $('<span/>', {'class': cls.state, role: 'State'}),
                        arrow: $('<span/>', {'class': cls.arrow, role: 'Arrow'}),
                        label: $('label[for="'+field[0].id+'"]').attr('role','Label'),
                        placeHolder: $('<span/>', {'class': cls.placeholder, role: 'Place'}).text($(field).children('[value=""]').text()),
                    }),
                    multiple: field.attr('multiple'),
                    sizeble: field.attr('size')<2?0:field.attr('size'),
                    isOpen: false
                };

                var wraps = OFormChanger.createWraps(hash, cls, opts);

                (opts.wrapsIn?wraps[wraps.length-1]:hash.data.wrap)
                    .append(hash.data.state)
                    .append(hash.data.arrow)
                    .append(hash.data.placeHolder);

                //создаем и добавляем обертки листа
                for(var i = 1; i <= opts.lists; i++){
                    if(i == 1) {
                        var lists = [];
                        hash.data.list = lists[1] = $('<span/>', {'class': cls.list}); //создаем основную обертку листа
                        hash.data.wrap.append(hash.data.list); //и добавляем ее в обертку всего селекта
                        continue;
                    }
                    lists[i] = $('<span/>', {'class' : cls.list+i});
                    if(opts.listsIn) lists[i-1].append(lists[i]); //создаем остальные обертки листа
                    else hash.list.append(lists[i]);
                }

                //переносим селект в конец обертки, чтобы не мозолил глаза в коде
                hash.data.list.after(field);

                //создаем и добавялем внутренний лист
                hash.listin = $('<span/>', {'class': cls.listin, role: 'Listin'});
                if(opts.listsIn) lists[lists.length-1].append(hash.listin);
                else hash.list.append(hash.listin);

                hash.listin.scrollBox();

                //скрываем реальный селект и сбрасываем табиндекс, чтобы не фокусился
                field.attr({'tabindex':'-1'});

                //ставим обертке табиндекс, чтобы она начала получать фокус
                hash.data.wrap.attr({'tabindex':'0'});

                hash.data.wrap.bind('change pull click mouseover mouseout focus focusin focusout disable enable mousedown mouseup press unpress invalid valid open close', function(e){
                    // @TODO разобраться с пустыми селектами

                    if(!OFormChanger.checkEnabled(hash.field, e.type)) return false;

                    var self = $(e.target),
                        selfOpt = self.attr('role') == 'Option',
                        isList = self.parents('.'+cls.list).length,
                        wrap = !isList?hash.wrap:self;

                    switch (e.type) {

                        case 'click':
                            if(!isList || selfOpt)
                                hash.field.trigger(hash.isOpen?'close':'open');
                            if(selfOpt) {
                                self.data().changerOption[0].selected=true;
                                hash.field.trigger('change');
                            }
                            hash.field.triggerHandler('click');
                            break;
                        case 'open':
                            regenerateList(hash);
                            setSelected(hash);
                            hash.isOpen = !!1;
                            hash.data.wrap.addClass(cls.open);
                            hash.listin.triggerHandler('innerChange');
                            scrollToSelected(hash);
                            break;
                        case 'close':
                            hash.isOpen = !1;
                            hash.data.wrap.removeClass(cls.open);
                            break;
                        case 'change':
                        case 'pull':
                            hash.data.state.text($(field[0].options[field[0].selectedIndex]).text());
                            hash.data.wrap[(field[0].value?'add':'remove')+'Class'](cls.filled);
                            break;
                        case 'mouseover':

                            break;
                        case 'mouseout':

                            break;
                        case 'focus':
                        case 'focusin':

                            break;
                        case 'blur':
                        case 'focusout':
                            // для осла ретурним фолс, когда фокус перешел к чилде
                            if(e.originalEvent && $(e.originalEvent.toElement).parents('.'+cls.wrap).length) return false;

                            hash.field.trigger('close');
                            break;
                        default:
                            break;
                    }

                    if(opts.animate && typeof opts.animate[e.type] == 'function') opts.animate[e.type](hash);

                    actions(self,hash.data.wrap, e, cls); //действия для обертки
                    actions(false,self.not(hash.field.add('.'+ cls.wrap + 's')), e, cls); //действия для таргета события
                    actions(false,hash.data.label, e, cls);//действия для его лэйбла
                });

                hash.data.wrap.triggerHandler('pull');
                hash.data.wrap.triggerHandler('close');
                hash.data.wrap.triggerHandler('chFocusout');
                hash.data.wrap.triggerHandler(hash.field[0].disabled?'chDisable':'chEnable');
            }

            function regenerateList(hash){
                hash.listin.empty();

                var opts = hash.field.children();

                for(var i = 0, l = opts.length; i < l; i++){
                    var opt = $(opts[i]),
                        optElement = opt.data().changerElement;
                    if(opt[0].nodeName.toLowerCase() == 'optgroup'){
                        createOptgroup(opt, hash);
                    }
                    else if(optElement){
                        optElement.data().changerOption = opt;
                        hash.listin.append(optElement);
                    }
                    else createOption(opt, hash.listin, hash);
                }
            }

            function createOptgroup(group, hash){
                var optgroup = $('<span/>', {'class' : cls.optgroup, role: 'Optgroup'}),
                    title = $('<span/>', {'class' : cls.optgroup+'Title', 'role': 'Title'}).text(group.attr('label'));
                optgroup.append(title);
                hash.listin.append(optgroup);
                // тоже самое делаем для вложеных в них опшенов
                for(var i = 0, l = group.children().length; i < l; i++){
                    var opt = $(group.children().eq(i));
                    createOption(opt, optgroup, hash);
                }
            }

            function createOption(opt, optgroup, hash){
                var option = $('<span/>', {'class': cls.option, role: 'Option'}).text(opt.text());
                option.data().changerOption = opt;
                opt.data().changerElement = option;
                optgroup.append(option);
            }

            function setSelected(hash){
                var opts = hash.field[0].options,
                    optElement = $(opts[hash.field[0].selectedIndex]).data().changerElement;

                hash.listin.find('span').removeClass(cls.selected+'Option');
                optElement.addClass(cls.selected+'Option');
            }

            function scrollToSelected(hash){
                var opts = hash.field[0].options;

                if(hash.listin.data().scrollBox){ // если есть скролбар, скролим к селектнутому опшену
                    var optElement = $(opts[hash.field[0].selectedIndex]).data().changerElement;

                    hash.listin.data().scrollBox.scrollTo(optElement[0].offsetTop);
                }
            }
        },

        applyChanger: function(theme, settings){
            if(theme) OFormChanger.themeClass = theme;

            var newstgs = $.extend(true, {}, OFormChanger.settings),
                stgs =  $.extend(true, newstgs, settings || {});

            if(settings && settings.all)
                for(var stg in stgs) if(stg != 'form') {
                    var cacheStgs = {};
                    $.extend(true, cacheStgs, settings[stg]);
                    $.extend(true, stgs[stg], settings.all);
                    $.extend(true, stgs[stg], cacheStgs);
                }


            if(!!this.length) apply(this);

            function apply(elements) {
                elements = elements || 0;

                for(var i = 0, len = elements.length; i < len; i++){
                    var element = $(elements[i]);

                    if(element[0].nodeName.toLowerCase() == 'form'){
                        element.addClass(OFormChanger.basePrefix + stgs.form.classes.base)
                            .addClass(OFormChanger.themeClass);

                        var cacheElements = [];
                        for(var k = 0, l = element[0].elements.length; k < l; k++){
                            cacheElements.push(element[0].elements[k]);
                        }

                        apply(cacheElements);
                        continue;
                    }

                    switch(element[0].nodeName.toLowerCase()) {
                        case 'input':
                            if(element.attr('type'))
                                switch(element.attr('type').toLowerCase()){
                                    case 'submit':
                                    case 'reset':
                                    case 'button':
                                        element.changerButton(stgs.button);
                                        break;
                                    case 'checkbox':
                                    case 'radio':
                                        element.changerCheck(stgs.check);
                                        break;
                                    case 'file':
                                        element.changerFile(stgs.file);
                                        break;
                                    case 'hidden':
                                        break;
                                    default:
                                        element.changerText(stgs.text);
                                        break;
                                }
                            break;
                        case 'textarea':
                            element.changerText(stgs.textarea);
                            break;
                        case 'select':
                            element.changerSelect(stgs.select);
                            break;
                        case 'button':
                            element.changerButton(stgs.button);
                            break;
                        default:
                            break;
                    }
                }
            }

            return this;
        },

        scrollBox: function(settings){

            var settings = settings || {},
                cls = $.extend({
                    base: 'scrBox',
                    innerBox: 'In',
                    bar: 'Bar',
                    barUp: 'Up',
                    barDown: 'Down',
                    barArea: 'BArea',
                    barScroller: 'BScr'
                }, settings.classes || {}),
                opts = $.extend({
                    wraps: 1,
                    scrollStep: 15,
                    wrapper: null,
                    scrollerDecor: 3
                }, settings.options || {}),
                bodyElement = $(document.body);

            for(var cl in cls)
                if(cl != 'base') cls[cl] = cls.base + cls[cl];

            this.each(function(){
                var box = $(this),
                    OBox = new Box($(this));

                OBox.init();
            });

            function Box(box){

                var self = this;

                this.wrapper = !opts.wrapper?$('<span />', {'class': cls.base}):opts.wrapper;
                this.iBox = box;

                this.init = function(){

                    OFormChanger.copyAttrs(this.iBox, cls.base, this.wrapper);

                    this.iBox.addClass(cls.innerBox);

                    //if(this.innerBox.is('textarea') && this.innerBox.data().changer) this.element.height(this.innerBox.height());
                    this.iBox.before(this.wrapper);
                    this.wrapper.append(this.iBox);

                    this.check();

                    this.iBox.bind('innerChange input keydown', function(){self.check()});

                    this.iBox.data().scrollBox = {
                        wrap: this.wrapper,
                        scrollTo: function(to){
                            if(self.bar) self.bar.scrollTo(to);
                        },
                        scrollToBottom: function(){
                            if(self.bar) self.bar.scrollTo(self.params.iBoxScH);
                        }
                    };
                };

                this.check = function(){
                    $(window).load(function () {
                        self.params = {
                            iBoxH: self.iBox.outerHeight(), //высота самого блока
                            iBoxScH: self.iBox[0].scrollHeight // высота контента внутри блока
                        };

                        self.calc();
                    });
                };

                this.calc = function(){
                    if(this.params.iBoxH >= this.params.iBoxScH){
                        this.removeBar();
                        this.wrapper.removeClass('withScroll');
                    }
                    else {
                        !this.bar?this.createBar():this.bar.recalc();
                        this.wrapper.addClass('withScroll');
                        this.wrapper.trigger('scroll');
                    }
                };

                this.createBar = function(){
                    this.bar = new ScrollBar(this);

                    if(this.iBox.is('textarea'))
                        this.bar.appendTo(this.iBox.parent().parent()).init();
                    else
                        this.bar.appendTo(this.wrapper).init();
                };

                this.removeBar = function(){
                    if(this.bar) this.bar.remove();
                };


            }

            function ScrollBar(box){

                var self = this;

                this.box = box;
                this.scrollBar = $('<span/>', {'class': cls.bar, role: cls.bar});
                this.scrollBarUp = $('<span/>', {'class': cls.barUp, role: cls.barUp});
                this.scrollBarDown = $('<span/>', {'class': cls.barDown, role: cls.barDown});
                this.scrollBarArea = $('<span/>', {'class': cls.barArea, role: cls.barArea});
                this.scrollBarScroller = $('<span/>', {'class': cls.barScroller, role: cls.barScroller});

                this.init = function(){
                    for(var i = 1; i <= opts.scrollerDecor; i++)
                        this.scrollBarScroller.append($('<span />', {'class': cls.barScroller+'Decor'+i}));

                    this.scrollBar.append(this.scrollBarUp.add(this.scrollBarArea.append(this.scrollBarScroller)).add(this.scrollBarDown));

                    this.setHeights();
                };

                this.scrollTo = function(to){
                    this.box.iBox[0].scrollTop = to || 0;
                    this.recalc();
                };

                this.remove = function(){
                    this.scrollBar.remove();
                    this.box.bar = null;
                };

                this.appendTo = function(element){
                    element.append(this.scrollBar);
                    return this;
                };

                this.setHeights = function(){
                    this.scrollBarUp.hgt = this.scrollBarUp.height();
                    this.scrollBarDown.hgt = this.scrollBarDown.height();
                    this.scrollBarArea.hgt = this.scrollBar.height() - (this.scrollBarUp.hgt + this.scrollBarDown.hgt);

                    this.scrollBarArea.height(this.scrollBarArea.hgt);

                    this.setScrollerHeight();
                    this.setScrollerEvents();
                };

                this.recalc = function(){
                    this.setScrollerHeight();
                    this.box.wrapper.trigger('scroll');
                };

                this.setScrollerHeight = function(){
                    //this.box.innerBox.height(); // дергаем высоту, чтобы ослы < 8 отрендерили элемент до того как будет считаться
                    this.scrollBarScroller.height(parseInt(this.box.params.iBoxH/this.box.params.iBoxScH*this.scrollBarArea.hgt));
                    this.scrollBarScroller.hgt = this.scrollBarScroller.height();
                };

                this.setScrollerEvents = function(){
                    this.box.wrapper.bind('sMouseScroll', function(e){
                        self.box.iBox.scrollTop(self.box.iBox[0].scrollTop+e.delta*opts.scrollStep);
                        $(this).trigger('scroll');
                        return false;
                    }).bind('scroll', function(){
                            var scrollerTop = ((self.scrollBarArea.hgt-self.scrollBarScroller.hgt)*self.box.iBox[0].scrollTop)/(self.box.params.iBoxScH-self.box.params.iBoxH);
                            self.scrollBarScroller.css({top: scrollerTop});
                        });

                    this.scrollBarUp.click(function(){
                        self.scrollUp();
                        self.box.wrapper.trigger('scroll');
                    }).mousedown(function(){

                        }).mouseup(function(){

                        });

                    this.scrollBarDown.click(function(){
                        self.scrollDown();
                        self.box.wrapper.trigger('scroll');
                    }).mousedown(function(){

                        }).mouseup(function(){

                        });

                    this.scrollBarScroller.mousedown(this.scrollerMouseDown);
                };

                this.scrollerMouseDown = function(e){
                    self.scrollBarScroller.startCord = e.pageY;
                    self.scrollBarScroller.startScrollCord = parseInt(self.scrollBarScroller.css('top'));
                    bodyElement.bind('mousemove', self.dragDropScroller)
                        .mouseup(function(){
                            bodyElement.unbind('mousemove', self.dragDropScroller);
                        });
                    return false;
                };

                this.scrollUp = function(){
                    this.box.iBox.scrollTop(this.box.iBox[0].scrollTop-opts.scrollStep);
                };

                this.scrollDown = function(){
                    this.box.iBox.scrollTop(this.box.iBox[0].scrollTop+opts.scrollStep);
                };

                this.dragDropScroller = function(e){
                    var curCord = e.pageY,
                        delta = self.scrollBarScroller.startCord - curCord,
                        scrollerTop = Math.min(Math.max(self.scrollBarScroller.startScrollCord-delta, 0), self.scrollBarArea.hgt - self.scrollBarScroller.hgt);

                    self.scrollBarScroller.css({top: scrollerTop});

                    self.box.iBox.scrollTop(scrollerTop*(self.box.params.iBoxScH-self.box.params.iBoxH)/(self.scrollBarArea.hgt-self.scrollBarScroller.hgt));
                    return false;
                };


            }

            return this;

        }
    });

    $.event.special.sMouseScroll = {
        setup: function() {
            if (this.addEventListener)
                this.addEventListener('DOMMouseScroll', $.event.special.sMouseScroll.handler, false);
            this.onmousewheel = $.event.special.sMouseScroll.handler;
        },
        teardown: function() {
            if (this.removeEventListener)
                this.removeEventListener('DOMMouseScroll', $.event.special.sMouseScroll.handler, false);
            this.onmousewheel = null;
        },
        handler: function( event ) {
            var evDet =  event.wheelDelta/-40 || event.detail;
            event = $.event.fix(event || window.event);
            event.type = "sMouseScroll";
            event.delta = 0;
            event.delta = evDet;
            $.event.handle.apply( this, [event] );
            return ;
        }
    };

    if (/*@cc_on!@*/false)
        $.event.special.input = {
            setup: function(d){
                if (d){
                    $(this).bind('keyup.IE drop.IE cut.IE paste.IE', d, $.event.special.input._handler);
                } else {
                    $(this).bind('keyup.IE drop.IE cut.IE paste.IE', $.event.special.input._handler);
                }
            },
            teardown: function(){
                $(this).unbind('keyup.IE drop.IE cut.IE paste.IE', $.event.special.input._handler);
            },
            _handler: function(e){
                var t = this,
                    a = arguments;
                if (e.type !== 'keyup'){
                    setTimeout(function(){
                        $.event.special.input.handler.apply(t, a);
                    },0);
                } else {
                    $.event.special.input.handler.apply(t, a);
                }
            },
            handler: function(e){
                var el = e.target,
                    name = el.tagName.toLocaleLowerCase();
                if (name !== 'input' && name !== 'textarea') return;
                if (name === 'input' && (el.type === 'button' || el.type === 'checkbox' || el.type === 'radio' || el.type === 'hidden' || el.type === 'image' || el.type === 'reset' || el.type === 'submit')) return;
                var symbolKey = (e.which >= 48 && e.which <= 90) || (e.which >= 96 && e.which <= 111) || (e.which >= 186 && e.which <= 222) || e.which === 32 || e.which === 13,
                    deleteKey = e.which === 46 || e.which === 8;
                if (e.type === 'keyup' && (!symbolKey || (symbolKey && e.ctrlKey)) && !deleteKey) return;
                if (el._value !== el.value || e.type === 'drop' || e.type === 'paste' || e.type === 'cut'){
                    e.type = 'input';
                    $.event.handle.apply(this, arguments);
                    el._value = el.value;
                }
            }
        };

    function actions(self, wrap, e, cls){
        var role = wrap.attr('role') || '';
        switch (e.type) {
            case 'mouseover':
                wrap.addClass(cls.hover+role);
                break;
            case 'mouseout':
                wrap.removeClass(cls.hover+role);
                if(wrap.hasClass(cls.pressed+role)) self.trigger('unpress');
                break;
            case 'focus':
            case 'focusin':
                wrap.addClass(cls.focused+role);
                break;
            case 'blur':
            case 'focusout':
            case 'chFocusout':
                wrap.removeClass(cls.focused+role);
                break;
            case 'disable':
            case 'chDisable':
                wrap.addClass(cls.disabled+role);
                break;
            case 'enable':
            case 'chEnable':
                wrap.removeClass(cls.disabled+role);
                break;
            case 'mousedown':
                if(self) self.trigger('press');
                break;
            case 'mouseup':
                if(self) self.trigger('unpress');
                break;
            case 'press':
                wrap.addClass(cls.pressed+role);
                break;
            case 'unpress':
                wrap.removeClass(cls.pressed+role);
                break;
            case 'readonly':
            case 'chReadonly':
                wrap.addClass(cls.readonly+role);
                break;
            case 'notReadonly':
            case 'chNotReadonly':
                wrap.removeClass(cls.readonly+role);
                break;
            case 'invalid':
                wrap.addClass(cls.invalid+role);
                break;
            case 'valid':
                wrap.removeClass(cls.invalid+role);
                break;
        }
    }

    function resetHandler(hash){
        var form = $(hash.field.context.form);
        if(form && (!form.data().events || !form.data().events.reset))
            form.bind('reset', function(){
                var self = this;
                setTimeout(function(){
                    for(var i = 0; i < self.elements.length; i++){
                        var el = self.elements[i];
                        /** для IE 6,7 - при отсуствии атрибута селектед хотя бы у одного опшена они возвращают в качестве вал херню */
                        if(/*@cc_on!@*/false && el.nodeName.toLowerCase() == 'select' && (!$(el).val() || typeof($(el).val()) != 'string') && el.options.length) el.options[0].selected = true;
                        /** end - for IE 6,7 */
                        $(el).trigger('pull');
                        $(el).trigger('valid');
                    }
                }, 0);
            });
    }

})(jQuery);