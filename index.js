const express = require('express')
const multer = require('multer')
const cors = require('cors');
const { makeHTML } = require('./makeHtml');
const fs = require('fs');
const { createId, checkPass } = require('./security/user');
const { sign, verify } = require('./security/jwt');
const cookie = require('cookie');
const { updateHtml } = require('./updateHtml');
const { v4: uuidv4 } = require('uuid');

const check_jwt = async (token, retoken, target) => {
    const tk = await verify(token);
    console.log('target : ', target);
    console.log(tk)
    console.log('-------------------')
    if (tk == -3 || tk == -2) {
        console.log(1)
        return true
    } else {
        console.log(0)
        return false
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './tmp')
    },
    filename: function (req, file, cb) {
        cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8'))
    }
})
const upload = multer({ storage: storage })
const uploadMiddleware = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 50 }
]);

const app = express();
const port = 4002;
const router = express.Router();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(uploadMiddleware);

app.get('/', function (req, res) {
    console.log('index', ' --- ', new Date().toLocaleDateString());
    fs.readFile('./public/index.html', 'utf-8', (err, data) => {
        res.send(data);
    });
})

app.get('/api/get_status', function (req, res) {
    fs.readFile('./components/contents/status.json', 'utf-8', (err, data) => {
        res.send(data);
    });
})
app.get('/api/get_gall', function (req, res) {
    fs.readFile('./components/contents/gall.json', 'utf-8', (err, data) => {
        res.send(data);
    });
})
app.get('/api/get_photo_gall', function (req, res) {
    fs.readFile('./components/contents/photo_gall.json', 'utf-8', (err, data) => {
        res.send(data);
    });
})
app.get('/api/get_act_gall/page/:page', function (req, res) {
    let pageItems = 15;
    let page = req.params.page;
    let rs = {
        page: page,
        data: [],
        maxPage: 1
    };
    let dir = fs.readdirSync('./data/act_gall').sort((a, b) => {
        let ia = a.split(".")[0] / 1;
        let ib = b.split(".")[0] / 1;
        return ib - ia;
    });
    rs.maxPage = Math.ceil((dir[0].split(".")[0] / 1 + 1) / pageItems)
    dir.slice(pageItems * (page - 1), pageItems * page).forEach(p => {
        let json = JSON.parse(fs.readFileSync('./data/act_gall/' + p));
        json.id = p.split('.')[0];
        rs.data.push(json)
    })
    res.send(JSON.stringify(rs));
})



app.get('/api/get_notice/page/:page', function (req, res) {
    let pageItems = 15;
    let page = req.params.page;
    let rs = {
        page: page,
        data: [],
        maxPage: 1
    };
    let dir = fs.readdirSync('./data/notice').sort((a, b) => {
        let ia = a.split(".")[0] / 1;
        let ib = b.split(".")[0] / 1;
        return ib - ia;
    });
    rs.maxPage = Math.ceil((dir[0].split(".")[0] / 1 + 1) / pageItems)
    dir.slice(pageItems * (page - 1), pageItems * page).forEach(p => {
        let json = JSON.parse(fs.readFileSync('./data/notice/' + p));
        json.id = p.split('.')[0];
        rs.data.push(json)
    })
    res.send(JSON.stringify(rs));
})

app.get('/api/get_dataroom/page/:page', function (req, res) {
    let pageItems = 15;
    let page = req.params.page;
    let rs = {
        page: page,
        data: [],
        maxPage: 1
    };
    let dir = fs.readdirSync('./data/dataroom').sort((a, b) => {
        let ia = a.split(".")[0] / 1;
        let ib = b.split(".")[0] / 1;
        return ib - ia;
    });
    rs.maxPage = Math.ceil((dir[0].split(".")[0] / 1 + 1) / pageItems)
    dir.slice(pageItems * (page - 1), pageItems * page).forEach(p => {
        let json = JSON.parse(fs.readFileSync('./data/dataroom/' + p));
        json.id = p.split('.')[0];
        rs.data.push(json)
    })
    res.send(JSON.stringify(rs));
})
app.get('/api/get_custom/page/:page', function (req, res) {
    let pageItems = 15;
    let page = req.params.page;
    let rs = {
        page: page,
        data: [],
        maxPage: 1
    };
    let dir = fs.readdirSync('./data/custom').sort((a, b) => {
        let ia = a.split(".")[0] / 1;
        let ib = b.split(".")[0] / 1;
        return ib - ia;
    });
    rs.maxPage = Math.ceil((dir[0].split(".")[0] / 1 + 1) / pageItems)
    dir.slice(pageItems * (page - 1), pageItems * page).forEach(p => {
        let json = JSON.parse(fs.readFileSync('./data/custom/' + p));
        json.id = p.split('.')[0];
        rs.data.push(json)
    })
    res.send(JSON.stringify(rs));
})
app.get('/api/get_volunteer/page/:page', function (req, res) {
    let pageItems = 15;
    let page = req.params.page;
    let rs = {
        page: page,
        data: [],
        maxPage: 1
    };
    let dir = fs.readdirSync('./data/volunteer').sort((a, b) => {
        let ia = a.split(".")[0] / 1;
        let ib = b.split(".")[0] / 1;
        return ib - ia;
    });
    rs.maxPage = Math.ceil((dir[0].split(".")[0] / 1 + 1) / pageItems)
    dir.slice(pageItems * (page - 1), pageItems * page).forEach(p => {
        let json = JSON.parse(fs.readFileSync('./data/volunteer/' + p));
        json.id = p.split('.')[0];
        rs.data.push(json)
    })
    res.send(JSON.stringify(rs));
})


