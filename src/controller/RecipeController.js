const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'public/img/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + ext);
        }
    }),
    limits: {fileSize : 5*1024*1024},
})

const models = require("../model");

exports.main = (req, res) => {
    const user = req.session.user;

    if ( user != undefined ) {
        res.render("recipe", {isLogin: true, user: user});
    } else {
        res.render("recipe", {isLogin: false});
    }
}

exports.write_recipe_page = (req, res) => {
    const user = req.session.user;

    res.render("recipe_form", {user: user});
}

exports.post_write = (req, res) => {
    console.log(req.body);
    let recipe_obj = {
        user_id: req.body.user_id,
        title: req.body.title,
        comment: req.body.comment,
        video_link: req.body.video_link,
        category_kind: req.body.category_kind,
        material: req.body.material
    };
    models.UserRecipe.create(recipe_obj)
    .then((result) => {
        console.log(result);
        res.send("레시피가 성공적으로 등록되었습니다.");
    });
}

exports.detail_page = (req, res) => {
    res.render("recipe_detail");
}