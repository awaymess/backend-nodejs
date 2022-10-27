let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

const { message } = require("antd");
// Student Model
let posterSchema = require("../models/poster");

// CREATE Student
router.route("/create-poster").post((req, res, next) => {
  posterSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ Students
router.route("/").get((req, res) => {
  posterSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Single Student
router.route("/poster/:id").get((req, res) => {
  posterSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Student
router.route("/update-poster/:id").put((req, res, next) => {
  posterSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Student updated successfully !");
      }
    }
  );
});

router.put("/comment", (req, res) => {
  console.log("first", req.body);
  posterSchema.find({ _id: req.body.id }, function (error, data) {
    if (data.length === 0) return res.json();
    const poster = data[0];
    const NewPostComment = {
      name: req.body.comments[0].name,
      comment: req.body.comments[0].comment,
    };
    console.log("dfsfuis");

    poster.comments.push(NewPostComment);
    poster.save(function (err) {
      if (err) {
        console.log(err);
      }
      return res.json(data);
    });
  });
});

router.put("/comment1", (req, res) => {
  posterSchema.find({ _id: req.body.id }, function (error, data) {
    if (data.length === 0) return res.json();
    const poster = data[0];

    // console.log(poster);
    // console.log("dfsfuis");

    // let forDeletion = ["634e680eae16f0bbcf5acf65"];
    // arr = arr.filter((item) => !forDeletion.includes(item));

    // let arr = poster.comments;
    // remainingArr = arr.filter((data) => data._id != "634e7d50eaa1a7b67e9179ec");
    // poster.comments.filter((data) => data._id != "634e7d50eaa1a7b67e9179ec");

    // console.log(poster.comments.filter((data) => data._id != "634e7d50eaa1a7b67e9179ec"));
    // poster.save(
    //   poster.comments.filter((data) => data._id != "634e7d50eaa1a7b67e9179ec")
    // );

    poster.save(
      poster.comments.filter((data) => data._id != "634e7d50eaa1a7b67e9179ec"),
      (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log(data);
          res.json(data);
        }
      }
    );

    // poster.comments.splice(NewPostComment);

    // poster.save((err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   return res.json(data);
    // });
  });
});

// Delete Student
router.route("/del-comment").delete((req, res, next) => {
  posterSchema.updateOne(
    { _id: req.body.id },
    {
      $pull: {
        comments: {
          _id: "634f987774473460c94c98aa",
        },
      },
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          message: data,
        });
      }
    }
  );
});

router.put("/like", (req, res) => {
  posterSchema.find({ _id: req.body.id }, function (error, data) {
    if (data.length === 0) return res.json();
    const poster = data[0];

    const Liked = {
      name: req.body.like[0].name,
      status: req.body.like[0].status,
      checkinEnabled: req.body.like[0].checkinEnabled,
    };

    poster.like.push(Liked);
    poster.save(function (err) {
      if (err) {
        console.log(err);
      }
      return res.json(data);
    });
  });
});

router.route("/del-like").put((req, res, next) => {
  posterSchema.updateOne(
    { _id: req.body.id },
    {
      $pull: {
        like: {
          // _id: req.body.idlike,
          name: req.body.name,
        },
      },
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          message: data,
        });
      }
    }
  );
});

router.route("/delete-poster/:id").delete((req, res, next) => {
  posterSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        // msg: data,
        message: data,
      });
    }
  });
});

module.exports = router;
