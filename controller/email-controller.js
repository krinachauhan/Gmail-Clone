import { request } from 'express';
import Email from '../Model/email.js';

export const saveSentEmail = async (request, response) => {
    try {
        const email = new Email(request.body); 
        email.save(); // Ensure to use async/await for async operations

        response.status(200).json('Email Saved Successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
};

export const getEmails = async(request, response) => {
    try{
        let emails;
        if(request.params.type === 'bin'){
            emails = await Email.find({ bin: true});
        }
        else if(request.params.type === 'allmail'){
            emails = await Email.find({})
        }else if(request.params.type === 'starred'){
            emails = await Email.find({starred: true, bin: false});
        }else{
            emails = await Email.find({ type: request.params.type});
        }
        return response.status(200).json(emails);
    }catch(error){
        console.log(error)
        response.status(500).json(error.message);
    }
}


export const moveEmailToBin = async(request,response) => {
    try{
        await Email.updateMany({ _id: { $in: request.body }}, {$set: {bin: true,starred: false, type: ''}});
        return response.status(200).json('Email Deleted Sucessfully');
    }catch(error){
        console.log(error);
        response.status(500).json(error.message);
    }
}

export const toggleStarredEmails =  async(request,response) => {
    try{
        await Email.updateOne({_id: request.body.id}, {$set: {starred: request.body.value}});
        return response.status(200).json("Email Starred Successfully");
    }catch(error){
        console.log(error);
        response.status(500).json(error.message);
    }
}

export const deleteEmails = async(request,response) => {
    try{
        await Email.deleteMany({_id: {$in: request.body}})
        return response.status(200).json("Email Deleted Successfully");
    }catch(error){
        console.log(error);
        response.status(500).json(error.message);
    }
}