app.get('/api/get/:target/item/:id', function (req, res) {
    let id = req.params.id || 'none';
    let target = req.params.target || 'none';
    if (id == 'none' || !(
        target == 'act_gall' ||
        target == 'custom' ||
        target == 'dataroom' ||
        target == 'notice' ||
        target == 'user' ||
        target == 'volunteer')) {
        console.log(id, ',', target, ',머징?')
        res.status(404).send();
        return;
    }
    let json = JSON.parse(fs.readFileSync('./data/' + target + '/' + id + '.json'));
    json.clicked++;
    fs.writeFileSync('./data/' + target + '/' + id + '.json', JSON.stringify(json), 'utf-8')
    json.id = id;
    res.send(JSON.stringify(json));
})

app.get('/api/admin/:html', async function (req, res) {
    let params = req.params;
    let refreshToken = cookie.parse(req.headers.cookie || '').refreshToken || '';
    let token = req.headers.authorization.substring(7);
    if (await check_jwt(token, refreshToken, req.params.html)) {
        res.status(403).send('Forbidden');
        return;
    }


    if (params.html == 'dashboard_data') {
        data = {
            notice: [],
            act_gall: [],
            custom: [],
            volunteer: []
        };
        ['notice', 'act_gall', 'custom', 'volunteer'].forEach(p => {
            fs.readdirSync('./data/' + p).sort((a, b) => {
                let ia = a.split(".")[0] / 1;
                let ib = b.split(".")[0] / 1;
                return ib - ia;
            }).slice(0, 10).forEach(q => {
                let json = JSON.parse(fs.readFileSync('./data/' + p + '/' + q));
                json.id = q.split('.')[0];
                data[p].push(json)
            });
        })
        res.send(JSON.stringify(data))
    } else {
        res.send(fs.readFileSync('components/admin/' + params.html + '.html'));
    }
})
app.get('/json/:id', function (req, res) {
    let id = req.params.id;
    let json;
    if (id != 'footlink') {
        json = JSON.parse(fs.readFileSync('./components/contents/' + id + '.json'));
    } else {
        json = JSON.parse(fs.readFileSync('./components/footlink/' + id + '.json'));
    }
    res.send(JSON.stringify(json));
})
app.get('/get_foot_json', function (req, res) {
    let json = JSON.parse(fs.readFileSync('./components/footer/footer.json'));
    res.send(JSON.stringify(json));
})

app.get('/:html', function (req, res) {
    let params = req.params;
    console.log('page : ', params.html, ' --- ', new Date().toTimeString());

    fs.readFile('./public/' + params.html + '.html', 'utf-8', (err, data) => {
        if (err) {
            console.log('없어용');
            res.status(404).send();
        } else {
            res.send(data);
        }
    });
})

app.post('/api/create_volunteer', function (req, res) {


    let id = fs.readdirSync('./data/volunteer').sort((a, b) => {
        let ia = a.split(".")[0] / 1;
        let ib = b.split(".")[0] / 1;
        return ib - ia;
    })[0].split(".")[0] / 1 + 1;

    let data = req.body;
    let now = new Date();
    data.checked = false;
    data.date = `${now.getFullYear()}-${(now.getMonth() / 1 + 1 + "").padStart(2, "0")}-${now.getDate()}`;

    if (!fs.existsSync('data/volunteer/0.json')) {
        fs.writeFileSync('./data/volunteer/0.json', JSON.stringify(data), 'utf-8')
    } else {
        fs.writeFileSync('./data/volunteer/' + id + '.json', JSON.stringify(data), 'utf-8')
    }
    res.send(JSON.stringify({ rs: 'ok' }));
})

