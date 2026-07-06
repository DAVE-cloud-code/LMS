const Lecture = require("../models/lecture");

exports.uploadLecture = async (req,res)=>{

    try{

        const lecture = await Lecture.create({

            title:req.body.title,

            description:req.body.description,

            course:req.body.course,

            instructor:req.user.id,

            videoUrl:req.file.path

        });

        res.status(201).json({

            message:"Lecture uploaded successfully",

            lecture

        });

    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

exports.getCourseLectures = async(req,res)=>{

    try{

        const lectures = await Lecture.find({

            course:req.params.courseId

        });

        res.json(lectures);

    }catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

