import * as joi from "joi"

export const ThreadSchema = joi.object({
    content: joi.string().allow(null, '').optional(),
    image: joi.string().optional().allow(null)
})

export const ReplySchema = joi.object({
    content: joi.string().allow(null, ''),
    image: joi.string().allow(null)
})