app.post('/api/create_custom', function (req, res) {


    let id = fs.readdirSync('./data/custom').sort((a, b) => {
        let ia = a.split(".")[0] / 1;
        let ib = b.split(".")[0] / 1;
        return ib - ia;
    })[0].split(".")[0] / 1 + 1;

    let data = req.body;
    let now = new Date();
    data.checked = false;
    data.date = `${now.getFullYear()}-${(now.getMonth() / 1 + 1 + "").padStart(2, "0")}-${now.getDate()}`;

    if (!fs.existsSync('data/custom/0.json')) {
        fs.writeFileSync('./data/custom/0.json', JSON.stringify(data), 'utf-8')
    } else {
        fs.writeFileSync('./data/custom/' + id + '.json', JSON.stringify(data), 'utf-8')
    }
    res.send(JSON.stringify({ rs: 'ok' }));
})

app.post('/login', function (req, res) {
    checkPass(req.body.id, req.body.pass).then(result => {
        if (result) {
            sign(req.body.id).then(data => {
                console.log("asd")
                console.log(data)
                res.cookie('refreshToken', data.refreshToken, {
                    HttpOnly: true,
                    Secure: true,
                    maxAge: 60 * 60 * 1000
                })
                res.setHeader('Authorization', 'Bearer ' + data.token)
                res.send(JSON.stringify({ rs: 'ok', href: '/admin' }));
            }).catch(err => {
                res.send(JSON.stringify({ rs: 'err' }));
            })
        } else {
            res.send(JSON.stringify({ rs: 'no' }));
        }
    })

})
app.post('/api/save/footlink', async function (req, res) {
    let target = req.params.target;
    let refreshToken = cookie.parse(req.headers.cookie || '').refreshToken || '';
    let token = req.headers.authorization.substring(7);
    if (await check_jwt(token, refreshToken, req.params.html)) {
        res.status(403).send('Forbidden');
        return;
    }

    
    let new_json = JSON.parse(req.body.json);
    console.log(new_json)

    fs.writeFileSync('./components/footlink/footlink.json', JSON.stringify(new_json), 'utf-8')
    updateHtml();


    fs.readdirSync('./tmp/').forEach(p => {
        fs.renameSync('./tmp/' + p, './public/image/Shortcuts/' + p)
    })
    fs.readdirSync('./public/image/Shortcuts/').forEach(p => {

        if (!Object.keys(new_json).find(q => new_json[q].image.includes(p))) {
            fs.unlinkSync('./public/image/Shortcuts/' + p)
        }
    })

    res.send(JSON.stringify({ rs: 'ok' }));
})
app.post('/api/save/footer', async function (req, res) {
    let refreshToken = cookie.parse(req.headers.cookie || '').refreshToken || '';
    let token = req.headers.authorization.substring(7);
    if (await check_jwt(token, refreshToken, req.params.html)) {
        res.status(403).send('Forbidden');
        return;
    }
    fs.writeFileSync('./components/footer/footer.json', JSON.stringify(req.body), 'utf-8')
    updateHtml();
    res.send(JSON.stringify({ rs: 'ok' }));
})
app.post('/api/save/text/:target', async function (req, res) {
    let refreshToken = cookie.parse(req.headers.cookie || '').refreshToken || '';
    let token = req.headers.authorization.substring(7);
    if (await check_jwt(token, refreshToken, req.params.html)) {
        res.status(403).send('Forbidden');
        return;
    }
    let target = req.params.target;
    fs.writeFileSync('./components/contents/' + target + '.html', req.body.data, 'utf-8')
    updateHtml();
    res.send(JSON.stringify({ rs: 'ok' }));
})
app.post('/api/save/img', async function (req, res) {
    let refreshToken = cookie.parse(req.headers.cookie || '').refreshToken || '';
    let token = req.headers.authorization.substring(7);
    if (await check_jwt(token, refreshToken, req.params.html)) {
        res.status(403).send('Forbidden');
        return;
    }
    fs.renameSync('./' + req.files.image[0].path.split('\\').join('/'), './public/image' + req.body.src.split('image')[1]);
    res.send(JSON.stringify({ rs: 'ok' }));
})

