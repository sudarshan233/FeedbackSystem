import {Form} from "../models/forms.model.js";
import {Response} from "../models/responses.model.js";

export const submitForms = async (req, res) => {
    const { email, responses} = req.body;
    const formId = req.params.id;
    const submittedAt = new Date(Date.now());

    try {
        const userAlreadySubmitted = Response.findOne({
            recipientId: email,
        })

        if(userAlreadySubmitted) return res.status(400).json({
            "success": false,
            "message": "You have already submitted the form!!"
        })

        const response = new Response({
            formId,
            recipientId: email,
            responses,
            submittedAt
        });

        await response.save();
        res.status(200).json({
            "success": true,
            "message": "Form Submitted Successfully",
            response
        })
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": error.message
        })
    }
}

export const createForms = async (req, res) => {
    const { email, title, questions } = req.body;

    try {
        const form = new Form({
            ownerId: email,
            title,
            questions
        })

        await form.save();
        res.status(200).json({
            "success": true,
            "message": "Form Created Successfully",
            "url": `${process.env.CLIENT_URL}forms/${form._id}`
        })
    } catch (error) {
        res.status(400).json({
            "success": false,
            "message": error.message
        })
    }
}