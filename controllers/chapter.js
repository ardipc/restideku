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
    if(file.mimetype === 'audio/mp4' || file.mimetype === 'application/mp4' || file.mimetype === 'video/mp4') {
      filetype = 'mp4';
    }
    cb(null, 'video-' + Date.now() + '.' + filetype);
  }
});
var uploadLogo = multer({storage: storage}).single('chapter_video');

exports.createChapter = (req, res, next) => {
  uploadLogo(req, res, (err) => {
    if(!req.file) {
      res.json({ error: true, result: err });
    } else {
      let formData = {
        course_id: req.body.course_id,
        company_id: req.body.company_id,
        chapter_number: req.body.chapter_number,
        title: req.body.title,
        body: req.body.body,
        video: `${env.APP_URL}/course/${req.file.filename}`,
        attachment_id: req.body.attachment_id
      };

      db.query(`INSERT INTO course_chapter (chapter_id, course_id, company_id, chapter_number, title, body, video, attachment_id) VALUES (
        null, '${formData.course_id}', '${formData.company_id}', '${formData.chapter_number}', '${formData.title}', '${formData.body}', 
        '${formData.video}', '${formData.attachment_id}')`, (error, result, fields) => {
        if(error) {
          res.json({error: true, result: error});
        } else {
          res.json({error: false, result: result});
        }
      });
    }
  });
};

exports.getAllChapter = (req, res, next) => {
  db.query(`SELECT * FROM course_chapter`, (error, result, fields) => {
    if(error) {
      res.json({error: true, result: error});
    } else {
      res.json({error: false, result: result});
    }
  });
};

exports.getOneChapter = (req, res, next) => {
  db.query(`SELECT * FROM course_chapter WHERE chapter_id = '${req.params.chapter_id}'`, (error, result, fields) => {
    if(error) {
      res.json({error: true, result: error});
    } else {
      res.json({error: false, result: (result.length !== 0 ) ? result[0] : [] });
    }
  });
};

exports.updateChapter = (req, res, next) => {
  let formData = {
    course_id: req.body.course_id,
    company_id: req.body.company_id,
    chapter_number: req.body.chapter_number,
    title: req.body.title,
    body: req.body.body,
    attachment_id: req.body.attachment_id
  };

  db.query(`UPDATE course_chapter SET 
    course_id = '${formData.category_id}',
    company_id = '${formData.company_id}',
    chapter_number = '${formData.chapter_number}',
    title = '${formData.title}',
    body = '${formData.body}',
    attachment_id = '${formData.attachment_id}'
    WHERE chapter_id = '${req.params.chapter_id}'`, (error, result, fields) => {
    if(error) {
      res.json({error: true, result: error});
    } else {
      res.json({error: false, result: result});
    }
  })
};

exports.updateVideoChapter = (req, res, next) => {
  uploadLogo(req, res, (err) => {
    if(!req.file) {
      res.json({error: true, result: err});
    } else {
      let formData = {
        video: `${env.APP_URL}/course/${req.file.filename}`
      };

      db.query(`UPDATE chapter SET video = '${formData.video}' WHERE chapter_id = '${req.params.chapter_id}'`, (error, result, fields) => {
        if(error) {
          res.json({error: true, result: error});
        } else {
          res.json({error: false, result: formData.video});
        }
      })
    }
  })
};

exports.deleteChapter = (req, res, next) => {
  db.query(`DELETE FROM course_chapter WHERE chapter_id = '${req.params.chapter_id}'`, (error, result, fields) => {
    if(error) {
      res.json({error: true, result: error});
    } else {
      res.json({error: false, result: result});
    }
  })
};