app.get('/api/del/board/:target/:id', async function (req, res) {
    let target = req.params.target;
    let id = req.params.id;
    let refreshToken = cookie.parse(req.headers.cookie || '').refreshToken || '';
    let token = req.headers.authorization.substring(7);
    if (await check_jwt(token, refreshToken, req.params.html)) {
        res.status(403).send('Forbidden');
        return;
    }

    let old_json = JSON.parse(fs.readFileSync(`./data/${target}/${id}.json`));
    old_json.body.forEach(p => {
        if (p.type == 'img') {
            fs.unlinkSync(`./public/image/upload/${p.data}`);
        }
    });
    fs.unlinkSync(`./data/${target}/${id}.json`);
    res.send(JSON.stringify({ rs: 'ok' }));
})
app.post('/api/save/board/:target/:id', async function (req, res) {
    let target = req.params.target;
    let id = req.params.id;
    let refreshToken = cookie.parse(req.headers.cookie || '').refreshToken || '';
    let token = req.headers.authorization.substring(7);
    if (await check_jwt(token, refreshToken, req.params.html)) {
        res.status(403).send('Forbidden');
        return;
    }

    if (id == 'new') {
        id = fs.readdirSync(`./data/${target}`).sort((a, b) => {
            let ia = a.split(".")[0] / 1;
            let ib = b.split(".")[0] / 1;
            return ib - ia;
        })[0].split(".")[0] / 1 + 1;
        let json = JSON.parse(req.body.json);
        json.body = json.body.map(p => {
            if (p.type == 'img') {
                let uuid = uuidv4();
                let ext = p.data.split('.')[1];
                while (fs.existsSync('./public/image/upload/' + uuid + '.' + ext)) {
                    uuid = uuidv4();
                }
                fs.renameSync('./tmp/' + p.data, './public/image/upload/' + uuid + '.' + ext);
                return { ...p, data: uuid + '.' + ext };
            } else {
                return p
            }
        })
        json.clicked = 0;
        fs.writeFileSync(`./data/${target}/${id}.json`, JSON.stringify(json), 'utf-8')
        res.send(JSON.stringify({ rs: 'ok' }));
    } else {
        let old_json = JSON.parse(fs.readFileSync(`./data/${target}/${id}.json`));
        old_json.body.forEach(p => {
            if (p.type == 'img') {
                fs.unlinkSync(`./public/image/upload/${p.data}`);
            }
        });

        let json = JSON.parse(req.body.json);
        json.date = old_json.date;
        json.body = json.body.map(p => {
            if (p.type == 'img') {
                let uuid = uuidv4();
                let ext = p.data.split('.')[1];
                while (fs.existsSync('./public/image/upload/' + uuid + '.' + ext)) {
                    uuid = uuidv4();
                }
                fs.renameSync('./tmp/' + p.data, './public/image/upload/' + uuid + '.' + ext);
                return { ...p, data: uuid + '.' + ext };
            } else {
                return p
            }
        })
        fs.writeFileSync(`./data/${target}/${id}.json`, JSON.stringify(json), 'utf-8')
        res.send(JSON.stringify({ rs: 'ok' }));
    }
})


app.post('/api/save/gall/:target', async function (req, res) {
    let target = req.params.target;
    let refreshToken = cookie.parse(req.headers.cookie || '').refreshToken || '';
    let token = req.headers.authorization.substring(7);
    if (await check_jwt(token, refreshToken, req.params.html)) {
        res.status(403).send('Forbidden');
        return;
    }
    let old_json = JSON.parse(fs.readFileSync('./components/contents/' + target + '.json'));
    let new_json = JSON.parse(req.body.json);
    Object.keys(new_json).forEach(p => {
        new_json[p] = new_json[p].map(q => {
            if (q.includes('$')) {
                let uuid = uuidv4();
                let ext = q.split('.')[1];
                while (fs.existsSync('./public/image/Spac/' + uuid + '.' + ext)) {
                    uuid = uuidv4();
                }
                fs.renameSync('./tmp/' + q, './public/image/Spac/' + uuid + '.' + ext);
                return uuid + '.' + ext;
            } else {
                return q;
            }
        })
    })
    let ntmp = [];
    Object.keys(new_json).forEach(p => {
        ntmp = ntmp.concat(new_json[p]);
    })
    let otmp = [];
    Object.keys(old_json).forEach(p => {
        otmp = otmp.concat(old_json[p]);
    })
    let tmp = otmp.filter(p => !ntmp.includes(p))
    tmp.forEach(p => {
        fs.unlinkSync('./public/image/Spac/' + p);
    })

    fs.writeFileSync('./components/contents/' + target + '.json', JSON.stringify(new_json));
    updateHtml();
    res.send(JSON.stringify({ rs: 'ok' }));

})

app.get('/api/check/:target/:id', function (req, res) {
    let target = req.params.target;
    let id = req.params.id;
    let json = JSON.parse(fs.readFileSync(`./data/${target}/${id}.json`));
    json.checked = `true`;
    fs.writeFileSync(`./data/${target}/${id}.json`, JSON.stringify(json), 'utf-8')
})

app.listen(port)