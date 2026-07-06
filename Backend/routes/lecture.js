const express=require("express");

const router=express.Router();

const auth=require("../middlewares/authMiddleware");

const authorizeRoles=require("../middlewares/roleMiddleware");

const upload=require("../middlewares/uploadVideo");

const lectureController=require("../controllers/lectureController");


router.post(

"/upload",

auth,

authorizeRoles("instructor"),

upload.single("video"),

lectureController.uploadLecture

);


router.get(

"/course/:courseId",

auth,

lectureController.getCourseLectures

);

module.exports=router;