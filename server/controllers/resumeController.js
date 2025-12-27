
// importing required modules

import imageKit from "../configs/imageKit";
import Resume from "../models/Resume";
import fs from "fs";

// controller for creating a new Resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        // create new resume
        const newResume = await Resume.create({ userId, title });
        // return succes message
        return res.status(201).json({ message: "Resume created successfully", resume: newResume });

    } catch (error) {
        return res.status(400).json({ message: error.message });

    }
};

// controller for deleting a Resume
// DELETE: /api/resumes/delete/:resumeId

export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        // find one and delete
        const result = await Resume.findOneAndDelete({ userId, _id: resumeId });
        if (!result) {
            return res.status(404).json({ message: "Resume not found" });
        }
        // return succes message
        return res.status(200).json({ message: "Resume deleted successfully" });

    } catch (error) {
        return res.status(400).json({ message: error.message });

    }
};


// get user resume by id
// GET: /api/resumes/get

export const getResumeById = async (req, res) => {
    try {
        // destructuring 
        const userId = req.userId;
        const { resumeId } = req.params;

        // projection right here
        const resume = await Resume.findOne(
            { userId, _id: resumeId },
            "-__v -createdAt -updatedAt"
        );

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        };

        // succes message
        return res.status(200).json({ message: "Resume deleted successfully" });

    } catch (error) {
        return res.status(400).json({ message: error.message });

    }
};

// get resume by id public
// GET: /api/resumes/public/:resumeId
export const getPublicResumeById = async (req, res) => {
    try {
        // destructuring 
        const { resumeId } = req.params;

        // finding resume by public of which status is true
        const resume = await Resume.findOne({ public: true, _id: resumeId });

        // if resume not found
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        // succes message on finding resume
        return res.status(200).json({ resume });

    } catch (error) {
        return res.status(400).json({ message: error.message });

    }
};

// controller for updateting a resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        // resume data copy 
        let resumeDataCopy = JSON.parse(resumeData);

        if (image) {
            const imageBufferData = fs.createReadStream(image.path);

            const response = await imageKit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transformation: {
                    pre: "w-300,h-300,fo-face,z-0.75" + (removeBackground ? ',e-bgremove' : '')
                }
            });
            resumeDataCopy.personal_info.image = response.url;
        }

        // find and delete resume
        const resume = await Resume.findByIdAndUpdate(
            { userId, _id: resumeId }, resumeDataCopy,
            { new: true });

        // return success message
        return res.status(200).json({ message: "Saved successfully", resume });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}