PROJECT.APP = function (on_start) {//конструктор
    var here = this;
    var actions = [];
    here.order_step = 1000;//max childten

    here.on_start = on_start;
    here.on_resize_functions = [];
    here.on_update_functions = [];
    here.custom_types = {};
    here.busy = 0;
    here.ver = "?ver=" + PROJECT.STR.gfx_version;
    here.dist_3d = PROJECT.DAT.height / 2 / Math.tan(Math.PI * PROJECT.DAT.angle / 360);
    here.first_click = true;
    here.on_first_click = null;
    here.height = -1;
    here.width = -1;

    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    here.isMobile =
    {
        Android: function () { return navigator.userAgent.match(/Android/i); },
        BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
        iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
        Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
        Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
        any: function () { return (here.isMobile.Android() || here.isMobile.BlackBerry() || here.isMobile.iOS() || here.isMobile.Opera() || here.isMobile.Windows()); }
    }
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    here.quad_scene = new THREE.Scene();
    here.back_scene = new THREE.Scene();
    here.scene = new THREE.Scene();
    here.scene_3d = new THREE.Scene();
    //here.scene_3d.fog=new THREE.Fog(0x84e0fb,0.015,350);

    here.camera = new THREE.OrthographicCamera(-PROJECT.DAT.width / 150, PROJECT.DAT.width / 150, PROJECT.DAT.height / 150, -PROJECT.DAT.height / 150, -1000000, 1000000);
    here.camera_3d = new THREE.PerspectiveCamera(PROJECT.DAT.angle, PROJECT.DAT.width / PROJECT.DAT.height, 0.1, 10000000);
    here.isIE11 = /Trident.*rv[ :]*11\./.test(navigator.userAgent);

    if (!here.isIE11) {
        var listener = new THREE.AudioListener();
        here.MainSound = listener;
        here.camera.add(listener);
    }

    here.strite_txt = here.isIE11;
    here.camera_3d.position.z = 475;
    here.camera_3d.position.y = 422;
    here.camera_3d.position.x = 0;
    here.camera_3d.rotation.x = -Math.PI * 30 / 180;

    here.camera.position.z = 0;
    here.camera.rotation.z = Math.PI;
    here.camera.rotation.y = Math.PI;

    //here.renderer_texture = new THREE.WebGLRenderTarget(PROJECT.DAT.width,PROJECT.DAT.height, {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter});
    here.renderer = new THREE.WebGLRenderer({ antialias: true });
    here.renderer.autoClear = false;
    here.renderer.setClearColor(PROJECT.DAT.color);
    here.renderer.setPixelRatio(window.devicePixelRatio);
    here.renderer.setSize(PROJECT.DAT.width, PROJECT.DAT.height);

    document.getElementById("game").appendChild(here.renderer.domElement);
    here.renderer.domElement.style.position = "absolute";
    here.renderer.domElement.style["z-index"] = "1";
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    function destroy() {
        if (this.parent !== null)
            this.parent.remove(this);

        this.parent = null;
        while (this.children.length > 0)
            this.remove(this.children[0]);

        while (this.avk.img.length > 0) {
            var img = this.avk.img.pop();
            img.geometry.dispose();
            img.material.dispose();
            img.material.map.dispose();
            img.material.map = null;
            img.material = null;
            img.geometry = null;
        }
    }

    function removeChild(object) {
        this.remove(object);
    }

    function removeChildDown(index) {
        if ((index >= 0) && (index < this.children.length))
            this.remove(this.children[index]);
    }

    function addChild(object) {
        this.add(object);
        this.orderRefresh();
        object.alpha = object.alpha;
    }

    function addChildDown(object) {
        if (object === this) {
            console.error("THREE.Object3D.add: object can't be added as a child of itself.", object);
            return this;
        }

        if ((object && object.isObject3D)) {
            if (object.parent !== null) {
                object.parent.remove(object);
            }

            object.parent = this;
            object.dispatchEvent({ type: 'added' });
            var pic = null;
            if (this.avk) {
                if (this.children[0] == this.avk.img[this.avk.currentFrame])
                    pic = this.children.shift();
            }
            this.children.unshift(object);
            if (pic)
                this.children.unshift(pic);
            this.orderRefresh();
            object.alpha = object.alpha;
        } else {
            console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", object);
        }
    }

    function orderRefresh() {
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].renderOrder = this.renderOrder + (i + 1) * this.renderOrderStep;
            this.children[i].renderOrderStep = this.renderOrderStep / here.order_step;
            if (this.children[i].orderRefresh)
                this.children[i].orderRefresh();
        }
    }

    function getGlobalPosition() {
        var res = { "x": this.x, "y": this.y };
        var prnt = this.parent;
        while (prnt != null) {
            res.x += prnt.x;
            res.y += prnt.y;
            prnt = prnt.parent;
        }
        return res;
    }
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------    
    here.get_sprite_t = function (t) {
        var group = new THREE.Group();
        group.avk = { "img": [], "currentFrame": 0 };
        group.frustumCulled = false;

        group.addChild = addChild;
        group.addChildDown = addChildDown;
        group.removeChild = removeChild;
        group.removeChildDown = removeChildDown;
        group.orderRefresh = orderRefresh;
        group.destroy = destroy;
        group.getGlobalPosition = getGlobalPosition;
        group.interactive = false;

        function get_spr(tx) {
            var material = new THREE.SpriteMaterial({ map: tx, color: 0xffffff, transparent: true, sizeAttenuation: false, depthWrite: false, depthTest: false });
            var spr = new THREE.Sprite(material);
            spr.scale.set(spr.material.map.image.width, spr.material.map.image.height, 1);
            spr.frustumCulled = false;
            spr.center.x = 0
            spr.center.y = 1;
            spr.i_rw = spr.i_w = spr.material.map.image.width;
            spr.i_rh = spr.i_h = spr.material.map.image.height;
            return spr;
        }

        group.avk.img.push(get_spr(t));

        group.add(group.avk.img[0]);
        group.avk.i_rw = group.avk.img[0].i_rw;
        group.avk.i_w = group.avk.img[0].i_w;
        group.avk.i_rh = group.avk.img[0].i_rh;
        group.avk.i_h = group.avk.img[0].i_h;

        return group;
    }
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------    
    here.app_gfx = new THREE.Group();
    here.preloader_gfx = new THREE.Group();
    here.msg_up_gfx = new THREE.Group();
    here.msg_shadow_gfx = new THREE.Group();
    here.msg_down_gfx = new THREE.Group();
    here.middle_gfx = new THREE.Group();
    here.gui_gfx = new THREE.Group();
    here.render_gfx = new THREE.Group();

    here.scene_3d.add(here.app_gfx);

    here.back_scene.add(here.render_gfx);
    here.scene.add(here.gui_gfx);

    here.gui_gfx.position.z = 0;
    here.gui_gfx.position.x = 0;
    here.gui_gfx.position.y = 0;

    here.render_gfx.position.z = 0;
    here.render_gfx.position.x = 0;
    here.render_gfx.position.y = 0;

    here.middle_gfx.interactive = false;
    here.msg_down_gfx.interactive = false;
    here.msg_shadow_gfx.interactive = false;
    here.msg_up_gfx.interactive = false;
    here.preloader_gfx.interactive = false;

    here.middle_gfx.avk = { "img": [] };
    here.msg_down_gfx.avk = { "img": [] };
    here.msg_shadow_gfx.avk = { "img": [] };
    here.msg_up_gfx.avk = { "img": [] };
    here.preloader_gfx.avk = { "img": [] };

    here.gui_gfx.add(here.middle_gfx);
    here.gui_gfx.add(here.msg_down_gfx);
    here.gui_gfx.add(here.msg_shadow_gfx);
    here.gui_gfx.add(here.msg_up_gfx);
    here.gui_gfx.add(here.preloader_gfx);

    here.render_gfx.renderOrder = 1000000000000000;
    here.middle_gfx.renderOrder = 2000000000000000;
    here.msg_down_gfx.renderOrder = 3000000000000000;
    here.msg_shadow_gfx.renderOrder = 4000000000000000;
    here.msg_up_gfx.renderOrder = 5000000000000000;
    here.preloader_gfx.renderOrder = 6000000000000000;
    here.render_gfx.renderOrderStep = 1000000000000000 / here.order_step;
    here.middle_gfx.renderOrderStep = 2000000000000000 / here.order_step;
    here.msg_down_gfx.renderOrderStep = 3000000000000000 / here.order_step;
    here.msg_shadow_gfx.renderOrderStep = 4000000000000000 / here.order_step;
    here.msg_up_gfx.renderOrderStep = 5000000000000000 / here.order_step;
    here.preloader_gfx.renderOrderStep = 6000000000000000 / here.order_step;

    here.render_gfx.addChild = here.middle_gfx.addChild = here.msg_down_gfx.addChild = here.msg_shadow_gfx.addChild = here.msg_up_gfx.addChild = here.preloader_gfx.addChild = addChild;
    here.render_gfx.addChildDown = here.middle_gfx.addChildDown = here.msg_down_gfx.addChildDown = here.msg_shadow_gfx.addChildDown = here.msg_up_gfx.addChildDown = here.preloader_gfx.addChildDown = addChildDown;
    here.render_gfx.removeChild = here.middle_gfx.removeChild = here.msg_down_gfx.removeChild = here.msg_shadow_gfx.removeChild = here.msg_up_gfx.removeChild = here.preloader_gfx.removeChild = removeChild;
    here.render_gfx.removeChildDown = here.middle_gfx.removeChildDown = here.msg_down_gfx.removeChildDown = here.msg_shadow_gfx.removeChildDown = here.msg_up_gfx.removeChildDown = here.preloader_gfx.removeChildDown = removeChildDown;
    here.render_gfx.orderRefresh = here.middle_gfx.orderRefresh = here.msg_down_gfx.orderRefresh = here.msg_shadow_gfx.orderRefresh = here.msg_up_gfx.orderRefresh = here.preloader_gfx.orderRefresh = orderRefresh;
    here.render_gfx.getGlobalPosition = here.middle_gfx.getGlobalPosition = here.msg_down_gfx.getGlobalPosition = here.msg_shadow_gfx.getGlobalPosition = here.msg_up_gfx.getGlobalPosition = here.preloader_gfx.getGlobalPosition = getGlobalPosition;

    /*here.spr_3d=here.get_sprite_t(here.renderer_texture.texture);
    here.spr_3d.children[0].scale.set(here.spr_3d.children[0].material.map.image.width,here.spr_3d.children[0].material.map.image.height,1);
    here.render_gfx.addChildDown(here.spr_3d);
    */

    here.add_shadow = function (name) {
        here.shadow = here.get_sprite(name);
        here.shadow.interactive = true;
        here.shadow.sy = 400;
        here.shadow.sx = 3000;
        here.shadow.x = (PROJECT.DAT.width - here.width / here.scale) / 2;
        here.shadow.p_w = here.shadow.avk.i_w;
        here.shadow.p_h = here.shadow.avk.i_h;
        here.msg_shadow_gfx.addChild(here.shadow);
        here.shadow.visible = false;
    }
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------

    here.sprites_stack = {};
    here.get_sprite = function (name, atl, is_3d) {
        if (typeof (is_3d) == "undefined")
            is_3d = false;

        if (is_3d)
            var dist = here.dist_3d;
        else var dist = 1;

        if (typeof (here.sprites_stack[name]) == "undefined")
            here.sprites_stack[name] = [];

        if (here.sprites_stack[name].length > 0) {
            var o = here.sprites_stack[name].pop();
            o.sx = o.sy = 1;
            o.alpha = 1;
        }

        var group = new THREE.Group();
        group.avk = { "img": [], "currentFrame": 0 };
        group.frustumCulled = false;
        group.my_stack = here.sprites_stack[name];
        group.addChild = addChild;
        group.addChildDown = addChildDown;
        group.removeChild = removeChild;
        group.removeChildDown = removeChildDown;
        group.orderRefresh = orderRefresh;

        group.free = function () {
            if (this.parent !== null)
                this.parent.remove(this);

            this.parent = null;
            this.my_stack.push(this);
        }

        group.destroy = destroy;
        group.getGlobalPosition = getGlobalPosition;
        group.interactive = false;

        function get_spr(nm) {
            var material = new THREE.SpriteMaterial({ map: here.materials[nm], color: 0xffffff, transparent: true, sizeAttenuation: false, depthWrite: false, depthTest: false });
            var spr = new THREE.Sprite(material);
            spr.scale.set(spr.material.map.image.width / dist, spr.material.map.image.height / dist, 1);
            spr.frustumCulled = false;
            spr.center.x = 0
            spr.center.y = 1;
            spr.i_rw = spr.i_w = spr.material.map.image.width;
            spr.i_rh = spr.i_h = spr.material.map.image.height;
            return spr;
        }

        function get_atl(nm) {
            for (var key in here.atlases) {
                var atl = here.atlases[key];
                if (atl.map.frames[nm]) {
                    var material = new THREE.SpriteMaterial({ map: atl.material, color: 0xffffff, transparent: true, sizeAttenuation: false, depthWrite: false, depthTest: false });
                    var frame = atl.map.frames[nm];
                    var aw = material.map.image.width;
                    var ah = material.map.image.height;

                    var sprite = new THREE.Sprite(material);
                    sprite.frustumCulled = false;
                    var geometry = new THREE.BufferGeometry();
                    var x1 = frame.frame.x / aw;
                    var y1 = frame.frame.y / ah;
                    var x2 = (frame.frame.x + frame.frame.w) / aw;
                    var y2 = (frame.frame.y + frame.frame.h) / ah;
                    var float32Array = new Float32Array([
                        - 0.5, - 0.5, 0, x1, 1.0 - y2,
                        0.5, - 0.5, 0, x2, 1.0 - y2,
                        0.5, 0.5, 0, x2, 1.0 - y1,
                        - 0.5, 0.5, 0, x1, 1.0 - y1
                    ]);
                    var interleavedBuffer = new THREE.InterleavedBuffer(float32Array, 5);
                    geometry.setIndex([0, 1, 2, 0, 2, 3]);
                    geometry.setAttribute('position', new THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));
                    geometry.setAttribute('uv', new THREE.InterleavedBufferAttribute(interleavedBuffer, 2, 3, false));
                    sprite.geometry = geometry;

                    sprite.i_rw = frame.frame.w;
                    sprite.i_rh = frame.frame.h;
                    sprite.i_w = frame.spriteSourceSize.w;
                    sprite.i_h = frame.spriteSourceSize.h;
                    sprite.i_x = frame.spriteSourceSize.x;
                    sprite.i_y = frame.spriteSourceSize.y;

                    sprite.scale.set(frame.frame.w / dist, frame.frame.h / dist, 1);
                    sprite.center.x = 0
                    sprite.center.y = 1;
                    sprite.position.x = frame.spriteSourceSize.x;
                    sprite.position.y = frame.spriteSourceSize.y;

                    return sprite;
                }
            }
            return null;
        }

        if ((typeof (name) == "undefined") || (name == "")) {
            group.avk.i_rw = group.avk.i_w = 0;
            group.avk.i_rh = group.avk.i_h = 0;
        } else {
            if (atl) {
                if (Array.isArray(name)) {
                    for (var i = 0; i < name.length; i++)
                        group.avk.img.push(get_atl(name[i]));
                } else {
                    group.avk.img.push(get_atl(name));
                }
            } else {
                if (Array.isArray(name)) {
                    for (var i = 0; i < name.length; i++)
                        group.avk.img.push(get_spr(name[i]));
                } else {
                    group.avk.img.push(get_spr(name));
                }
            }

            group.add(group.avk.img[0]);
            group.avk.i_rw = group.avk.img[0].i_rw;
            group.avk.i_w = group.avk.img[0].i_w;
            group.avk.i_rh = group.avk.img[0].i_rh;
            group.avk.i_h = group.avk.img[0].i_h;
        }

        return group;
    }

    Object.defineProperty(THREE.Object3D.prototype, 'sx',
        {
            get: function () {
                if (typeof (this._sx) == "undefined")
                    this._sx = 1;
                return this._sx;
            },
            set: function (value) {
                this._sx = value;
                if (this._sx == 0)
                    this._sx = 0.00000000000000001;
                this.scale.set(this.sx, this.sy, 1);
            }
        });

    Object.defineProperty(THREE.Object3D.prototype, 'sy',
        {
            get: function () {
                if (typeof (this._sy) == "undefined")
                    this._sy = 1;
                return this._sy;
            },
            set: function (value) {
                this._sy = value;
                if (this._sy == 0)
                    this._sy = 0.00000000000000001;
                this.scale.set(this.sx, this.sy, 1);
            }
        });

    Object.defineProperty(THREE.Object3D.prototype, 'alpha',
        {
            get: function () {
                if (typeof (this._alpha) == "undefined")
                    this._alpha = 1;
                return this._alpha;
            },
            set: function (value) {
                this._alpha = value;
                if (this.avk) {
                    var res_alpha = value;
                    var prnt = this.parent;
                    while (prnt != null) {
                        res_alpha = res_alpha * prnt.alpha;
                        prnt = prnt.parent;
                    }

                    for (var i = 0; i < this.avk.img.length; i++)
                        this.avk.img[i].material.opacity = res_alpha;

                    for (i = 0; i < this.children.length; i++)
                        if (this.children[i].avk)
                            this.children[i].alpha = this.children[i].alpha;
                }
            }
        });

    Object.defineProperty(THREE.Object3D.prototype, 'x',
        {
            get: function () {
                return this.position.x;
            },
            set: function (value) {
                this.position.x = value;
            }
        });

    Object.defineProperty(THREE.Object3D.prototype, 'y',
        {
            get: function () {
                return this.position.y;
            },
            set: function (value) {
                this.position.y = value;
            }
        });

    Object.defineProperty(THREE.Object3D.prototype, 'text',
        {
            get: function () {
                if ((this.avk) && (this.avk.txt)) {
                    if ((typeof (this.avk.txt.set_text) != "undefined"))
                        return this.avk.txt.avk_text;
                    else return this.avk.txt.text;
                } else return null;
            },
            set: function (value) {
                if ((this.avk) && (this.avk.txt)) {
                    if ((typeof (this.avk.txt.set_text) != "undefined"))
                        this.avk.txt.set_text(value);
                    else this.avk.txt.text = value;
                }
            }
        });
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    here.loading_step = 0;
    here.materials = {};
    here.atlases = {};
    here.manager = new THREE.LoadingManager();
    here.loader = new THREE.TextureLoader(here.manager);
    here.font_loader = new THREE.FontLoader(here.manager);
    here.file_loader = new THREE.FileLoader(here.manager);
    here.obj_loader = new THREE.OBJLoader(here.manager)
    here.mtl_loader = new THREE.MTLLoader(here.manager);
    here.audioLoader = new THREE.AudioLoader(here.manager);

    here.manager.onStart = function (url, itemsLoaded, itemsTotal) {
    }

    here.itemsLoaded = 0;
    here.manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        here.itemsLoaded = itemsLoaded;
        var p = (here.itemsLoaded + here.sounds_loaded) / here.total_to_load;
        if (p > 1)
            p = 1;

        if (here.loading_step > 0)
            PROJECT.PRELOADER.set_progress(p);

        here.on_resize();
        //console.log(here.itemsLoaded+":"+url);
    }

    here.manager.onError = function (url) {
        console.log('loading error:' + url);
    }

    here.get_text = function (text, font_size, font_color) {
        if (PROJECT.STR.lng == "ja")
            var fnt = Math.floor(font_size + 1) + "px Yusei Magic";
        else var fnt = Math.floor(font_size) + "px Roboto Slab";

        var txt = new THREE_Text2D.SpriteText2D(text, {
            align: THREE_Text2D.textAlign.center,
            font: fnt,
            fillStyle: font_color
        });

        txt.material.map.magFilter = THREE.LinearFilter;
        txt.material.map.minFilter = THREE.LinearFilter;
        //txt.scale.set(0.5,0.5,0.5);
        return txt;
    }

    var tmnp_v = new THREE.Vector3(0, 0, 0);
    here.get_text_3d = function (text, font_size, font_color) {
        /*
        text = new THREE_Text2D.MeshText2D("CENTER", {
            align: THREE_Text2D.textAlign.center,
            font: '20px Arial',
            fillStyle: '#00ffff',
            antialias: false
        });
        text.material.alphaTest = 0.1;
        text.position.set(0, 40, 200);
        text.scale.set(1.5, 1.5, 1.5);
        here.wnd.main.addChild(text);*/
        font_size = (0.72 * font_size);
        if ((PROJECT.STR.lng == "ja") || (PROJECT.STR.lng == "ru"))
            var fnt = here.ja_font;
        else var fnt = here.font;
        var geometry = new THREE.TextGeometry(text, {
            font: fnt,
            size: font_size,
            height: 0,
            curveSegments: 2,
            bevelEnabled: false,
            bevelThickness: 0,
            bevelSize: 0,
            bevelOffset: 0,
            bevelSegments: 0
        });
        var materials = new THREE.MeshBasicMaterial({ color: font_color, opacity: 1, transparent: true, depthWrite: false, depthTest: false });
        var geometry = new THREE.BufferGeometry().fromGeometry(geometry);
        var txt = new THREE.Mesh(geometry, materials);
        txt.position.x = 0;
        txt.position.y = font_size;
        txt.position.z = 0;
        txt.rotation.x = 0;
        txt.rotation.y = Math.PI;
        txt.rotation.z = Math.PI;
        txt.avk_text = text;
        txt.font_size = font_size;
        txt.set_text = function (text) {
            if (this.avk_text != text) {
                this.avk_text = text;
                this.geometry.dispose();
                if ((PROJECT.STR.lng == "ja") || (PROJECT.STR.lng == "ru"))
                    var fnt = here.ja_font;
                else var fnt = here.font;
                var geometry = new THREE.TextGeometry(text, {
                    font: fnt,
                    size: this.font_size,
                    height: 0,
                    curveSegments: 12,
                    bevelEnabled: true,
                    bevelThickness: 0,
                    bevelSize: 0,
                    bevelOffset: 0,
                    bevelSegments: 0
                });
                this.geometry = new THREE.BufferGeometry().fromGeometry(geometry);
            }
            var t = new THREE.Box3().setFromObject(txt).getSize(tmnp_v);
            this.height = t.y;
            this.width = t.x;
            this.position.x = (this.spr.p_w - this.width) / 2;//spr.p_w/2;
        }
        var t = new THREE.Box3().setFromObject(txt).getSize(tmnp_v);
        txt.height = t.y;
        txt.width = t.x;

        return txt;
    }

    here.get_plane = function (name) {
        if (!here.objects_stack[name])
            here.objects_stack[name] = [];

        for (var i = 0; i < here.objects_stack[name].length; i++) {
            if (!here.objects_stack[name][i].is_active) {
                here.objects_stack[name][i].is_active = true;
                return here.objects_stack[name][i];
            }
        }

        for (var key in here.atlases) {
            var atl = here.atlases[key];
            for (var frm in atl.map.frames) {
                if (frm == name) {
                    atl.material.magFilter = THREE.NearestFilter;
                    atl.material.minFilter = THREE.NearestFilter;

                    var geometry = new THREE.PlaneGeometry(1, 1);
                    var material = new THREE.MeshBasicMaterial({ map: atl.material, color: 0xffffff, transparent: true, depthWrite: false, side: THREE.DoubleSide });

                    var frame = atl.map.frames[frm];
                    var aw = material.map.image.width;
                    var ah = material.map.image.height;

                    var geometry = new THREE.BufferGeometry();
                    var x1 = frame.frame.x / aw;
                    var y1 = frame.frame.y / ah;
                    var x2 = (frame.frame.x + frame.frame.w) / aw;
                    var y2 = (frame.frame.y + frame.frame.h) / ah;
                    var float32Array = new Float32Array([
                        - 0.5, - 0.5, 0, x1, 1.0 - y2,
                        0.5, - 0.5, 0, x2, 1.0 - y2,
                        0.5, 0.5, 0, x2, 1.0 - y1,
                        - 0.5, 0.5, 0, x1, 1.0 - y1
                    ]);
                    var interleavedBuffer = new THREE.InterleavedBuffer(float32Array, 5);
                    geometry.setIndex([0, 1, 2, 0, 2, 3]);
                    geometry.setAttribute('position', new THREE.InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));
                    geometry.setAttribute('uv', new THREE.InterleavedBufferAttribute(interleavedBuffer, 2, 3, false));
                    var sprite = new THREE.Mesh(geometry, material);

                    sprite.i_rw = frame.frame.w;
                    sprite.i_rh = frame.frame.h;
                    sprite.i_w = frame.spriteSourceSize.w;
                    sprite.i_h = frame.spriteSourceSize.h;

                    sprite.is_active = true;
                    sprite.free = function () { if (this.parent) { this.parent.remove(this); this.is_active = false; } };
                    here.objects_stack[name].push(sprite);
                    sprite.p_name = name;

                    return sprite;
                }
            }
        }

        if (here.materials[name]) {
            var material = new THREE.MeshBasicMaterial({ map: here.materials[name], color: 0xffffff, transparent: true, depthWrite: false, side: THREE.DoubleSide });
            var geometry = new THREE.PlaneGeometry(10, 10);
            var sprite = new THREE.Mesh(geometry, material);
            sprite.is_active = true;
            sprite.free = function () { if (this.parent) { this.parent.remove(this); this.is_active = false; } };
            here.objects_stack[name].push(sprite);
            sprite.p_name = name;
            return sprite;
        }
        return null;
    }

    here.get_object = function (name) {
        if (!here.objects_stack[name])
            here.objects_stack[name] = [];

        for (var i = 0; i < here.objects_stack[name].length; i++) {
            if (!here.objects_stack[name][i].is_active) {
                here.objects_stack[name][i].is_active = true;
                return here.objects_stack[name][i];
            }
        }

        for (i = 0; i < here.objects.children.length; i++) {
            if (here.objects.children[i].name == name + "_" + name + "_geom") {
                var obj = here.objects.children[i].clone();
                if (Array.isArray(here.objects.children[i].material)) {
                    obj.material = [];
                    for (var n = 0; n < here.objects.children[i].material.length; n++) {
                        obj.material[here.objects.children[i].material[n].name] = obj.material[n] = here.objects.children[i].material[n].clone();
                    }
                } else obj.material = here.objects.children[i].material.clone();
                obj.material.side = THREE.DoubleSide;
                //obj.material.transparent=true;
                obj.is_active = true;
                obj.free = function () { if (this.parent) { this.parent.remove(this); this.is_active = false; } };
                here.objects_stack[name].push(obj);
                obj.p_name = name;
                return obj;
            }
        }
    }

    function on_mtl_loaded(materials) {
        function on_obj_loaded(obj) {
            here.objects = obj;
            here.objects_stack = {};
        }

        materials.preload();
        here.obj_loader.setMaterials(materials);
        here.obj_loader.load(PROJECT.DAT.object + '.obj' + here.ver, on_obj_loaded);
    }

    here.font = here.ja_font = null;
    here.sounds = {};
    if (here.isIE11) {
        here.MainSound = new function () {
            this.volume = 1;
            this.setMasterVolume = function (val) {
                this.volume = val;
                for (key in here.sounds) {
                    if (here.sounds[key].snd != null)
                        here.sounds[key].snd.volume = here.sounds[key].avk_vol * this.volume;
                }
            }
        }
    }

    function SND_LOADER(name) {
        var loc = this;
        loc.name = name;
        here.sounds[name] = { "data": null };

        function on_snd_loaded(buffer) {
            var sound = new THREE.Audio(listener);
            here.sounds[loc.name] = sound;
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.5);
            try_finish_load();
        }

        here.audioLoader.load(PROJECT.DAT.snd_folder + name + ".mp3", on_snd_loaded);
    }

    here.sounds_loaded = 0;
    here.loaded_finish = false;
    here.manager.onLoad = function () {
        if (here.loading_step == 0) {//загрузили прелоадер
            here.loading_step++;
            PROJECT.PRELOADER.show(here);

            here.font_loader.load(PROJECT.DAT.font, function (font) { here.font = font; });
            here.font_loader.load(PROJECT.DAT.ja_font, function (font) { here.ja_font = font; });
        } else if (here.loading_step == 1) {
            if ((here.font) && (here.ja_font)) {
                here.loading_step++;
                for (var key in PROJECT.DAT.assets) {
                    new ATL_LOADER(key);
                }

                function handleLoad(event) {
                    here.sounds_loaded++;
                    var sound = new function () {
                        this.name = event.id;
                        this.avk_loop = false;
                        this.avk_vol = 0.5;
                        this.snd = null;
                        this.setLoop = function (val) { this.avk_loop = val };
                        this.setVolume = function (val) { this.avk_vol = val; if (this.snd != null) this.snd.volume = val * here.MainSound.volume };
                        this.stop = function (val) { if (this.snd != null) this.snd.stop() };
                        this.play = function () {
                            if (this.snd != null) {
                                if (this.avk_loop) this.snd.play("none", 0, 0, -1); else this.snd.play();
                            } else {
                                if (this.avk_loop) this.snd = createjs.Sound.play(this.name, "none", 0, 0, -1); else this.snd = createjs.Sound.play(this.name);
                            }
                            this.snd.volume = this.avk_vol * here.MainSound.volume;
                        };
                        this.isPlaying = function () { return true };

                    }

                    here.sounds[event.id] = sound;
                    var p = (here.itemsLoaded + here.sounds_loaded) / here.total_to_load;
                    if (p > 1)
                        p = 1;

                    if (here.loading_step > 0)
                        PROJECT.PRELOADER.set_progress(p);

                    try_finish_load();
                }
                if (here.isIE11) {
                    if (((createjs.WebAudioPlugin.isSupported()) || (!here.isMobile.any())) && (createjs.Sound.initializeDefaultPlugins())) {
                        var audioPath = PROJECT.DAT.snd_folder;
                        var manifest = [];
                        for (var i = 0; i < PROJECT.DAT.sounds.length; i++) {
                            manifest.push({ id: PROJECT.DAT.sounds[i], src: PROJECT.DAT.sounds[i] + ".mp3" });
                        }
                        createjs.Sound.addEventListener("fileload", handleLoad);
                        createjs.Sound.registerManifest(manifest, audioPath);
                    }
                } else {
                    for (var i = 0; i < PROJECT.DAT.sounds.length; i++) {
                        new SND_LOADER(PROJECT.DAT.sounds[i]);
                    }
                }

                //here.font_loader.load('data/songti_sc_bold.typeface.js', function (res) {here.ja_font = res;})

                here.mtl_loader.load(PROJECT.DAT.object + '.mtl' + here.ver, on_mtl_loaded);
            }
        } else if (here.loading_step == 2) {
            try_finish_load();
            //window.console.log(here.sounds_loaded+":"+here.itemsLoaded+":"+here.total_to_load);

        }
    }

    function try_finish_load() {
        for (var key in here.atlases) {
            if ((here.atlases[key].map == null) || (here.atlases[key].material == null))
                return;
        }

        if ((here.sounds_loaded + here.itemsLoaded == here.total_to_load) && (!here.loaded_finish)) {
            here.loaded_finish = true;
            here.loading_step++;
            here.last_time = (new Date()).getTime();
            PROJECT.PRELOADER.hide_bar();
            build_gui();
            here.on_start();
        }
    }

    function ATL_LOADER(name) {
        var loc = this;
        loc.name = name;
        here.atlases[name] = { "material": null, "map": null };

        function on_json_loaded(obj) {
            here.atlases[loc.name].map = JSON.parse(obj);
            try_finish_load();
        }

        function on_texture_loaded(obj) {
            here.atlases[loc.name].material = obj;
            try_finish_load();
        }

        here.loader.load(PROJECT.DAT.gfx_gui_folder + name + ".png", on_texture_loaded);
        here.file_loader.load(PROJECT.DAT.assets[name], on_json_loaded);
    }

    here.on_texture_loaded = function (obj) {
        var name = obj.image.src;
        var n = name.search("ver");

        name = name.substr(0, n - 1);
        for (var i = name.length - 1; i >= 0; i--) {
            if (name[i] == "/") {
                name = name.substr(i + 1, name.length - i - 5);
                break;
            }
        }
        here.materials[name] = obj;
    }

    here.total_to_load = PROJECT.DAT.preloader.length + 6 + PROJECT.DAT.sounds.length;

    for (var key in PROJECT.DAT.assets) {
        here.total_to_load++;
    }

    for (var i = 0; i < PROJECT.DAT.preloader.length; i++) {
        var texture = here.loader.load(PROJECT.DAT.gfx_folder + PROJECT.DAT.preloader[i] + ".png" + here.ver, here.on_texture_loaded);
        texture.generateMipmaps = false;
        texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;
    }

    texture = here.loader.load(PROJECT.DAT.gfx_folder + PROJECT.DAT.shadow + ".png" + here.ver, here.on_texture_loaded);
    texture.generateMipmaps = false;
    texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.minFilter = THREE.LinearFilter;
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    var animate = function () {
        var time = (new Date()).getTime();
        var dt = time - here.last_time;

        if (here.loading_step > 1) {
            for (var i = 0; i < here.on_update_functions.length; i++)
                here.on_update_functions[i](dt);
        }

        here.renderer.clear(true, true, true);
        here.renderer.render(here.back_scene, here.camera);
        here.renderer.render(here.scene_3d, here.camera_3d);
        here.renderer.render(here.scene, here.camera);
        here.renderer.render(here.quad_scene, here.camera);

        here.last_time = time;
        requestAnimationFrame(animate);
    };

    animate();
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    here.isMob = function () {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);

        if (!check) {
            if ((navigator.maxTouchPoints) && (navigator.maxTouchPoints > 2) && (/MacIntel/.test(navigator.platform)))
                check = true;
        }
        return check;
    };


    function windowHasFocus() {

        return document.visibilityState === 'visible';// && (document.hasFocus());
    }

    function checkFocus() {
        here.focused = windowHasFocus();
        if (!here.focused)
            here.MainSound.setMasterVolume(0);
    }

    here.check_focused = checkFocus;
    here.focused = windowHasFocus();

    /*if (window)
    {
        window.addEventListener('pagehide', checkFocus);
        window.addEventListener('pageshow', checkFocus);
        window.addEventListener('blur', checkFocus);
        window.addEventListener('focus', checkFocus);
        window.addEventListener('visibilitychange', checkFocus);
        window.onfocus = checkFocus;
        window.onblur = checkFocus;
    }

    if (document)
    {
        document.addEventListener('pagehide', checkFocus);
        document.addEventListener('pageshow', checkFocus);
        document.addEventListener('blur', checkFocus);
        document.addEventListener('focus', checkFocus);
        document.addEventListener('visibilitychange', checkFocus);
        document.onfocus = checkFocus;
        document.onblur = checkFocus;
    } */
    if (window) {
        window.addEventListener('pagehide', checkFocus.bind(this));
        window.addEventListener('pageshow', checkFocus.bind(this));
        window.addEventListener('blur', checkFocus.bind(this));
        window.addEventListener('focus', checkFocus.bind(this));
        window.addEventListener('visibilitychange', checkFocus.bind(this));
        window.onfocus = checkFocus.bind(this);
        window.onblur = checkFocus.bind(this);
    }

    if (document) {
        document.addEventListener('pagehide', checkFocus.bind(this));
        document.addEventListener('pageshow', checkFocus.bind(this));
        document.addEventListener('blur', checkFocus.bind(this));
        document.addEventListener('focus', checkFocus.bind(this));
        document.addEventListener('visibilitychange', checkFocus.bind(this));
        document.onfocus = checkFocus.bind(this);
        document.onblur = checkFocus.bind(this);
    }

    here.verify_size = function () {
        checkFocus();
        var sUsrAg = navigator.userAgent;

        window.scrollTo(0, 1);
        if (sUsrAg.indexOf("SamsungBrowser") > -1) {
            var height = Math.floor($(window).height() || window.innerHeight);
            var width = Math.floor($(window).width() || window.innerWidth);
        } else {
            /*if (here.isMob())
            {
                var height = Math.floor(Math.min(window.innerHeight,$(window).height()));
                var width = Math.floor(Math.min(window.innerWidth,$(window).width()));
            }else
            {
                var height = Math.floor(Math.min(window.innerHeight,$(window).height()));
                var width = Math.floor(Math.min(window.innerWidth,$(window).width()));
                //var height = window.innerHeight||$(window).height();
                //var width = window.innerWidth||$(window).width();
            }*/
            if (here.isIE11) {
                var height = Math.floor(Math.min(window.innerHeight, $(window).height()));
                var width = Math.floor(Math.min(window.innerWidth, $(window).width()));
            } else {
                if ((here.isMob()) && (!here.isMobile.any())) {
                    if (window.innerWidth < window.innerHeight) {
                        var height = window.screen.width;
                        var width = window.screen.height;
                    } else {
                        var width = window.screen.width;
                        var height = window.screen.height;
                    }
                } else {
                    var height = Math.floor(window.innerHeight || $(window).height())
                    var width = Math.floor(window.innerWidth || $(window).width())
                }
            }
        }

        if (width < 1)
            width = 1;
        if (height < 1)
            height = 1;

        //alert($(window).width()+":"+$(window).height()+":"+window.innerWidth+":"+window.innerHeight+":"+window.devicePixelRatio);
        if ((here.width != width) || (here.height != height)) {
            here.width = width;
            here.height = height;
            var project_hw = PROJECT.DAT.height / PROJECT.DAT.width;
            var view_hw = height / width;

            if (view_hw < project_hw) {
                var view_w = Math.floor(height / project_hw);
                var view_h = height;
            } else {
                var view_w = width;
                var view_h = Math.floor(width * project_hw);
            }

            here.scale = height / PROJECT.DAT.height;
            here.dx = (width / here.scale - PROJECT.DAT.width) / 2;
            here.dy = 0;

            here.camera.left = 0;
            here.camera.right = width / here.scale;
            here.camera.top = 0;
            here.camera.bottom = -PROJECT.DAT.height;
            here.camera.updateProjectionMatrix();
            here.camera.position.x = -here.dx;

            //here.renderer_texture.setSize(width/here.scale,PROJECT.DAT.height);

            var w = Math.min(Math.floor(width / here.scale), Math.floor(width * PROJECT.STR.Q_SIZE));
            var h = Math.min(Math.floor(height / here.scale), Math.floor(height * PROJECT.STR.Q_SIZE));
            //here.renderer.setSize(width,height);
            var w = Math.min(Math.floor(width / here.scale), width * PROJECT.STR.Q_SIZE);
            var h = Math.min(Math.floor(PROJECT.DAT.height), height * PROJECT.STR.Q_SIZE);
            here.renderer.setSize(width, height);

            /*here.renderer.domElement.style.width = width+"px";
            here.renderer.domElement.style.height = height+"px";
            here.renderer.domElement.style.left = "0px";
            here.renderer.domElement.style.top = "0px";*/

            //here.dat_scale=PROJECT.DAT.scale;

            here.camera_3d.aspect = width / height;
            here.camera_3d.updateProjectionMatrix();
            here.renderer.setPixelRatio(window.devicePixelRatio);

            /*here.spr_3d.children[0].scale.set(here.spr_3d.children[0].material.map.image.width,here.spr_3d.children[0].material.map.image.height,1);
            here.spr_3d.x=-here.dx;
            */

            if (here.shadow) {
                here.shadow.sx = 2000;
                here.shadow.x = (PROJECT.DAT.width - width / here.scale) / 2;
            }

            for (var i = 0; i < here.on_resize_functions.length; i++)
                here.on_resize_functions[i]();

            if (typeof (on_cange_size) != "undefined") {
                on_cange_size(width < height);
            }
        }
    }
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    here.on_resize = function () {//обработчик ресайза
        here.verify_size();
    }
    //window.screen.lockOrientation('portrait');
    window.addEventListener('resize', here.verify_size);
    window.onorientationchange = here.verify_size;
    here.width = here.height = 0;

    if (!here.strite_txt)
        here.strite_txt = ((here.width <= 1000) || (here.height <= 1000));

    here.res_time = function () {
        here.on_resize();
        setTimeout(here.res_time, 300);
    }
    here.res_time();

    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    here.windows = [];
    here.current_wnd = null;

    here.show = function (obj) {
        for (var i = 0; i < here.windows.length; i++)
            if (here.windows[i].parent)
                here.windows[i].parent.removeChild(here.windows[i]);

        here.current_wnd = obj.copy(here.middle_gfx, true);
        here.windows.push(here.current_wnd);
        return here.current_wnd;
    }

    here.hide = function () {
        if (here.windows.length == 0)
            return false;

        here.current_wnd = null;
        here.windows.pop().free();

        if (here.windows.length == 0)
            return true;

        here.current_wnd = here.windows[here.windows.length - 1];
        here.middle_gfx.addChild(here.current_wnd);
        return true;
    }
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    here.messages = [];
    here.current_msg = null;

    here.show_msg = function (obj) {
        for (var i = 0; i < here.messages.length; i++)
            if (here.messages[i].parent)
                here.messages[i].parent.removeChild(here.messages[i]);

        for (var i = 0; i < here.messages.length; i++)
            here.msg_down_gfx.addChild(here.messages[i]);

        here.current_msg = obj.copy(here.msg_up_gfx, true);
        here.messages.push(here.current_msg);
        here.shadow.visible = true;

        here.shadow.alpha = 1;

        return here.current_msg;
    }

    here.hide_msg = function () {
        if (here.messages.length == 0)
            return false;

        here.current_msg = null;
        here.messages.pop().free();
        here.shadow.visible = (here.messages.length > 0);

        if (here.messages.length == 0)
            return true;

        for (var i = 0; i < here.messages.length; i++)
            if (here.messages[i].parent)
                here.messages[i].parent.removeChild(here.messages[i]);

        for (i = 0; i < here.messages.length - 1; i++)
            here.msg_down_gfx.addChild(here.messages[i]);

        here.current_msg = here.messages[i];
        here.msg_up_gfx.addChild(here.current_msg);
        return true;
    }

    here.hide_all_msg = function () {
        while (here.messages.length > 0) {
            here.current_msg = null;
            here.messages.pop().free();
            here.shadow.visible = (here.messages.length > 0);

            if (here.messages.length == 0)
                return true;

            for (var i = 0; i < here.messages.length; i++)
                if (here.messages[i].parent)
                    here.messages[i].parent.removeChild(here.messages[i]);

            for (i = 0; i < here.messages.length - 1; i++)
                here.msg_down_gfx.addChild(here.messages[i]);

            here.current_msg = here.messages[i];
            here.msg_up_gfx.addChild(here.current_msg);
        }
        return true;
    }
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    here.get_copy = function (obj, parent, put_down) {
        if (!obj.copied)
            obj.copied = [];

        for (var i = 0; i < obj.copied.length; i++)
            if (!obj.copied[i].is_active)
                return obj.copied[i].setup(parent, put_down);

        if (obj.pic != "") {
            if (obj.col == 0)
                var spr = here.get_sprite(obj.pic, true);
            else {
                var arr = [];

                for (var i = 0; i < obj.col; i++)
                    arr.push(obj.pic + "_anim_" + i);

                var spr = here.get_sprite(arr, true);
            }
        } else var spr = here.get_sprite();

        obj.copied.push(spr);
        spr.p = obj;
        spr.properties = {};

        spr.centered = function () {//центрируем
            var spr = this;

            spr.avk.img[0].center.x = 0.5;
            spr.avk.img[0].center.y = 0.5;

            spr.avk.img[0].x = spr.avk.img[0].i_x - spr.p_w / 2 + spr.avk.img[0].i_rw / 2;
            spr.avk.img[0].y = spr.avk.img[0].i_y - spr.p_h / 2 + spr.avk.img[0].i_rh / 2;

            spr.x = spr.p_cx;
            spr.y = spr.p_cy;
        }

        spr.setup = function (parent, put_down) {
            var spr = this;
            spr.visible = true;
            spr.scale.x = spr.scale.y = 1;
            spr.alpha = 1;
            spr.rotation = 0;

            spr.is_active = true;
            spr.p_properties = spr.p.properties;
            spr.p_name = spr.p.name;
            spr.p_type = spr.p.type;
            spr.p_x = spr.x = spr.p.x;
            spr.p_y = spr.y = spr.p.y;
            spr.p_cx = spr.p.x + spr.p.w / 2;
            spr.p_cy = spr.p.y + spr.p.h / 2;
            spr.p_w = spr.p.w;
            spr.p_h = spr.p.h;
            spr.p_c = spr.p.col;
            spr.x = spr.p_x;
            spr.y = spr.p_y;

            if (!spr.properties)
                spr.properties = {};

            for (var key in spr.p_properties) {
                spr.properties[key] = spr.p_properties[key];
                if (spr.properties[key] == "true")
                    spr.properties[key] = true;
                if (spr.properties[key] == "false")
                    spr.properties[key] = false;
            }

            if (parent) {
                if (put_down)
                    parent.addChildDown(spr);
                else parent.addChild(spr);
            }

            here.set_type(spr, spr.p_type);
            return spr;
        }

        spr.setup(parent, put_down);

        for (var key in obj.children)
            spr[key] = obj.children[key].copy(spr, true);

        for (key in obj.children) {
            if (spr[key].properties.prnt) {
                var pnt1 = spr[key].getGlobalPosition();
                spr[spr[key].properties.prnt].addChild(spr[key]);
                var pnt2 = spr[key].getGlobalPosition();
                var dx = (pnt1.x - pnt2.x);
                var dy = (pnt1.y - pnt2.y);

                spr[key].x += dx;
                spr[key].y += dy;

                spr[key].p_x += dx;
                spr[key].p_y += dy;
                spr[key].p_cx += dx;
                spr[key].p_cy += dy;
            }
        }

        spr.free = function () {
            if (spr.parent)
                spr.parent.removeChild(spr);

            spr.is_active = false;
            spr.visible = false;
        }

        spr.copy = function (parent, put_down) {
            return here.get_copy(this.p, parent, put_down)
        }

        spr.alarmed = false;
        spr.set_alarm = function (val) {
            if (val) {
                if (!spr.alarmed) {
                    spr.prev_tint = spr.tint;
                    spr.tint = 0xff0000;
                    spr.alarmed = val;
                }
            } else {
                if (spr.alarmed) {
                    spr.tint = spr.prev_tint;
                    spr.alarmed = val;
                }
            }
        }

        return spr;
    }

    function fill_custom_type(children, type) {
        for (var key in type.children) {
            children[key] = { name: type.children[key].name, type: type.children[key].type, x: type.children[key].x, y: type.children[key].y, w: type.children[key].w, h: type.children[key].h, properties: {}, col: (type.children[key].col ? type.children[key].col : 0), pic: type.children[key].pic, children: {}, copy: function (parent, put_down) { return here.get_copy(this, parent, put_down) } };

            for (var key1 in type.children[key].properties)
                children[key].properties[key1] = type.children[key].properties[key1];
        }
    }

    function verify_local_groups(obj) {
        for (var key in obj.children) {
            if ((here.custom_types[obj.children[key].type]) && (Object.keys(obj.children[key].children).length == 0))
                fill_custom_type(obj.children[key].children, here.custom_types[obj.children[key].type]);

            verify_local_groups(obj.children[key]);
        }
    }

    function prepare_groups(parent, groups) {
        for (var i = 0; i < groups.length; i++) {//сначала создаем
            var window = groups[i];
            parent.children[window.name] = { name: window.name, type: window.type, x: window.x, y: window.y, w: window.w, h: window.h, properties: {}, col: (window.col ? window.col : 0), pic: (window.pic ? window.pic : ""), children: {}, copy: function (parent, put_down) { return here.get_copy(this, parent, put_down) } };

            for (var n = 0; n < window.properties.length; n++)
                parent.children[window.name].properties[window.properties[n].name] = window.properties[n].val;

            if (window.groups.length > 0) {
                prepare_groups(parent.children[window.name], window.groups);
                here.custom_types[window.type] = parent.children[window.name];
            }
        }
    }

    function build_gui() {//создаем 
        for (var i = 0; i < PROJECT.GUI.length; i++) {//сначала создаем
            var loc_wnd = PROJECT.GUI[i];
            PROJECT.WND[loc_wnd.name] = { name: loc_wnd.name, type: "wnd", x: 0, y: 0, w: PROJECT.DAT.width, h: PROJECT.DAT.height, properties: {}, pic: "", children: {}, copy: function (parent, put_down) { return here.get_copy(this, parent, put_down) } };
            prepare_groups(PROJECT.WND[loc_wnd.name], loc_wnd.groups);
        }

        for (i = 0; i < PROJECT.GUI.length; i++) {//изаполняем кустомные типы
            verify_local_groups(PROJECT.WND[PROJECT.GUI[i].name]);
        }
    }
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    here.start = function (object, pause, time, on_start, on_progress, on_finish, is_busy) {
        function stop() {
            if ((this.pause > 0) && (this.tk > this.life)) {
                if (this.on_start)
                    this.on_start(this.obj, this, true);
            }

            if (this.on_finish)
                this.on_finish(this.obj, this, true);

            if (this.busy)
                here.busy--;

            this.tk = 0;
            this.is_active = false;
        }

        for (var i = 0; i < actions.length; i++)
            if (!actions[i].is_active)
                break;

        if (i == actions.length)
            actions.push({ obj: null, is_active: false, tk: 0, pause: 0, life: 0, on_start: null, on_progress: null, on_finish: null, is_busy: false, is_working: false, stop: stop });

        if (typeof (on_start) == "undefined")
            on_start = null;

        if (typeof (on_progress) == "undefined")
            on_progress = null;

        if (typeof (on_finish) == "undefined")
            on_finish = null;

        if (typeof (is_busy) == "undefined")
            is_busy = false;

        if (is_busy)
            here.busy++;

        actions[i].obj = object;
        actions[i].is_active = true;
        actions[i].tk = pause + time;
        actions[i].pause = pause;
        actions[i].life = time;
        actions[i].on_start = on_start;
        actions[i].on_progress = on_progress;
        actions[i].on_finish = on_finish;
        actions[i].is_busy = is_busy;
        actions[i].is_working = false;

        return actions[i];
    }

    function update_actions(tk) {
        for (var i = 0; i < actions.length; i++)
            actions[i].is_working = actions[i].is_active;

        for (i = 0; i < actions.length; i++) {
            var action = actions[i];
            if ((action.is_working) && (action.is_active)) {
                var not_started = ((action.pause > 0) && (action.tk > action.life));
                var current_tk = (action.tk < tk ? action.tk : tk);

                action.tk -= current_tk;

                if ((not_started) && (action.tk <= action.life) && (action.on_start))
                    action.on_start(action.obj, action, false);

                if (action.tk <= action.life) {
                    if (action.on_progress)
                        action.on_progress(action.obj, (action.life - action.tk) / action.life, current_tk, action);

                    if (action.tk == 0) {
                        if (action.on_finish)
                            action.on_finish(action.obj, action, false);

                        if (action.is_busy)
                            here.busy--;
                        action.is_active = false;
                    }
                }
            }
        }
    }

    here.on_update_functions.push(update_actions);
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    here.get_target = function (obj, x, y, sx, sy) {
        for (var i = obj.children.length - 1; i >= 0; i--) {
            var object = obj.children[i];
            if ((object.visible) && (object.avk)) {
                var tsx = sx * object.sx;
                var tsy = sy * object.sy;

                if ((object.avk.img.length > 0) && (object.avk.img[0].center)) {
                    if (object.avk.img[0].center.x == 0)
                        var ox = object.x * sx;
                    else if (object.avk.img[0].center.x == 0.5)
                        var ox = object.x * sx - object.p_w * tsx / 2;

                    if (object.avk.img[0].center.y == 1)
                        var oy = object.y * sy;
                    else var oy = object.y * sy - object.p_h * tsy / 2;
                } else {
                    var ox = object.x * sx;
                    var oy = object.y * sy;
                }



                var res = here.get_target(object, x - ox, y - oy, tsx, tsy);
                if (res)
                    return res;
                else if (object.interactive) {
                    if ((x >= ox) && (ox + object.p_w * tsx > x) && (y >= oy) && (oy + object.p_h * tsy > y))
                        return object;
                }
            }
        }

        return null;
    }

    here.down_object = null;
    function on_move(data) {
        function do_it(data, identifier) {
            if (typeof (data.button) != "undefined")
                var button = data.button;
            else var button = -1;

            if (here.gui_gfx.sx == 1) {
                var x = Math.floor((data.pageX / here.scale - here.dx));
                var y = Math.floor((data.pageY / here.scale - here.dy));
            } else {
                var x = Math.floor((data.pageX / here.scale / here.gui_gfx.sx));
                var y = Math.floor((data.pageY / here.scale / here.gui_gfx.sx - here.dy));
            }

            /*here.gui_gfx.position.x=-PROJECT.DAT.width/2-here.dx;
            here.gui_gfx.position.y=-PROJECT.DAT.height/2;
            here.gui_gfx.sx=1.5;
            here.gui_gfx.sy=1.5;*/

            if (true)//((x>=0)&&(x<PROJECT.DAT.width)&&(y>=0)&&(y<PROJECT.DAT.height))
            {
                var obj = here.get_target(here.gui_gfx, x, y, 1, 1);
                if (obj) {
                    if (here.down_object) {
                        if (here.down_object != obj) {
                            if (here.down_object.avk.on_out)
                                here.down_object.avk.on_out(here.down_object, x, y);
                            here.down_object = null;
                        }
                    }
                    if (obj.avk.on_move)
                        obj.avk.on_move(obj, x, y, button, identifier);
                }
            }
        }

        data.stopPropagation();
        data.preventDefault();
        if (!here.app_gfx.visible)
            return;
        if ((data.touches) && (data.touches.length > 0)) {
            for (var i = 0; i < data.touches.length; i++)
                do_it(data.touches[i], i);
        } else do_it(data, -1);
    }

    function on_down(data) {
        if ((typeof (data.button) != "undefined") && (data.button != 0))
            return;
        if (!here.first_click) {
            here.first_click = true;
            if (here.on_first_click)
                here.on_first_click();
        }

        function do_it(data, identifier) {
            if (typeof (data.button) != "undefined")
                var button = data.button;
            else var button = -1;

            //alert(here.width+" : "+here.scale+" : "+here.height+":"+Math.floor(data.pageX)+" : "+Math.floor(here.dx)+" : "+(PROJECT.DAT.width-here.width/here.scale)/2);

            if (here.gui_gfx.sx == 1) {
                var x = Math.floor((data.pageX / here.scale - here.dx));
                var y = Math.floor((data.pageY / here.scale - here.dy));
            } else {
                var x = Math.floor((data.pageX / here.scale / here.gui_gfx.sx));
                var y = Math.floor((data.pageY / here.scale / here.gui_gfx.sx - here.dy));
            }

            if (true)//((x>=0)&&(x<PROJECT.DAT.width)&&(y>=0)&&(y<PROJECT.DAT.height))
            {
                var obj = here.get_target(here.gui_gfx, x, y, 1, 1);
                if (obj) {
                    here.down_object = obj;
                    if (obj.avk.on_down)
                        obj.avk.on_down(obj, x, y, button, identifier);
                }
            }
        }

        data.stopPropagation();
        data.preventDefault();
        if (!here.app_gfx.visible)
            return;
        if ((data.touches) && (data.touches.length > 0)) {
            for (var i = 0; i < data.touches.length; i++)
                do_it(data.touches[i], i);
        } else do_it(data, -1);
    }

    function on_up(data) {
        function do_it(data, identifier) {
            if (typeof (data.button) != "undefined")
                var button = data.button;
            else var button = -1;


            if (here.gui_gfx.sx == 1) {
                var x = Math.floor((data.pageX / here.scale - here.dx));
                var y = Math.floor((data.pageY / here.scale - here.dy));
            } else {
                var x = Math.floor((data.pageX / here.scale / here.gui_gfx.sx));
                var y = Math.floor((data.pageY / here.scale / here.gui_gfx.sx - here.dy));
            }


            if (true)//((x>=0)&&(x<PROJECT.DAT.width)&&(y>=0)&&(y<PROJECT.DAT.height))
            {
                var obj = here.get_target(here.gui_gfx, x, y, 1, 1);
                if (obj) {
                    if (here.down_object == obj) {
                        if ((here.down_object.avk.on_click) && (here.busy == 0))
                            here.down_object.avk.on_click(obj, x, y);
                    }

                    here.down_object = null;
                    if (obj.avk.on_up)
                        obj.avk.on_up(obj, x, y, button, identifier);
                } else if (here.down_object) {
                    if (here.down_object.avk.on_out)
                        here.down_object.avk.on_out(here.down_object, x, y);
                    here.down_object = null;
                }
            }
        }

        data.stopPropagation();
        data.preventDefault();
        if (!here.app_gfx.visible)
            return;
        if ((data.changedTouches) && (data.changedTouches.length > 0)) {
            for (var i = 0; i < data.changedTouches.length; i++)
                do_it(data.changedTouches[i], i);
        } else do_it(data, -1);
    }

    here.renderer.domElement.addEventListener('touchmove', on_move, false);
    here.renderer.domElement.addEventListener('touchstart', on_down, false);
    here.renderer.domElement.addEventListener('touchend', on_up, false);
    here.renderer.domElement.addEventListener('touchcancel', on_up, false);
    here.renderer.domElement.addEventListener('mousemove', on_move, false);
    here.renderer.domElement.addEventListener('mousedown', on_down, false);
    here.renderer.domElement.addEventListener('mouseup', on_up, false);

    window.addEventListener('touchmove', on_move, false);
    window.addEventListener('touchstart', on_down, false);
    window.addEventListener('touchend', on_up, false);
    window.addEventListener('touchcancel', on_up, false);
    window.addEventListener('mousemove', on_move, false);
    window.addEventListener('mousedown', on_down, false);
    window.addEventListener('mouseup', on_up, false);

    document.addEventListener('touchmove', on_move, false);
    document.addEventListener('touchstart', on_down, false);
    document.addEventListener('touchend', on_up, false);
    document.addEventListener('touchcancel', on_up, false);
    document.addEventListener('mousemove', on_move, false);
    document.addEventListener('mousedown', on_down, false);
    document.addEventListener('mouseup', on_up, false);

    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    here.remove_from_resize_functions = function (fnc) {
        var arr = [];
        for (var i = 0; i < here.on_resize_functions.length; i++) {
            if (here.on_resize_functions[i] != fnc)
                arr.push(here.on_resize_functions[i]);
        }

        here.on_resize_functions = arr;
    }
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    here.convert = function (value) {
        var s = "";
        var t = 0;
        value = "" + value;

        for (var i = value.length - 1; i >= 0; i--) {
            if (t == 3) {
                t = 0;
                s = " " + s;
            }

            if ((value.charAt(i) != "0") && (value.charAt(i) != "1") && (value.charAt(i) != "2") && (value.charAt(i) != "3") && (value.charAt(i) != "4") && (value.charAt(i) != "5") && (value.charAt(i) != "6") && (value.charAt(i) != "7") && (value.charAt(i) != "8") && (value.charAt(i) != "9"))
                return value;

            s = value.charAt(i) + s;
            t++;
        }

        return s;
    }

    here.get_time = function (tk) {
        tk = Math.floor(tk / 1000);

        var m = Math.floor(tk / 60);
        tk -= m * 60;
        var ss = "" + tk;
        var sm = "" + m;
        if (ss.length < 2)
            ss = "0" + ss;
        return sm + ":" + ss;
    }

    here.rad_in_rad = function (ox, oy, or, lx, ly, lr) {
        var l = here.get_length(ox - lx, oy - ly);
        if (l > or + lr)
            return -1;
        else return or + lr - l;
    }

    here.line_in_rad = function (ox, oy, or, lx0, ly0, lx1, ly1) {
        var l = here.get_length(lx1 - lx0, ly1 - ly0);
        var r = Math.abs(((ly0 - ly1) * ox + (lx1 - lx0) * oy + (lx0 * ly1 - lx1 * ly0)) / l);//Кратчайшее расстояние до прямой

        if (r < or)//расстояние до отрезка меньше радиуса, но остался вопрос с краями
        {//Возможно касание
            var l1 = (lx0 - ox) * (lx0 - ox) + (ly0 - oy) * (ly0 - oy);//расстояние от точки до центра круга в квадрате
            var l2 = (lx1 - ox) * (lx1 - ox) + (ly1 - oy) * (ly1 - oy);//расстояние от точки до центра круга в квадрате

            var l3 = Math.sqrt(l1 - r * r);
            var l4 = Math.sqrt(l2 - r * r);

            if ((l3 < l) && (l4 < l))//Расстояния до точки проекции от концов отрезка меньше длины отрезка
            {//Значит мы посередине между точками отрезка.Точно влетели
                return or - r;
            } else {//Осталась еще возможность, что конец отрезка все равно в круг попал
                l1 = Math.sqrt(l1);
                l2 = Math.sqrt(l2);

                if (l1 < or) {//Точно влетели
                    return or - r;
                } else if (l2 < or) {//Точно влетели
                    return or - r;
                }
            }
        }

        return -1;
    }

    here.get_length = function (dx, dy, dz) {//return len
        if (typeof (dz) == "undefined") {
            var l = Math.sqrt(dx * dx + dy * dy);
            if (l == 0)
                l = 0.0000001;
            return l;
        }

        var l = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (l == 0)
            l = 0.0000001;
        return l;
    }

    here.get_angle = function (dx, dy) {
        var l = here.get_length(dx, dy);
        var a = Math.acos(dx / l);
        if (dy < 0)
            a = 2 * Math.PI - a;
        return a;//Math.floor(a*180/Math.PI);
    }

    here.del_array = function (ar, el) {//вспомогательная функция
        for (var i = 0; i < ar.length; i++) {
            if (ar[i] == el) {
                for (var n = i; n < ar.length - 1; n++)
                    ar[n] = ar[n + 1];

                ar.pop();
            }
        }
    }
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    here.set_type = function (obj, type) {
        if (!obj.objs)
            obj.objs = {};//типовой функционал

        if (obj.objs[type])
            return;

        switch (type) {
            case "btn":
                obj.objs[type] = new app_btn_type(obj);
                break;
            case "txt":
                obj.objs[type] = new app_txt_type(obj);
                break;
            case "slide":
                obj.objs[type] = new app_slider_type(obj);
                break;
        }

        function app_btn_type(spr) {
            if (spr.interactive)
                return;

            spr.centered();
            spr.interactive = true;

            spr.avk.on_down = function (obj, x, y) {
                obj.sx = obj.sy = 0.95;
            }

            spr.avk.on_up = spr.avk.on_out = function (obj, x, y) {
                obj.sx = obj.sy = 1;
            }
        }

        function app_txt_type(spr) {
            if (here.isIE11) {
                spr.avk.txt = here.get_text((spr.properties.str ? PROJECT.STR.get(spr.properties.str) : '.'), (spr.properties.sz ? Math.floor(spr.p_h / spr.properties.sz) : spr.p_h), (spr.properties.tint ? '#' + spr.properties.tint.substr(2, 6) : '#ffffff'));
                spr.addChild(spr.avk.txt);
                spr.avk.img.push(spr.avk.txt);
                spr.avk.txt.spr = spr;
                spr.avk.txt.position.x = spr.p_w / 2;
                spr.avk.txt.position.y = spr.p_h / 2 + (spr.avk.txt.height - spr.p_h) / 4;
            } else {
                spr.avk.txt = here.get_text_3d((spr.properties.str ? PROJECT.STR.get(spr.properties.str) : '.'), (spr.properties.sz ? Math.floor(spr.p_h / spr.properties.sz) : spr.p_h), (spr.properties.tint ? '#' + spr.properties.tint.substr(2, 6) : '#FFFFFF'));
                spr.addChild(spr.avk.txt);
                spr.avk.img.push(spr.avk.txt);
                spr.avk.txt.spr = spr;
                spr.avk.txt.position.x = (spr.p_w - spr.avk.txt.width) / 2;//spr.p_w/2;
                spr.avk.txt.position.y = spr.p_h;//spr.p_h/2+(spr.avk.txt.height-spr.p_h);
            }
        }


        function app_slider_type(spr) {
            var loc = this;
            var mouse_x = 0;
            var mouse_y = 0;
            var mouse_down = false;
            var back_scroll = null;
            var max_x = spr.p_cx;
            var min_x = spr.p_cx;
            var max_y = spr.p_cy;
            var min_y = spr.p_cy;
            var on_event = null;

            loc.spr = spr;
            spr.centered();
            spr.interactive = true;

            spr.avk.on_move = function (obj, x, y) {
                if (mouse_down) {
                    move(x - mouse_x, y - mouse_y);
                    mouse_x = x;
                    mouse_y = y;
                }
            }
            spr.avk.on_down = function (obj, x, y) {
                mouse_down = true;
                mouse_x = x;
                mouse_y = y;
            }

            spr.avk.on_up = spr.avk.on_out = function (obj, x, y) {
                mouse_down = false;
            }

            spr.set = function (progress) {
                if (back_scroll) {
                    if (min_x != max_x) {
                        loc.spr.x = progress * (max_x - min_x) + min_x;
                    } else {
                        loc.spr.н = progress * (max_y - min_x) + min_x;
                    }
                }
                move(0, 0);
            }

            spr.set_scroll = function (scroll, hor, on_progress) {
                if (back_scroll)
                    return;
                back_scroll = scroll;
                on_event = on_progress;

                if (hor) {
                    min_x = scroll.x;
                    max_x = scroll.x + scroll.p_w;
                } else {
                    min_y = scroll.y;
                    max_y = scroll.y + scroll.p_h;
                }

                //move(0,0);
            }

            function move(dx, dy) {
                loc.spr.x += dx;
                loc.spr.y += dy;

                if (loc.spr.x < min_x)
                    loc.spr.x = min_x;
                if (loc.spr.x > max_x)
                    loc.spr.x = max_x;
                if (loc.spr.y < min_y)
                    loc.spr.y = min_y;
                if (loc.spr.y > max_y)
                    loc.spr.y = max_y;

                if (back_scroll) {
                    if (min_x != max_x) {
                        var progress = (loc.spr.x - min_x) / (max_x - min_x);
                    } else {
                        var progress = (loc.spr.y - min_y) / (max_y - min_y);
                    }

                    if (on_event)
                        on_event(progress);
                }
            }
        }
    }
}