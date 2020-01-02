var env = require('../env.json');
var conf = require('../configs/config');
var db = require('../configs/database');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/course');
  },
  filename: (req, file, cb) => {
    console.log(file);
    var filetype = '';
    if(file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if(file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'img-' + Date.now() + '.' + filetype);
  }
});
var uploadLogo = multer({storage: storage}).single('image');

exports.createCourse = (req, res, next) => {
  uploadLogo(req, res, (err) => {
    if(!req.file) {
      res.json({ error: true, result: err });
    } else {
      let formData = {
        category_id: req.body.category_id,
        user_id: req.body.user_id,
        type: req.body.type,
        title: req.body.title,
        caption: req.body.caption,
        body: req.body.body,
        image: `${env.APP_URL}/user/${req.file.filename}`,
        created_at: conf.dateTimeNow(),
        publish: '1'
      };

      db.query(`INSERT INTO course (course_id, category_id, user_id, type, title, caption, body, image, created_at, publish) VALUES (
        null, '${formData.category_id}', '${formData.user_id}', '${formData.type}', '${formData.title}', '${formData.caption}', 
        '${formData.body}', '${formData.image}', '${formData.created_at}', '${formData.publish}')`, (error, result, fields) => {
        if(error) {
          res.json({error: true, result: error});
        } else {
          res.json({error: false, result: result});
        }
      });
    }
  });
};

exports.getAllCourse = (req, res, next) => {
  db.query(`SELECT c.*, ct.category_name FROM course c JOIN learning_category ct ON ct.category_id = c.category_id`, (error, result, fields) => {
    if(error) {
      res.json({error: true, result: error});
    } else {
      res.json({error: false, result: result});
    }
  });
};

exports.getOneCourse = (req, res, next) => {
  db.query(`SELECT c.*, ct.category_name FROM course c JOIN learning_category ct ON ct.category_id = c.category_id WHERE c.course_id = '${req.params.course_id}'`, (error, result, fields) => {
    if(error) {
      res.json({error: true, result: error});
    } else {
      res.json({error: false, result: (result.length !== 0 ) ? result[0] : [] });
    }
  });
};

exports.updateCourse = (req, res, next) => {
  let formData = {
    category_id: req.body.category_id,
    type: req.body.type,
    title: req.body.title,
    caption: req.body.caption,
    body: req.body.body,
    publish: req.body.publish
  };

  db.query(`UPDATE course SET 
    category_id = '${formData.category_id}',
    type = '${formData.type}',
    title = '${formData.title}',
    caption = '${formData.caption}',
    body = '${formData.body}',
    publish = '${formData.publish}'
    WHERE course_id = '${req.params.course_id}'`, (error, result, fields) => {
    if(error) {
      res.json({error: true, result: error});
    } else {
      res.json({error: false, result: result});
    }
  })
};

exports.updateImageCourse = (req, res, next) => {
  uploadLogo(req, res, (err) => {
    if(!req.file) {
      res.json({error: true, result: err});
    } else {
      let formData = {
        image: `${env.APP_URL}/user/${req.file.filename}`
      };

      db.query(`UPDATE course SET image = '${formData.image}' WHERE course_id = '${req.params.course_id}'`, (error, result, fields) => {
        if(error) {
          res.json({error: true, result: error});
        } else {
          res.json({error: false, result: formData.image});
        }
      })
    }
  })
};

exports.deleteCourse = (req, res, next) => {
  db.query(`DELETE FROM course WHERE course_id = '${req.params.course_id}'`, (error, result, fields) => {
    if(error) {
      res.json({error: true, result: error});
    } else {
      res.json({error: false, result: result});
    }
  })
};
